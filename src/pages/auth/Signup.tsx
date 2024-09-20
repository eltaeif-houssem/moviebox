import React from "react";
import TextfieldForm from "@components/textfields/TextfieldForm";
import { Controller, useForm } from "react-hook-form";
import authService from "@services/auth.service";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/pages/auth/auth.css";
import { appContext } from "@/context";

interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const context = appContext();
  const { control, register, handleSubmit, watch } = useForm<ISignupForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignupForm) => {
    const response: any = await authService.signup(data.email, data.password);
    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      navigate("/");
    }
  };

  if (context.user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="section">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-container">
        <h1>Signup</h1>
        <div>
          <p>Email</p>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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

        <div>
          <p>Confirm password</p>
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextfieldForm
                type="password"
                placeholder="Enter confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (data) => {
                    const password = watch("password");
                    if (data !== password) {
                      return "Confirm password and password must be the same";
                    }
                    return true;
                  },
                })}
                helperText={error?.message || ""}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <p>
          Already have an account?{" "}
          <Link to="/auth/signin" className="signin-btn-page-link">
            Signin
          </Link>
        </p>

        <button type="submit">Create account</button>
      </form>
      <ToastContainer position="bottom-left" />
    </section>
  );
};

export default Signup;
