import { Flex } from "@chakra-ui/react";
import FormGroup from "./ui/form/FormGroup";
import MInput from "./ui/MInput";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormInput } from "../interfaces";
import { PricingSectionInputsData } from "../data";
interface IPricingSectionInputs {
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}
const PricingSectionInputs = ({ register, errors }: IPricingSectionInputs) => {
 const renderInputs = PricingSectionInputsData.map((input) => {
  return (
    <FormGroup
    key={input.name}
      error={errors?.[input.name]?.message || ""}
      label={input.label}
      htmlFor={input.name}
    >
      <MInput
        {...register(input.name, {
          required: true,
          min: 1,
          max: 1000000,
        })}
        id={input.name}
        placeholder={input.placeholder}
        type={input.type}
      />
    </FormGroup>
  );
 });
  return (
    <Flex
      h={"full"}
      border="1px solid #e4e4e7"
      justifyContent="space-between"
      p={2}
      spaceY={2}
      borderRadius="md"
      w={"full"}
      flexDir={"column"}
    >
     {renderInputs}
    </Flex>
  );
};

export default PricingSectionInputs;
