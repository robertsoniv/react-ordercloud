import OrderCloud from "ordercloud-javascript-sdk";
import React, { useEffect } from "react";
import OcAddressForm from "./components/OcAddressForm";
import OcProductForm from "./components/OcProductForm";
import OcUserForm from "./components/OcUserForm";
import OcCategoryForm from "./components/OcCategoryForm";

OrderCloud.Sdk.instance.authentications["oauth2"].accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJhZG1pbiIsImNpZCI6IjZlMTU5ZDYwLTNkMzYtNDczZi1iMmQ5LWUzNjg4YWU1ZTljMSIsImltcCI6IjEwMDUiLCJ1IjoiMTgxMzEzNyIsInVzcnR5cGUiOiJhZG1pbiIsInJvbGUiOiJGdWxsQWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTcyNTI2OTY3LCJuYmYiOjE1NzI0OTgxNjd9.vmGr15APAqeFESLS1p8x-yrfG8r0wfZIomBSQ2Nqt9E";

const App: React.FC = () => {
  return (
    <div
      style={{
        margin: "32px auto",
        width: "100%",
        display: "flex",
        alignItems: "flex-start"
      }}
    >
      <OcAddressForm />
      <OcUserForm />
      <OcCategoryForm />
      <OcProductForm />
    </div>
  );
};

export default App;
