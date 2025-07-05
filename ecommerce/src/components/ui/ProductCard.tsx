import { Button, Card, Image, Text } from "@chakra-ui/react";

const ProductCard = () => {
  return (
    <Card.Root w={"330px"} bg={"gray.100"} overflow="hidden">
      <Image
        rounded="md"
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Body textAlign={"center"} gap="2">
        <Card.Description fontWeight={"bold"} fontSize="lg">
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
        <Text mt={0} textStyle="2xl" fontWeight="medium" letterSpacing="tight">
          $450
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button w={"100%"} variant="solid">
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
