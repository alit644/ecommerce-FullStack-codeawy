import { Box, Flex, Stack } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import MInput from "../../components/ui/MInput";
import MTextarea from "../../components/ui/Textarea ";
import MFileUpload from "../../components/ui/FileUpload";
import MButton from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa";
import FormGroup from "../../components/ui/form/FormGroup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { schemaAddProduct } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import PricingSectionInputs from "../../components/PricingSectionInputs";
import SelectingSectionInputs from "../../components/SelectingSectionInputs";
import type { IFormInput } from "../../interfaces";
import { mainInputsData } from "../../data";

const AddProduct = () => {
  //TODO: add schema validation
  //TODO: refactoring (Inputs)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaAddProduct),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);

  //! render
  const renderMainInputs = mainInputsData.map((input) => {
    return (
      <FormGroup
        error={errors[input.name]?.message}
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
    <Box
      w={"full"}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      border="1px solid #e4e4e7"
      borderRadius="md"
      boxShadow="md"
    >
      <MainTitle title="Add New Product" isArrow={false} />
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box spaceY={2}>
          {/* Name and Rating */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            {renderMainInputs}
          </Stack>
          {/* Description and Image */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <FormGroup
              error={errors.description?.message}
              label="Product Description *"
              htmlFor="description"
            >
              <MTextarea
                {...register("description", {
                  required: true,
                  minLength: 10,
                  maxLength: 400,
                })}
                id="description"
                placeholder="Enter Product Description"
              />
            </FormGroup>
            <FormGroup
              error={undefined}
              label="Main Thumbnail *"
              htmlFor="image"
            >
              <Controller
                name="image"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (!value) {
                      return "Image is required";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <MFileUpload
                    maxFiles={1}
                    height={"100px"}
                    label="Upload Main Thumbnail"
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormGroup>
          </Stack>
          {/* price and discount and stock  */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <PricingSectionInputs register={register} errors={errors} />

            <SelectingSectionInputs control={control} errors={errors} />
          </Stack>
          {/* Images */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <FormGroup
              error={undefined}
              label="Product Gallery Images *"
              htmlFor="images"
            >
              <Controller
                name="images"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (!value) {
                      return "Images are required";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <MFileUpload
                    maxFiles={5}
                    label="Upload Gallery Images"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormGroup>
          </Stack>
        </Box>
        {/* Actions */}
        <Flex justifyContent="flex-end" gap={2} mt={4}>
          <MButton
            variant="outline"
            size="sm"
            title="Reset"
            w={"fit-content"}
          />
          <MButton
            variant="solid"
            size="sm"
            bg="teal.500"
            title="Add Product"
            w={"fit-content"}
            _hover={{ bg: "teal.600" }}
            icon={<FaPlus />}
            type="submit"
          />
        </Flex>
      </form>
    </Box>
  );
};

export default AddProduct;
