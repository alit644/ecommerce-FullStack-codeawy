import { Box, Grid } from "@chakra-ui/react";
import type { JSX } from "react";
import Error from "../Error/Error";
import NoResult from "../ui/NoResult";
import SkeletonCard from "../ui/Skeleton";

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
  if (isLoading)
    return <SkeletonCard count={6} noOfLines={3} isAction={true} />;
  if (totalProducts === 0) return <NoResult />;
  if (isError)
    return (
      <Error code={500} message="Error" description="Something went wrong" />
    );

  return (
    <Box w="full" p={3}>
       <Grid
          w="full"
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
          gap={6}
        >
        {renderProducts}
      </Grid>
    </Box>
  );
};
