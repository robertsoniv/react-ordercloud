import { OcFormConfig } from "../shared/OcForm";
import { User } from "ordercloud-javascript-sdk";

const OC_USER_FORM_CONFIG: OcFormConfig<Partial<User>> = {
  FirstName: {
    width: "40%",
    placeholder: "Jon",
    required: true
  },
  LastName: {
    width: "40%",
    placeholder: "Doe",
    required: true
  },
  Email: {
    label: "Email Address",
    width: "60%",
    placeholder: "jondoe@gmail.com",
    required: true,
    type: "email"
  },
  Phone: {
    type: "tel",
    width: "40%"
  },
  Username: {
    required: true,
    helpText: "Pick something easy to remember, you will use this to login"
  },
  Password: {
    type: "password",
    required: true,
    confirm: true,
    helpText:
      "Must be 7 - 16 characters long with at least 1 uppercase and 1 number"
  }
};

export default OC_USER_FORM_CONFIG;
