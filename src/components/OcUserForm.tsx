import React from "react";
import OcForm from "../shared/OcForm";
import { User, Users } from "ordercloud-javascript-sdk";
import OC_USER_FORM_CONFIG from "../constants/OcUserFormConfig";

const OcUserForm: React.FC = () => {
  const handleSubmit = (data: Partial<User>) => {
    if (process.env.REACT_APP_BUYER_ID) {
      return Users.Create(process.env.REACT_APP_BUYER_ID, data).catch(ex =>
        Promise.reject(ex.response.body.Errors[0].Message)
      );
    }
    return Promise.reject("Missing .env variable REACT_APP_BUYER_ID");
  };
  return (
    <OcForm<User>
      width={400}
      title="User"
      onSubmit={handleSubmit}
      config={OC_USER_FORM_CONFIG}
    />
  );
};

export default OcUserForm;
