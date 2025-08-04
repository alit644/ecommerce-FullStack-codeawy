import { Box, Flex, Stack } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import MInput from "../../../components/ui/MInput";
import MTextarea from "../../../components/ui/Textarea ";
import MFileUpload from "../../../components/ui/FileUpload";
import MButton from "../../../components/ui/Button";
import { FaPlus } from "react-icons/fa";
import FormGroup from "../../../components/ui/form/FormGroup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { schemaAddProduct } from "../../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import PricingSectionInputs from "../../../components/PricingSectionInputs";
import SelectingSectionInputs from "../../../components/SelectingSectionInputs";
import type { IFormInput } from "../../../interfaces";
import { mainInputsData } from "../../../data";
import {
  useUploadImageMutation,
  useUploadProductMutation,
} from "../../../App/services/createProductApi";
import { toaster } from "../../../components/ui/toaster";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const AddProduct = () => {
  const [uploadImage, { isLoading: imageLoading }] =
    useUploadImageMutation();
  const [uploadProduct, { isLoading, error: productError }] =
    useUploadProductMutation();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaAddProduct),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      //! RTk Query
      const uploadResponse = await uploadImage({
        thumbnail: data.thumbnail[0],
        images: data.images,
      }).unwrap();
      const imageID = uploadResponse[0].id;
      const imagesIDs = uploadResponse.map((image: { id: string }) => image.id);

      const productData = {
        data: {
          title: data.title,
          description: data.description,
          rating: data.rating,
          price: data.price,
          discount: data.discount,
          stock: data.stock,
          thumbnail: imageID,
          images: imagesIDs,
          category: data.category,
          brand: data.brand,
          tags: data.tags,
        },
      };
      const uploadProductResponse = await uploadProduct(productData).unwrap();
      console.log("uploadProductResponse RTK Query", uploadProductResponse);
      //? Toaster
      toaster.success({
        title: "Product Created",
        description: "Product created successfully",
        duration: 2000,
        type: "success",
      });
      reset();
      nav("/dashboard/products");
      //? Error Toaster
      if (productError) {
        toaster.error({
          title: "Product Failed",
          description: "Product failed to create",
          duration: 2000,
          type: "error",
        });
      }
    } catch (error: any) {
     console.error("API Error:", error);

     if (error.status === 403) {
       toaster.error({
         title: "Unauthorized",
         description: "You don't have permission to perform this action.",
       });
     } else if (error.status === 400) {
       toaster.error({
         title: "Validation Error",
         description: "Please check your input fields.",
       });
     } else {
       toaster.error({
         title: "Unknown Error",
         description: "Something went wrong. Try again later.",
       });
     }
    }
  };

  //! Handle Reset
  const handelReset = useCallback(() => {
    reset();
  }, []);

  //! render
  const renderMainInputs = mainInputsData.map((input) => {
    return (
      <FormGroup
        key={input.name}
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
              htmlFor="thumbnail"
            >
              <Controller
                name="thumbnail"
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
                    imageIsLoading={imageLoading}
                  />
                )}
              />
            </FormGroup>
          </Stack>
          {/* price and discount and stock  */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <PricingSectionInputs register={register} errors={errors} />
            <SelectingSectionInputs
              control={control}
              errors={errors}
              register={register}
            />
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
                    imageIsLoading={imageLoading}
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
            onClick={handelReset}
          />
          <MButton
            isLoading={isLoading || imageLoading}
            loadingText="Uploading Product..."
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
