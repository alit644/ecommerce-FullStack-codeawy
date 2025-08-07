import { Box, Flex, Stack } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import MInput from "../../../components/ui/MInput";
import MFileUpload from "../../../components/ui/FileUpload";
import MButton from "../../../components/ui/Button";
import { FaPlus } from "react-icons/fa";
import FormGroup from "../../../components/ui/form/FormGroup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { schemaAddCategory } from "../../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IFormInputCategory } from "../../../interfaces";
import {
  useDeleteImageMutation,
  useUpdateCategoryMutation,
  useUploadCategoryMutation,
  useUploadImageMutation,
} from "../../../App/services/createCategoryApi";
import { toaster } from "../../../components/ui/toaster";
import { Link, useNavigate, useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { fetchCategoryById } from "../../../utils/fetchingData";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../../../components/ui/Skeleton";
import Error from "../../../components/Error/Error";

const AddCategory = () => {
  const nav = useNavigate();
  const { editCategoryId } = useParams<{
    editCategoryId: string | undefined;
  }>();
  const isEdit = !!editCategoryId;
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const [uploadCategory, { isLoading, error: categoryError }] =
    useUploadCategoryMutation();
  const [deleteImage] = useDeleteImageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<IFormInputCategory>({
    resolver: yupResolver(schemaAddCategory),
  });

  //  edit data
  const {
    data: editCategoryData,
    isLoading: editCategoryLoading,
    error: editCategoryError,
  } = useQuery({
    queryKey: editCategoryId
      ? ["getCategoryById", editCategoryId]
      : ["getCategoryById", ""],
    queryFn: () => fetchCategoryById(editCategoryId || ""),
    enabled: isEdit,
  });

  //! Set default values for edit
  useEffect(() => {
    if (isEdit && editCategoryData) {
      const editData = editCategoryData;
      reset({
        title: editData.title,
        thumbnail: editData.thumbnail?.formats.small.url || "",
      });
    }
  }, [editCategoryData, isEdit, reset, setValue]);

  const onSubmit: SubmitHandler<IFormInputCategory> = async (data) => {
    try {
      //! RTk Query
      let imageID = "";
      //! Get initial image IDs for comparison (to delete old images)
      const initialImageIDs = editCategoryData?.thumbnail?.id;

      //! File رقع الصور في حالة كانت
      const isThumbnailFile = Array.isArray(data.thumbnail);
      //* Filter existing thumbnail (Strings or Numbers)
      const isThumbnailID =
        typeof data.thumbnail === "string" ||
        typeof data.thumbnail === "number";


      //! رفع الصور الجديدة (الصورة الرئيسية وصور المعرض) إذا تم اختيارها من قبل المستخدم
      let uploadResponse: { id: string; type: string }[] = [];
      if (isThumbnailFile) {
        uploadResponse = await uploadImage({
          thumbnail: data.thumbnail[0],
        }).unwrap();
      }

      //! معالجة الصور بعد الرفع أو في حالة عدم رفع صور جديدة
      if (uploadResponse.length > 0) {
        if (isThumbnailFile && uploadResponse[0]?.id) {
          imageID = uploadResponse[0].id;
        } else {
          imageID = editCategoryData?.thumbnail?.id || "";
        }
      } else {
        // إذا لم يتم رفع صور جديدة، استخدم معرفات الصور القديمة فقط
        if (!imageID && isThumbnailID) {
          imageID = editCategoryData?.thumbnail?.id || "";
        }
      }

      const categoryData = {
        data: {
          title: data.title,
          thumbnail: imageID,
        },
      };

      if (isEdit) {
        console.log("isEdit", isEdit);
        const updateCategoryResponse = await updateCategory({
          categoryData,
          documentId: editCategoryId || "",
        }).unwrap();
        console.log("updateCategoryResponse RTK Query", updateCategoryResponse);
        if (initialImageIDs) {
          const deleteImageResponse = await deleteImage(initialImageIDs).unwrap()
          console.log("deleteImageResponse RTK Query", deleteImageResponse);
        }
        // //? Toaster

        toaster.success({
          title: "Category Updated",
          description: "Category updated successfully",
          duration: 2000,
          type: "success",
        });
      } else {
        const uploadProductResponse = await uploadCategory(
          categoryData
        ).unwrap();
        console.log("uploadProductResponse RTK Query", uploadProductResponse);
        //? Toaster
        toaster.success({
          title: "Category Created",
          description: "Category created successfully",
          duration: 2000,
          type: "success",
        });
        //? Error Toaster
        if (categoryError) {
          toaster.error({
            title: "Category Failed",
            description: "Category failed to create",
            duration: 2000,
            type: "error",
          });
        }
      }

      reset();
      nav("/dashboard/categories");
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

  if (editCategoryLoading) {
    return (
      <SkeletonCard
        count={12}
        height={"40px"}
        textSkeleton={false}
        isAction={false}
      />
    );
  }
  if (editCategoryError) {
    return <Error message="Error" description="Error fetching category" />;
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
        title={isEdit ? "Edit Category" : "Add New Category"}
        isArrow={false}
      />
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box spaceY={2}>
          {/* Name and Rating */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <FormGroup
              error={errors.title?.message}
              label="Category Name *"
              htmlFor="title"
            >
              <MInput
                {...register("title", {
                  required: true,
                  min: 1,
                  max: 1000000,
                })}
                id="title"
                placeholder="Enter Category Name"
                type="text"
              />
            </FormGroup>
          </Stack>

          {/* Images */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <FormGroup
              error={undefined}
              label="Product Gallery Images *"
              htmlFor="images"
            >
              <Controller
                name="thumbnail"
                control={control}
                rules={{

                  required: true,
                  validate: (value) => {
                   if (!value) {
                    return "Thumbnail is required";
                  }
                  return true;
                  },
                }}
                render={({ field }) => (
                  <MFileUpload
                    multiple={false}
                    maxFiles={1}
                    label="Upload Thumbnail"
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
            <Link to="/dashboard/categories">
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
            loadingText="Uploading Category..."
            variant="solid"
            size="sm"
            bg="teal.500"
            title={isEdit ? "Update Category" : "Add Category"}
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

export default AddCategory;
