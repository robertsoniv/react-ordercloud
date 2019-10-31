import React, { useEffect } from "react";
import OcForm from "../shared/OcForm";
import { Category, Categories } from "ordercloud-javascript-sdk";
import OC_CATEGORY_FORM_CONFIG from "../constants/OcCategoryFormConfig";

const OcCategoryForm: React.FC = () => {
  const handleSubmit = (Category: Partial<Category>) => {
    if (process.env.REACT_APP_BUYER_ID) {
      return Categories.Create("test", Category).catch(ex =>
        Promise.reject(ex.response.body.Errors[0].Message)
      );
    }
    return Promise.reject("Missing .env variable REACT_APP_BUYER_ID");
  };
  return (
    <OcForm<Category>
      width={300}
      title="Category"
      onSubmit={handleSubmit}
      config={OC_CATEGORY_FORM_CONFIG}
    />
  );
};

export default OcCategoryForm;
