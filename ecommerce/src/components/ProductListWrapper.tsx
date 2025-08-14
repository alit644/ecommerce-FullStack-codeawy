import { Grid } from "@chakra-ui/react";
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
    return <SkeletonCard count={5} noOfLines={3} isAction={true} />;
  if (error)
    return (
      <Error
        status={500}
        message=""
      />
    );
  if (!dataLength) return <NoResult title="No products found" description="Try adjusting your filters or search criteria" />;
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
