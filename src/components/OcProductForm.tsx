import React from "react";
import OcForm, { OcFormProps } from "../shared/OcForm";
import { merge } from "lodash";
import { Products, PriceSchedules } from "ordercloud-javascript-sdk";
import OC_PRODUCT_FORM_CONFIG, {
  ProductPriceCreate
} from "../constants/OcProductFormConfig";

const OcProductForm: React.FC<
  Partial<OcFormProps<ProductPriceCreate>>
> = props => {
  const { width, title, onSubmit, config } = props;
  const handleSubmit = (data: ProductPriceCreate) => {
    return PriceSchedules.Create({
      Name: data.ID,
      ApplyShipping: true,
      ApplyTax: true,
      MinQuantity: 1,
      PriceBreaks: [{ Quantity: 1, Price: data.Price }],
      RestrictedQuantity: false
    })
      .then(priceSchedule => {
        return Products.Create({
          ...data,
          DefaultPriceScheduleID: priceSchedule.ID
        });
      })
      .catch(ex => Promise.reject(ex.response.body.Errors[0].Message));
  };
  return (
    <OcForm<ProductPriceCreate>
      width={width || 500}
      title={title || "Product"}
      onSubmit={onSubmit || handleSubmit}
      config={merge({}, OC_PRODUCT_FORM_CONFIG, config )}
    />
  );
};

export default OcProductForm;
