interface IFileUpload {
  maxFiles: number;
  value: FileList | File[] | (File | string)[] | string;
  onChange: (value: (File | FileList | string)[]) => void;
  height?: string;
  label?: string;
  imageIsLoading: boolean;
  multiple?: boolean;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  FileUpload,
  Float,
  Text,
  useFileUploadContext,
  Spinner,
  Box,
  Center,
  Image,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { HiUpload } from "react-icons/hi";
import { LuX } from "react-icons/lu";

const FileUploadList = ({ imageIsLoading }: { imageIsLoading: boolean }) => {
  // watch files use react-hook-form
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup
      w={"fit-content"}
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      flexDir="row"
    >
      {files.map((file) => (
        <FileUpload.Item
          position="relative"
          w="auto"
          boxSize="24"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          {imageIsLoading && (
            <Box pos="absolute" inset="0" bg="bg/80">
              <Center h="full">
                <Spinner color="teal.500" />
              </Center>
            </Box>
          )}

          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger
              disabled={imageIsLoading}
              _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
              boxSize="4"
              layerStyle="fill.solid"
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

const MFileUpload = ({
  maxFiles = 1,
  height,
  label,
  value,
  imageIsLoading,
  onChange,
  multiple = false,
}: IFileUpload) => {
  // Handle different value types
  const existingImagesValue = (() => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.filter((item) => typeof item === "string") as string[];
    }
    if (typeof value === "string") {
      return [value];
    }
    // Convert FileList to array
    if (value instanceof FileList) {
      return Array.from(value).filter(
        (file) => typeof file === "string"
      ) as string[];
    }
    return [];
  })();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (multiple) {
        onChange([...existingImagesValue, ...fileArray]);
      } else {
        onChange([fileArray[0]]);
      }
    }
  };

  const handleDelete = useCallback(
    (index: number | string) => {
      const updatedImages = [...existingImagesValue];
      updatedImages.splice(index as number, 1);
      onChange(updatedImages);
    },
    [existingImagesValue]
  );

  return (
    <FileUpload.Root accept={["image/*"]} maxFiles={maxFiles}>
      <FileUpload.HiddenInput onChange={handleChange} />
      <FileUpload.Trigger
        bg={"gray.50"}
        _hover={{
          borderColor: "#2dd4bf",
          transition: "all 0.2s ease-in-out",
          bg: "gray.100",
        }}
        border="2px dashed #e4e4e7"
        borderRadius="md"
        asChild
        w={"full"}
        h={height || "140px"}
      >
        <Button variant="ghost" size="sm" flexDir="column">
          <HiUpload /> {label || "Upload Image"}
          {maxFiles > 1 && (
            <Text fontSize="xs" color="gray.500">
              You can upload up to {maxFiles} images
            </Text>
          )}
        </Button>
      </FileUpload.Trigger>
      <Stack direction={"row"} w={"full"} gap={3} flexWrap={"wrap"}>
        <FileUploadList imageIsLoading={imageIsLoading} />
        <Stack w={"fit-content"} direction={"row"} flexWrap={"wrap"}>
          {existingImagesValue.length !== 0
            ? (existingImagesValue.join(" ").split(" ") || []).map((image) => (
                <Box
                  key={image}
                  bg="gray.50"
                  borderRadius="xl"
                  position="relative"
                  transition="transform 0.2s"
                  w="auto"
                  boxSize="24"
                  p="2"
                  border="2px solid #e4e4e7"
                >
                  {imageIsLoading && (
                    <Box pos="absolute" inset="0" bg="bg/80">
                      <Center h="full">
                        <Spinner color="teal.500" />
                      </Center>
                    </Box>
                  )}
                  <Box pos="absolute" top="0" left="0">
                    <Center h="full">
                      <Badge
                        colorScheme="blue"
                        fontSize="xs"
                        colorPalette={"green"}
                      >
                        Current Image
                      </Badge>
                    </Center>
                  </Box>
                  <Image
                    loading="lazy"
                    src={`${import.meta.env.VITE_BASE_URL}${image}`}
                    alt="Existing Image"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    bg="gray.100"
                  />
                  {/* delete button */}
                  <Box
                    position="absolute"
                    top="-3"
                    right="-2"
                    onClick={() => handleDelete(image)}
                  >
                    <Button
                      unstyled
                      disabled={imageIsLoading}
                      p={0}
                      _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
                      variant="solid"
                      bg={"black"}
                      colorScheme="red"
                      color={"white"}
                      boxSize={4}
                      cursor={"pointer"}
                    >
                      <Center>
                        <LuX size={12} />
                      </Center>
                    </Button>
                  </Box>
                </Box>
              ))
            : null}
        </Stack>
      </Stack>
    </FileUpload.Root>
  );
};
export default MFileUpload;
