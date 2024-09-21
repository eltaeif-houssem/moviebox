import React from "react";
import TextfieldForm from "@/components/textfields/TextfieldForm";
import { useForm, Controller } from "react-hook-form";
import authService from "@services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/pages/auth/auth.css";
import { Navigate } from "react-router-dom";
import { appContext } from "@/context";
import * as routePaths from "@constants/routePaths.contant";
import Layout from "@/components/layout";

interface IForgetPassword {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const context = appContext();
  const { control, register, handleSubmit } = useForm<IForgetPassword>();

  const onSubmit = async (data: IForgetPassword) => {
    const response = await authService.forgetPassword(data.email);

    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      toast.success(response.success);
    }
  };

  if (context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  return (
    <Layout>
      <section className="section">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forget-password-container"
        >
          <h1>Forget Password</h1>
          <div>
            <p>Email</p>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextfieldForm
                  type="text"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                  helperText={error?.message || ""}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <button type="submit">Send Link</button>
        </form>
        <ToastContainer position="bottom-left" style={{ width: "400px" }} />
      </section>
    </Layout>
  );
};

export default ForgetPassword;
