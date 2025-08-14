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
  Badge,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { ICartProduct, IProductCard } from "../interfaces";
import { FaStar } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import MainTitle from "../components/MainTitle";
import { ProductsGrid } from "../components/products/ProductsGrid";
import { deliveryInfo } from "../data";
import { useFetching } from "../Hooks/useFetching";
import { fetchProduct, fetchProductsByCategory } from "../utils/fetchingData";
import { useAppDispatch } from "../App/store";
import { addToCart } from "../App/features/cartSlice";
import MButton from "../components/ui/MButton";
import PageLoader from "../components/ui/PageLoader";
import { addToWishlist } from "../App/features/wishlistSlice";
import Error from "../components/Error/Error";

//TODO: add loading and error states

const Product = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { documentId } = useParams<{ documentId: string | undefined }>();
  const dispatch = useAppDispatch();
  //!: get product info
  const { data, isLoading, error } = useFetching<IProductCard>({
    queryKey: ["product", documentId || ""],
    queryFn: () => fetchProduct(documentId),
  });

  const product = useMemo(
    () => ({
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
    }),
    [data]
  );
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

  //!: add to cart
  const handelAddToCart = useCallback(() => {
    const cartProduct: ICartProduct = {
      ...product,
      thumbnail: {
        formats: {
          small: {
            url: product?.images?.[selectedImage]?.formats?.small?.url || "",
          },
        },
      },
    };
    dispatch(addToCart(cartProduct));
  }, [product, selectedImage, dispatch]);

  //!: add to wishlist
  const handelAddToWishlist = useCallback(() => {
    const wishlistProduct: ICartProduct = {
      ...product,
      thumbnail: {
        formats: {
          small: {
            url: product?.images?.[selectedImage]?.formats?.small?.url || "",
          },
        },
      },
    };
    dispatch(addToWishlist(wishlistProduct));
  }, [product, selectedImage, dispatch]);
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
  if (isLoading) return <PageLoader />;
  if (error) return <Error status={500} message="" />;

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {/* Product Images */}
        <Stack align={{ base: "center", md: "start" }} direction={"column"}>
          <Image
            src={`${product?.images?.[selectedImage]?.formats?.small?.url}`}
            alt={product?.title}
            borderRadius="lg"
            boxShadow="lg"
            h={{ base: "300px", md: "400px" }}
            w="100%"
            objectFit="cover"
          />

          {/* Image Thumbnails */}
          <Flex gap={2} direction={"row"}>
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
                  src={`${image?.formats?.small?.url}`}
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
            <HStack spaceX={0} bg={"gray.100"} borderRadius="md" p={1}>
              <Icon fontSize={"lg"} as={FaStar} color={"gray.300"} />
              <Text color="gray.600">{product.rating} Reviews </Text>
            </HStack>
            <Badge colorPalette={product.stock > 0 ? "green" : "red"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </HStack>
          {/* description */}
          <Text fontSize="lg" mt={3} color="gray.600">
            {product.description}
          </Text>

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
              onClick={handelAddToWishlist}
            >
              Add To Wishlist
            </Button>

            <MButton
              w="full"
              title="Add To Cart"
              variant="solid"
              colorScheme="teal"
              size="xl"
              fontWeight="bold"
              borderRadius="lg"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "lg",
              }}
              onClick={handelAddToCart}
            />
          </Flex>

          {/* Free delivery  */}
          <VStack alignItems={"start"}>{renderDeliveryInfo}</VStack>
        </VStack>
      </SimpleGrid>
      {/* related products */}
      <Box w="full" mt={6}>
        <MainTitle title="You might also like" isArrow={false} />
        <ProductsGrid
          renderProducts={renderProducts() || []}
          totalProducts={relatedProducts?.length || 0}
          isLoading={relatedProductsLoading}
          isError={relatedProductsError ? true : false}
        />
      </Box>
    </Container>
  );
};

export default Product;
