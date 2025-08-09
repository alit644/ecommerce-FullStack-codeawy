import { Grid } from "@chakra-ui/react";
import type { IProductCard } from "../interfaces";
import Error from "./Error/Error";
import NoResult from "./ui/NoResult";
import SkeletonCard from "./ui/Skeleton";
interface ProductCardLoaderProps {
  isLoading: boolean;
  error: Error | null;
  dataLength: number;
  children: React.ReactNode;
}
const ProductListWrapper = ({
  isLoading,
  error,
  dataLength,
  children,
}: ProductCardLoaderProps) => {
  if (isLoading)
    return <SkeletonCard count={6} noOfLines={3} isAction={true} />;
  if (error)
    return (
      <Error
        code={500}
        message="Error"
        description="Failed to fetch products"
      />
    );
  if (!dataLength) return <NoResult />;
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
        gap={6}
        mt={6}
      >
        {children}
      </Grid>
    </>
  );
};

export default ProductListWrapper;
