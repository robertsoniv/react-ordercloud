import React from "react";
import OcForm from "../shared/OcForm";
import { Products, PriceSchedules } from "ordercloud-javascript-sdk";
import OC_PRODUCT_FORM_CONFIG, {
  ProductPriceCreate
} from "../constants/OcProductFormConfig";

const OcProductForm: React.FC = () => {
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
      width={500}
      title="Product"
      onSubmit={handleSubmit}
      config={OC_PRODUCT_FORM_CONFIG}
    />
  );
};

export default OcProductForm;
