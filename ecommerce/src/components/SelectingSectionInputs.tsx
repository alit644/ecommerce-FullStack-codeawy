import { Box, Flex } from "@chakra-ui/react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import MSelect from "./ui/Select";
import ErrorMsg from "./Error/ErrorMsg";
import type { ICategory, IFormInput, ITag } from "../interfaces";
import api from "../Api/axios";
import { useQuery } from "@tanstack/react-query";
import Error from "./Error/Error";

interface ISelectingSectionInputs {
  control: Control<IFormInput> | undefined;
  errors: FieldErrors<IFormInput>;
}

const SelectingSectionInputs = ({
  control,
  errors,
}: ISelectingSectionInputs) => {
  //  Get categories from strapi and Tags
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchFilters = async (): Promise<any> => {
    const [catRes, tagRes] = await Promise.all([
      api.get("/api/categories?fields=title"),
      api.get("/api/tags?fields=tag"),
    ]);
    return {
      categories: catRes.data,
      tags: tagRes.data,
    };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
  const categoryOptions = data?.categories?.data.map((category:ICategory) => ({
   value: String(category.documentId),
   label: category.title
 }));
 
 const tagOptions = data?.tags?.data.map((tag:ITag) => ({
   value: String(tag.documentId),
   label: tag.tag
 }));

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <Error code={500} message="Error" description="Failed to fetch filters" />
    );

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
              options={categoryOptions}
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
              options={tagOptions}
              multiple
            />
          )}
        />

        {errors.tags?.message && <ErrorMsg message={errors.tags?.message} />}
      </Box>
      
    </Flex>
  );
};

export default SelectingSectionInputs;
