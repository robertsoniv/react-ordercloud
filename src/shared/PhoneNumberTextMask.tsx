import MaskedInput from "react-text-mask";
import React from "react";

const PhoneNumberTextMask = (props: any) => {
  return (
    <MaskedInput
      {...props}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};

export default PhoneNumberTextMask;
