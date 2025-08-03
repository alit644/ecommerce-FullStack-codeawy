/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  FileUpload,
  Float,
  Text,
  useFileUploadContext,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuX } from "react-icons/lu";

const FileUploadList = () => {
  // watch files use react-hook-form

  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup display="flex" alignItems="center" flexDir="row">
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="24"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};
interface IFileUpload {
  maxFiles: number;
  value: FileList | File[] | (File | string)[];
  onChange: (value: (File | FileList | string)[]) => void;
  height?: string;
  label?: string;
}
const MFileUpload = ({
  maxFiles = 1,
  height,
  label,
  value,
  onChange,
 }: IFileUpload) => {
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    const fileArray = Array.from(files);
    onChange(fileArray);
  }
};
  return (
    <FileUpload.Root accept={["image/*"]} maxFiles={maxFiles}>
      <FileUpload.HiddenInput
        onChange={handleChange}
      />
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
      <FileUploadList />
    </FileUpload.Root>
  );
};
export default MFileUpload;
