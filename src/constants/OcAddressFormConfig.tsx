import { OcFormConfig } from "../shared/OcForm";
import { Address } from "ordercloud-javascript-sdk";

const OC_ADDRESS_FORM_CONFIG: OcFormConfig<Partial<Address>> = {
  AddressName: {
    placeholder: "Jon Doe's Work Address",
    helpText: "Pick a nickname for your new address"
  },
  CompanyName: {
    placeholder: "Doe Brothers Inc.",
    helpText: "If this is not a place of business, please leave blank"
  },
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
  Street1: {
    label: "Address",
    width: "70%",
    placeholder: "666 Spook Rd.",
    required: true
  },
  Street2: {
    label: "Line 2",
    width: "61%",
    placeholder: "Apt, Suite or Floor #"
  },
  City: {
    value: "Minneapolis",
    width: "40%",
    required: true
  },
  State: {
    value: "MN",
    width: "25%",
    required: true
  },
  Zip: {
    width: "35%",
    required: true
  },
  Country: {
    value: "US",
    required: true,
    width: "50%",
    helpText: "2-digit country code"
  },
  Phone: {
    width: "40%",
    type: "tel"
  }
};

export default OC_ADDRESS_FORM_CONFIG;
