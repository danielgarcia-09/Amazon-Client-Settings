import React, { Fragment } from "react";
import FormBlock from "./FormBlock";

const formatLabel = ( label: string ) => {
    const clean = label.replace('_', ' ');

    return clean[0].toUpperCase() + clean.substring(1);
}

type Props = {
  name: string,
  value: string,
}

const InfoInput = ({ name, value }: Props) => {
  if (name === "password") value = "*".repeat(value.length - 30);

  if(name === "id") return <Fragment></Fragment> 

  return (
    <FormBlock>
      <label htmlFor={name}>{formatLabel(name)}</label>
      <input 
        type={"text"}
        name={name}
        value={value}
        readOnly={true}
      />
    </FormBlock>
  );
};

export default InfoInput;
