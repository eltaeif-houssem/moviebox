import React, { useState } from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate, useNavigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import avatar from "@assets/avatar2.png";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { Controller, useForm } from "react-hook-form";
import TextfieldForm from "@components/textfields/TextfieldForm";
import { toast } from "react-toastify";
import authService from "@services/auth.service";
import "react-toastify/dist/ReactToastify.css";
import "@styles/pages/profile/profile.css";

interface IFormProps {
  password: string;
}

const Profile: React.FC = () => {
  const context = appContext();
  const [modal, setModal] = useState<boolean>(false);
  const { control, register, handleSubmit, reset } = useForm<IFormProps>();
  const navigate = useNavigate();
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  const onSubmit = async (data: IFormProps) => {
    const response: any = await authService.verifyPassword(
      `${context.user?.email}`,
      `${data.password}`
    );

    if (response.error) {
      toast.error(`${response.error}`);
      closeModalHandler();
      return;
    }

    await authService.deleteAccount(context.user!);
    navigate(routePaths.AUTH_SIGNIN_PAGE);
  };

  const closeModalHandler = () => {
    setModal(false);
    reset();
  };

  return (
    <Layout dark={true}>
      <div className="profile-page">
        <div>
          <img src={avatar} alt="profile-avatar" />
          <h3>{randomName}</h3>
          <div>
            <p>
              <span>Email:</span> {context.user.email}
            </p>
            <p>
              <span>Creation date:</span> {context.user.metadata.creationTime}
            </p>
            <p>
              <span>Last signin:</span> {context.user.metadata.lastSignInTime}
            </p>
          </div>

          <button onClick={() => setModal(true)}>Delete Account</button>
        </div>

        {modal && (
          <div className="delete-account-modal">
            <div className="backdrop" onClick={closeModalHandler} />
            <form onSubmit={handleSubmit(onSubmit)} className="content">
              <i className="fa-solid fa-xmark" onClick={closeModalHandler} />
              <h2>Delete Account</h2>
              <div>
                <p>Old Password</p>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextfieldForm
                      type="text"
                      placeholder="Enter old password"
                      {...register("password", {
                        required: "Old password is required",
                      })}
                      helperText={error?.message || ""}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <button type="submit">Confirm</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
