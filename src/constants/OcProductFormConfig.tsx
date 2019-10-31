import { OcFormConfig } from "../shared/OcForm";
import { Product } from "ordercloud-javascript-sdk";

export interface ProductPriceCreate extends Partial<Product> {
  Price?: number;
}

const OC_PRODUCT_FORM_CONFIG: OcFormConfig<Partial<ProductPriceCreate>> = {
  ID: {
    label: "Product ID",
    required: true
  },
  Name: {
    label: "Product Name",
    required: true
  },
  Description: {
    multiline: true
  },
  Price: {
    required: true,
    adorn: { left: "$" },
    placeholder: "0.00",
    type: "number",
    step: "0.01",
    min: "0.01",
    width: "35%",
    helpText: "USD"
  },
  QuantityMultiplier: {
    value: 1,
    required: true,
    type: "number",
    step: "1",
    min: 1,
    helpText: "Lineitem totals will be multiplied by this value",
    width: "65%"
  },
  ShipWeight: {
    width: "25%",
    label: "Weight",
    type: "number",
    step: "0.05",
    adorn: {
      right: "lbs"
    }
  },
  ShipHeight: {
    width: "25%",
    label: "Height",
    type: "number",
    step: "0.05",
    adorn: {
      right: "ft"
    }
  },
  ShipLength: {
    width: "25%",
    label: "Length",
    type: "number",
    step: "0.05",
    adorn: {
      right: "ft"
    }
  },
  ShipWidth: {
    width: "25%",
    label: "Width",
    type: "number",
    step: "0.05",
    adorn: {
      right: "ft"
    }
  }
};

export default OC_PRODUCT_FORM_CONFIG;
