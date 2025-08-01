import { Box, Flex, Stack } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import MInput from "../../components/ui/MInput";
import MTextarea from "../../components/ui/Textarea ";
import MFileUpload from "../../components/ui/FileUpload";
import MButton from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {
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
      <form onSubmit={(e) => e.preventDefault()}>
        <Box spaceY={2}>
          {/* Name and Rating */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <Box w={"full"} spaceY={2}>
              <label
                htmlFor="name"
                style={{
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Product Name *
              </label>
              <MInput placeholder="Enter Product Name" type="text" w={"full"} />
            </Box>
            <Box w={"full"} spaceY={2}>
              <label
                htmlFor="rating"
                style={{
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Product Rating *
              </label>
              <MInput
                placeholder="Enter Product Rating"
                type="number"
                w={"full"}
              />
            </Box>
          </Stack>
          {/* Description and Image */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <Box w={"full"} spaceY={2}>
              <label
                htmlFor="description"
                style={{
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Product Description *
              </label>
              <MTextarea placeholder="Enter Product Description" />
            </Box>
            <Box w={"full"} spaceY={2}>
              <label
                htmlFor="image"
                style={{
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Main Thumbnail *
              </label>
              <MFileUpload
                maxFiles={1}
                height={"100px"}
                label="Upload Main Thumbnail"
              />
            </Box>
          </Stack>
          {/* // price and discount and stock  */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <Flex
              border="1px solid #e4e4e7"
              p={2}
              borderRadius="md"
              w={"full"}
              flexDir={"column"}
              gap={2}
            >
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="price"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Price *
                </label>
                <MInput
                  placeholder="Enter Product Price"
                  type="number"
                  w={"full"}
                />
              </Box>
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="discount"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Discount *
                </label>
                <MInput
                  placeholder="Enter Product Discount"
                  type="number"
                  w={"full"}
                />
              </Box>
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="stock"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Stock *
                </label>
                <MInput
                  placeholder="Enter Product Stock"
                  type="number"
                  w={"full"}
                />
              </Box>
            </Flex>
            <Flex
              border="1px solid #e4e4e7"
              p={2}
              borderRadius="md"
              w={"full"}
              flexDir={"column"}
              gap={2}
            >
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="category"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Category *
                </label>
                <MInput
                  placeholder="Enter Product Category"
                  type="text"
                  w={"full"}
                />
              </Box>
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="tags"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Tags *
                </label>
                <MInput
                  placeholder="Enter Product Tags"
                  type="text"
                  w={"full"}
                />
              </Box>
              <Box w={"full"} spaceY={2}>
                <label
                  htmlFor="brand"
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Product Brand *
                </label>
                <MInput
                  placeholder="Enter Product Brand"
                  type="text"
                  w={"full"}
                />
              </Box>
            </Flex>
          </Stack>
          {/* Images */}
          <Stack w={"full"} direction={{ base: "column", md: "row" }} gap={2}>
            <Box w={"full"} spaceY={2}>
              <label
                htmlFor="image"
                style={{
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Product Gallery Images *
              </label>
              <MFileUpload maxFiles={5} label="Upload Gallery Images" />
            </Box>
          </Stack>
        </Box>
      </form>

      {/* Actions */}
      <Flex justifyContent="flex-end" gap={2} mt={4}>
        <MButton variant="outline" size="sm" title="Reset" w={"fit-content"} />
        <MButton
          variant="solid"
          size="sm"
          bg="teal.500"
          title="Add Product"
          w={"fit-content"}
          _hover={{ bg: "teal.600" }}
          icon={<FaPlus />}
        />
      </Flex>
    </Box>
  );
};

export default AddProduct;
