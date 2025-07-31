import { Box, Grid } from "@chakra-ui/react";
import type { JSX } from "react";
import Skeleton from "../ui/Skeleton";
import Error from "../Error/Error";
import NoResult from "../ui/NoResult";

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
  if (totalProducts === 0) return <NoResult />;
  if (isError)
    return (
      <Error code={500} message="Error" description="Something went wrong" />
    );

  return (
    <Box w="full" p={3}>
      <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
        {renderProducts}
      </Grid>
    </Box>
  );
};
