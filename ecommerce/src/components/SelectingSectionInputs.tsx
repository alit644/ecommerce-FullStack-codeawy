import { Box, Flex } from "@chakra-ui/react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import MSelect from "./ui/Select";
import ErrorMsg from "./Error/ErrorMsg";
import type { IFormInput } from "../interfaces";

interface ISelectingSectionInputs {
  control: Control<IFormInput> | undefined;
  errors: FieldErrors<IFormInput>;
}
const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];
const SelectingSectionInputs = ({
  control,
  errors,
}: ISelectingSectionInputs) => {
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
      <Box w={"full"} spaceY={2}>
        <Controller
          control={control}
          name="category"
          rules={{
            required: "Product category is required",
          }}
          render={({ field }) => (
            <MSelect
              label="Select Product Category *"
              value={Array.isArray(field.value) ? field.value : []}
              onChange={(value) => field.onChange(value)}
              options={options}
            />
          )}
        />
        {errors.category?.message && (
          <ErrorMsg message={errors.category?.message} />
        )}
      </Box>
      <Box w={"full"} spaceY={2}>
        <Controller
          control={control}
          name="tags"
          rules={{
            required: "Product tags are required",
            validate: (value) =>
              (Array.isArray(value) && value.length > 0) ||
              "Please select at least one tag",
          }}
          render={({ field }) => (
            <MSelect
              label="Select Product Tags *"
              value={Array.isArray(field.value) ? field.value : []}
              onChange={(value) => field.onChange(value)}
              options={options}
              multiple
            />
          )}
        />

        {errors.tags?.message && <ErrorMsg message={errors.tags?.message} />}
      </Box>
      <Box w={"full"} spaceY={2}>
        <Controller
          control={control}
          name="brand"
          rules={{
            required: "Product brand is required",
          }}
          render={({ field }) => (
            <MSelect
              label="Select Product Brand *"
              value={Array.isArray(field.value) ? field.value : []}
              onChange={(value) => field.onChange(value)}
              options={options}
            />
          )}
        />
        {errors.brand?.message && <ErrorMsg message={errors.brand?.message} />}
      </Box>
    </Flex>
  );
};

export default SelectingSectionInputs;
