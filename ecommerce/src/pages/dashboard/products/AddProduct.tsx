import { Box, Flex, Stack } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import MInput from "../../../components/ui/MInput";
import MTextarea from "../../../components/ui/Textarea ";
import MFileUpload from "../../../components/ui/FileUpload";
import MButton from "../../../components/ui/MButton";
import { FaPlus } from "react-icons/fa";
import FormGroup from "../../../components/ui/form/FormGroup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { schemaAddProduct } from "../../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import PricingSectionInputs from "../../../components/PricingSectionInputs";
import SelectingSectionInputs from "../../../components/SelectingSectionInputs";
import type { IFormInput, IProductCard } from "../../../interfaces";
import { mainInputsData } from "../../../data";
import {
  useDeleteImageMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useUploadProductMutation,
} from "../../../App/services/createProductApi";
import { toaster } from "../../../components/ui/toaster";
import { Link, useNavigate, useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { fetchProduct } from "../../../utils/fetchingData";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../../../components/ui/Skeleton";
import Error from "../../../components/Error/Error";
import { mapUrlsToIds } from "../../../utils/mapUrlsToIds";

const AddProduct = () => {
  const nav = useNavigate();
  const { editProductId } = useParams<{ editProductId: string | undefined }>();
  const isEdit = !!editProductId;
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [uploadProduct, { isLoading, error: productError }] =
    useUploadProductMutation();
  const [deleteImage] = useDeleteImageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaAddProduct),
  });

  //  edit data
  const {
    data: editProductData,
    isLoading: editProductLoading,
    error: editProductError,
  } = useQuery<IProductCard>({
    queryKey: editProductId
      ? ["getProductById", editProductId]
      : ["getProductById", ""],
    queryFn: () => fetchProduct(editProductId || ""),
    enabled: isEdit,
  });

  //! Set default values for edit
  useEffect(() => {
    if (isEdit && editProductData) {
      const editData = editProductData;
      reset({
        title: editData.title,
        description: editData.description,
        rating: editData.rating,
        price: editData.price,
        discount: editData.discount,
        stock: editData.stock,
        brand: editData.brand,

        thumbnail: editData.thumbnail?.formats.small.url || "",
        images:
          editData.images?.map(
            (imageObj) => imageObj.formats?.small?.url || ""
          ) || [],
      });
      setValue("category", editData.category?.documentId || "");
      setValue(
        "tags",
        editData.tags
          ? editData.tags.map((tagObj) => tagObj.documentId || "")
          : []
      );
    }
  }, [editProductData, isEdit, reset, setValue]);

  //TODO : delete image for database
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      //! RTk Query
      let imageID = "";
      let imagesIDs: (string | number | undefined)[] = [];
      //! Get initial image IDs for comparison (to delete old images)
      const initialImageIDs = (editProductData?.images || []).map(
        (img) => img.id
      );

      //! File رقع الصور في حالة كانت
      const isThumbnailFile = Array.isArray(data.thumbnail);
      //* Filter existing thumbnail (Strings or Numbers)
      const isThumbnailID =
        typeof data.thumbnail === "string" ||
        typeof data.thumbnail === "number";

      const newImages = (Array.isArray(data.images) ? data.images : []).filter(
        (image) => image instanceof File
      ) as File[];

      const oldImageUrls = (
        Array.isArray(data.images) ? data.images : []
      ).filter((img) => typeof img === "string") as string[];

      //! رفع الصور الجديدة (الصورة الرئيسية وصور المعرض) إذا تم اختيارها من قبل المستخدم
      let uploadResponse: { id: string; type: string }[] = [];
      if (isThumbnailFile || newImages.length > 0) {
        uploadResponse = await uploadImage({
          thumbnail: data.thumbnail[0],
          images: newImages,
        }).unwrap();
      }

      // ترجم روابط الصور القديمة إلى IDs
      const existingImageIDs = mapUrlsToIds(
        oldImageUrls,
        editProductData?.images
      );

      //! معالجة الصور بعد الرفع أو في حالة عدم رفع صور جديدة
      if (uploadResponse.length > 0) {
        if (isThumbnailFile && uploadResponse[0]?.id) {
          imageID = uploadResponse[0].id;
        } else {
          imageID = editProductData?.thumbnail?.id || "";
        }
        //* دمج الصور الجديدة مع الصور القديمة
        imagesIDs = [
          ...existingImageIDs,
          ...uploadResponse.slice(isThumbnailFile ? 1 : 0).map((img) => img.id),
        ];
      } else {
        // إذا لم يتم رفع صور جديدة، استخدم معرفات الصور القديمة فقط
        imagesIDs = existingImageIDs;
        if (!imageID && isThumbnailID) {
          imageID = editProductData?.thumbnail?.id || "";
        }
      }
      imagesIDs = imagesIDs.filter(Boolean);

      //! تحديد الصور التي يجب حذفها
      //! الصور التي كانت موجودة في المنتج الأصلي ولكن لم تعد موجودة في المنتج الجديد
      const imagesToDelete = initialImageIDs.filter(
        (oldId) => !imagesIDs.includes(oldId)
      );

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

      if (isEdit) {
        const updateProductResponse = await updateProduct({
          productData,
          documentId: editProductId || "",
        }).unwrap();
        console.log("updateProductResponse RTK Query", updateProductResponse);
        if (imagesToDelete.length > 0) {
          const deleteImageResponse = await Promise.all(
            imagesToDelete.map((id) => deleteImage([id]).unwrap())
          );
          console.log("deleteImageResponse RTK Query", deleteImageResponse);
        }
        //? Toaster

        toaster.success({
          title: "Product Updated",
          description: "Product updated successfully",
          duration: 2000,
          type: "success",
        });
      } else {
        const uploadProductResponse = await uploadProduct(productData).unwrap();
        console.log("uploadProductResponse RTK Query", uploadProductResponse);
        //? Toaster
        toaster.success({
          title: "Product Created",
          description: "Product created successfully",
          duration: 2000,
          type: "success",
        });
        //? Error Toaster
        if (productError) {
          toaster.error({
            title: "Product Failed",
            description: "Product failed to create",
            duration: 2000,
            type: "error",
          });
        }
      }

      reset();
      nav("/dashboard/products");
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

  if (editProductLoading) {
    return (
      <SkeletonCard
        count={12}
        height={"40px"}
        textSkeleton={false}
        isAction={false}
      />
    );
  }
  if (editProductError) {
    return <Error message="Error" description="Error fetching product" />;
  }

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
      <MainTitle
        title={isEdit ? "Edit Product" : "Add New Product"}
        isArrow={false}
      />
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
                defaultValue={
                  editProductData?.thumbnail?.formats?.small?.url || ""
                }
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
                    multiple={false}
                    maxFiles={1}
                    height={"100px"}
                    label="Upload Main Thumbnail"
                    value={
                      field.value instanceof File
                        ? field.value
                        : field.value ||
                          editProductData?.thumbnail?.formats?.small?.url ||
                          ""
                    }
                    onChange={(newValue) => {
                      if (newValue instanceof FileList) {
                        field.onChange(newValue[0]); // Single File
                      } else {
                        field.onChange(newValue);
                      }
                    }}
                    imageIsLoading={imageLoading || updateLoading}
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
                    multiple={true}
                    maxFiles={5}
                    label="Upload Gallery Images"
                    value={field.value || []}
                    onChange={field.onChange}
                    imageIsLoading={imageLoading || updateLoading}
                  />
                )}
              />
            </FormGroup>
          </Stack>
        </Box>
        {/* Actions */}
        <Flex justifyContent="flex-end" gap={2} mt={4}>
          {isEdit === false && (
            <MButton
              variant="outline"
              size="sm"
              title="Reset"
              w={"fit-content"}
              onClick={handelReset}
            />
          )}
          {isEdit && (
            <Link to="/dashboard/products">
              <MButton
                disabled={isLoading || imageLoading || updateLoading}
                _disabled={{ opacity: 0.5 }}
                variant="outline"
                size="sm"
                title="Cancel"
                w={"fit-content"}
              />
            </Link>
          )}

          <MButton
            isLoading={isLoading || imageLoading || updateLoading}
            loadingText="Uploading Product..."
            variant="solid"
            size="sm"
            bg="teal.500"
            title={isEdit ? "Update Product" : "Add Product"}
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
