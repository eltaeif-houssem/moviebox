import React from "react";
import TextfieldForm from "@/components/textfields/TextfieldForm";
import { useForm, Controller } from "react-hook-form";
import authService from "@services/auth.service";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/pages/auth/auth.css";
import { appContext } from "@/context";
import * as routePaths from "@constants/routePaths.contant";
import Layout from "@/components/layout";

const { VITE_APP_GUEST_USER_EMAIL, VITE_APP_GUEST_USER_PASSWORD } = import.meta
  .env;
interface ISigninForm {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const context = appContext();
  const { control, register, handleSubmit, setValue } = useForm<ISigninForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISigninForm) => {
    const response: any = await authService.signin(data.email, data.password);

    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      navigate(routePaths.HOME_PAGE);
    }
  };

  const joinAsGuest = () => {
    setValue("email", `${VITE_APP_GUEST_USER_EMAIL}`);
    setValue("password", `${VITE_APP_GUEST_USER_PASSWORD}`);
    handleSubmit(onSubmit)();
  };

  if (context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  return (
    <Layout>
      <section className="section">
        <form onSubmit={handleSubmit(onSubmit)} className="signin-container">
          <h1>Signin</h1>
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

          <div>
            <p>Password</p>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextfieldForm
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password length must be more than 6 characters",
                    },
                  })}
                  helperText={error?.message || ""}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <Link
            to={routePaths.AUTH_FORGET_PASSWORD_PAGE}
            className="forget-password-link"
          >
            forget password?
          </Link>

          <p>
            Don't have an account yet?{" "}
            <Link to={routePaths.AUTH_SIGNUP_PAGE}>Signup</Link>
          </p>

          <button type="submit">Enter account</button>
          <button type="button" onClick={joinAsGuest} className="guest-btn">
            Join as guest
          </button>
        </form>
        <ToastContainer position="bottom-left" />
      </section>
    </Layout>
  );
};

export default Signin;
