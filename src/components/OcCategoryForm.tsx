import React, { useEffect } from "react";
import OcForm, { OcFormProps } from "../shared/OcForm";
import { Category, Categories } from "ordercloud-javascript-sdk";
import { merge } from "lodash";
import OC_CATEGORY_FORM_CONFIG from "../constants/OcCategoryFormConfig";

const OcCategoryForm: React.FC<Partial<OcFormProps<Category>>> = props => {
  const { width, title, onSubmit, config } = props;
  const handleSubmit = (Category: Partial<Category>) => {
    if (process.env.REACT_APP_BUYER_ID) {
      return Categories.Create("products", Category).catch(ex =>
        Promise.reject(ex.response.body.Errors[0].Message)
      );
    }
    return Promise.reject("Missing .env variable REACT_APP_BUYER_ID");
  };
  return (
    <OcForm<Category>
      width={width || 300}
      title={title || "Category"}
      onSubmit={onSubmit || handleSubmit}
      config={merge({}, OC_CATEGORY_FORM_CONFIG, config)}
    />
  );
};

export default OcCategoryForm;
