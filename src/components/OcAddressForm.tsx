import React, { useEffect } from "react";
import OcForm, { OcFormProps } from "../shared/OcForm";
import { Address, Addresses } from "ordercloud-javascript-sdk";
import { merge } from "lodash";
import OC_ADDRESS_FORM_CONFIG from "../constants/OcAddressFormConfig";

const OcAddressForm: React.FC<Partial<OcFormProps<Address>>> = props => {
  const { width, title, onSubmit, config } = props;
  const handleSubmit = (address: Partial<Address>) => {
    if (process.env.REACT_APP_BUYER_ID) {
      return Addresses.Create(process.env.REACT_APP_BUYER_ID, address).catch(
        ex => Promise.reject(ex.response.body.Errors[0].Message)
      );
    }
    return Promise.reject("Missing .env variable REACT_APP_BUYER_ID");
  };
  return (
    <OcForm<Address>
      width={width || 450}
      title={title || "Address"}
      onSubmit={onSubmit || handleSubmit}
      config={merge({}, OC_ADDRESS_FORM_CONFIG, config)}
    />
  );
};

export default OcAddressForm;
