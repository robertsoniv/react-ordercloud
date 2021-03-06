import React from "react";
import OcForm, { OcFormProps } from "../shared/OcForm";
import { merge } from "lodash";
import { User, Users } from "ordercloud-javascript-sdk";
import OC_USER_FORM_CONFIG from "../constants/OcUserFormConfig";

const OcUserForm: React.FC<Partial<OcFormProps<User>>> = props => {
  const { width, title, onSubmit, config } = props;
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
      width={width || 400}
      title={title || "User"}
      onSubmit={onSubmit || handleSubmit}
      config={merge({}, OC_USER_FORM_CONFIG, config)}
    />
  );
};

export default OcUserForm;
