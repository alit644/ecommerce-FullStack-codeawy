import { Box, Grid, Text, Center, VStack, Icon } from "@chakra-ui/react";
import type { JSX } from "react";
import Skeleton from "../ui/Skeleton";
import { FaBoxOpen } from "react-icons/fa";

interface ProductsGridProps {
  renderProducts: JSX.Element[];
  totalProducts: number;
  isLoading: boolean;
  isError: boolean;
}

export const ProductsGrid = ({
  renderProducts,
  totalProducts,
  isLoading,
  isError,
}: ProductsGridProps) => {
  if (isLoading) return <Skeleton height="220px" />;
  if (totalProducts === 0)
    return (
      <Center h="200px">
        <VStack spaceY={4}>
          <Icon as={FaBoxOpen} boxSize={12} color="gray.300" />
          <Text fontSize="xl" fontWeight="bold" color="gray.600">
            No Products Found
          </Text>
          <Text color="gray.500">
            Try adjusting your filters or search criteria
          </Text>
        </VStack>
      </Center>
    );
  if (isError) return <div>Error</div>;

  return (
    <Box w="full" p={3}>
      <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
        {renderProducts}
      </Grid>
    </Box>
  );
};
