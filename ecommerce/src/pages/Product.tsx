import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Heading,
  Stack,
  Container,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";
import type { IProductCard } from "../interfaces";
import { FaStar } from "react-icons/fa";
import ProductInformationCard from "../components/ui/ProductInformationCard";
import ProductCard from "../components/ui/ProductCard";
import MainTitle from "../components/MainTitle";
import { ProductsGrid } from "../components/products/ProductsGrid";
import { deliveryInfo } from "../data";
import { useFetching } from "../Hooks/useFetching";
import { fetchProduct, fetchProductsByCategory } from "../utils/fetchingData";

//TODO: add loading and error states

const Product = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { documentId } = useParams<{ documentId: string | undefined }>();
  //!: get product info
  const { data, isLoading, error } = useFetching<IProductCard>({
    queryKey: ["product", documentId || ""],
    queryFn: () => fetchProduct(documentId),
  });

  const product: IProductCard = {
    id: data?.id || 0,
    documentId: data?.documentId || "",
    title: data?.title || "",
    price: data?.price || 0,
    description: data?.description || "",
    images: data?.images || [],
    discount: data?.discount || 0,
    stock: data?.stock || 0,
    quantity: data?.quantity || 0,
    rating: data?.rating || 0,
    brand: data?.brand || "",
    product_option: data?.product_option,
    category: data?.category,
  };
  //!: get category title
  const categoryTitle = product.category?.title || "";
  // related-products
  const {
    data: relatedProducts,
    isLoading: relatedProductsLoading,
    error: relatedProductsError,
  } = useFetching<IProductCard[]>({
    queryKey: ["related-products", categoryTitle],
    queryFn: () => fetchProductsByCategory(categoryTitle, documentId),
  });

  //!: Render Data
  const renderProducts = () => {
    return relatedProducts?.map((product: IProductCard) => (
      <ProductCard key={product.id} data={product} />
    ));
  };

  const renderDeliveryInfo = deliveryInfo.map((item) => (
    <Flex gap={2} key={item.name}>
      <Icon as={item.icon} boxSize={6} color={item.color} />
      <Text fontSize={"lg"} fontWeight={"medium"} color={"gray.600"}>
        {item.name}
      </Text>
    </Flex>
  ));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {/* Product Images */}
        <Stack
          align={{ base: "center", md: "start" }}
          direction={{ base: "column", md: "row-reverse" }}
        >
          <Image
            src={`${import.meta.env.VITE_BASE_URL}${
              product?.images?.[selectedImage]?.formats?.small?.url
            }`}
            alt={product?.title}
            borderRadius="lg"
            boxShadow="lg"
            maxH="500px"
            w="100%"
            objectFit="cover"
          />

          {/* Image Thumbnails */}
          <Flex gap={2} direction={{ base: "row", md: "column" }}>
            {product.images?.map((image, index) => (
              <Box
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
                border={selectedImage === index ? "2px solid" : "1px solid"}
                borderColor={selectedImage === index ? "blue.500" : "gray.200"}
                borderRadius="md"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <Image
                  key={index}
                  src={`${import.meta.env.VITE_BASE_URL}${
                    image?.formats?.small?.url
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  h="80px"
                  w="70px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Flex>
        </Stack>

        {/* Product Details */}
        <VStack align="start" spaceY={4} w={"full"} mt={{ base: 4, md: 0 }}>
          <Heading
            mb={2}
            as={"h1"}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight={"bold"}
          >
            {product.title}
          </Heading>
          <HStack spaceX={2}>
            {/* rating */}
            <HStack spaceX={0}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  fontSize={"2xl"}
                  key={star}
                  as={FaStar}
                  color={
                    star <= (product.rating || 0) ? "yellow.400" : "gray.300"
                  }
                />
              ))}
            </HStack>
            <Text color="gray.600">{`(${product.rating})`}</Text>
          </HStack>
          {/* description */}
          <Text fontSize="lg" mt={3} color="gray.600">
            {product.description}
          </Text>

          {/* Product Information*/}
          <Flex direction={"row"} flexWrap={"wrap"} gap={2} w={"full"}>
            <ProductInformationCard label="Brand" value={product.brand || ""} />
            <ProductInformationCard label="Stock" value={product.stock || ""} />

            {product.product_option?.color && (
              <ProductInformationCard
                label="Color"
                value={product.product_option?.color || ""}
              />
            )}
            {product.product_option?.storage && (
              <ProductInformationCard
                label="Storage"
                value={product.product_option?.storage || ""}
              />
            )}
          </Flex>
          {/* price */}
          <Text fontSize="4xl" color="blackAlpha.900" fontWeight="bolder">
            ${product.price}
          </Text>

          {/* Action */}
          <Flex gap={2} flexWrap={"wrap"} w="full">
            <Button
              w="full"
              variant={"outline"}
              colorScheme="teal"
              size="xl"
              fontWeight="bold"
              borderRadius="lg"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "lg",
              }}
            >
              Add To Wishlist
            </Button>
            <Button
              w="full"
              colorScheme="teal"
              size="xl"
              fontWeight="bold"
              borderRadius="lg"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "lg",
              }}
            >
              Add To Cart
            </Button>
          </Flex>

          {/* Free delivery  */}
          <VStack alignItems={"start"}>{renderDeliveryInfo}</VStack>
        </VStack>

        {/* related products */}
        <VStack alignItems={"start"}>
          <MainTitle title="More From This Category" isArrow={false} />
          <ProductsGrid
            renderProducts={renderProducts() || []}
            totalProducts={relatedProducts?.length || 0}
            isLoading={relatedProductsLoading}
            isError={relatedProductsError ? true : false}
          />
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default Product;
