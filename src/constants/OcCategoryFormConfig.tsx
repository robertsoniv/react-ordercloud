import { OcFormConfig } from "../shared/OcForm";
import { Category } from "ordercloud-javascript-sdk";

const OC_CATEGORY_FORM_CONFIG: OcFormConfig<Partial<Category>> = {
  ID: {
    label: "Category ID",
    required: true
  },
  Name: {
    required: true
  },
  Description: {
    multiline: true
  },
  ParentID: {
    label: "Parent Category ID",
    helpText: "Make this category a child of another category"
  }
};

export default OC_CATEGORY_FORM_CONFIG;
