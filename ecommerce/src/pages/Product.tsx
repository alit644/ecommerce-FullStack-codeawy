import { 
  Box, 
  Text, 
  Image, 
  VStack, 
  HStack, 
  Badge, 
  Button, 
  SimpleGrid, 
  Heading, 
  Stack, 
  Icon, 
  Container,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  rating: number;
  stock: number;
}

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product: ProductProps = {
    id: 1,
    name: 'Modern Wireless Headphones',
    price: 199.99,
    description: 'Experience premium sound quality with our wireless headphones. With up to 30 hours of battery life and noise cancellation technology, these headphones are perfect for your daily commute or workout sessions.',
    images: [
      'https://images.pexels.com/photos/1696125/pexels-photo-1696125.jpeg',
      'https://images.pexels.com/photos/29801986/pexels-photo-29801986.jpeg',
      'https://images.pexels.com/photos/1696125/pexels-photo-1696125.jpeg'
    ],
    rating: 4.5,
    stock: 25
  };

  const handleAddToCart = () => {
   console.log('product added to cart');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }}  spaceX={10}>
        {/* Product Images */}
        <Stack spaceY={4} align="center" direction="row-reverse">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            borderRadius="lg"
            boxShadow="lg"
            maxH="500px"
            w="100%"
            objectFit="cover"
            
          />
          
          {/* Image Thumbnails */}
          <VStack spaceY={2}>
            {product.images.map((image, index) => (
              <Box
                key={index}
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
                border={selectedImage === index ? '2px solid' : '1px solid'}
                borderColor={selectedImage === index ? 'blue.500' : 'gray.200'}
                borderRadius="md"
                _hover={{
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  h="80px"
                  w="70px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </VStack>
        </Stack>

        {/* Product Details */}
        <VStack spaceY={6} align="start">
          <Heading size="xl" mb={2}>{product.name}</Heading>
          
          <HStack spaceX={2}>
            <HStack spaceX={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={FaStar}
                  color={star <= product.rating ? 'yellow.400' : 'gray.300'}
                />
              ))}
            </HStack>
            <Text color="gray.600">{product.rating}</Text>
          </HStack>

          <HStack spaceX={2}>
            <Text fontSize="2xl" fontWeight="bold">${product.price}</Text>
            <Badge colorScheme="green">In Stock</Badge>
            <Text color="gray.500">{product.stock} left</Text>
          </HStack>

          <Text fontSize="lg" color="gray.600" mb={4}>
            {product.description}
          </Text>

          {/* Quantity Selector */}
          <HStack>
            <Button
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >-</Button>
            <Text fontSize="lg" fontWeight="bold">{quantity}</Text>
            <Button
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
            >+</Button>
          </HStack>

          {/* Action Buttons */}
          <HStack spaceX={4}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              colorScheme="red"
              size="lg"
              
            >
              Add to Wishlist
            </Button>
          </HStack>

          {/* Product Information */}
          <Box>
            <Heading size="md" mb={2}>Product Information</Heading>
            <Stack spaceY={2}>
              <HStack>
                <Text fontWeight="bold">Brand:</Text>
                <Text>Brand Name</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Category:</Text>
                <Text>Electronics</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">SKU:</Text>
                <Text>SKU12345</Text>
              </HStack>
            </Stack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default Product;
