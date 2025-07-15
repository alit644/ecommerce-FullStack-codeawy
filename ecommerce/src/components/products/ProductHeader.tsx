import { Box, Heading, Badge } from "@chakra-ui/react";

interface ProductHeaderProps {
  totalProducts: number;
}

export const ProductHeader = ({ totalProducts }: ProductHeaderProps) => (
  <Box w="full">
    <Heading fontSize="2xl" as="h2" fontWeight="bold">
      Selected Products{" "}
      <Badge colorPalette="teal">{totalProducts}</Badge>
    </Heading>
  </Box>
);
