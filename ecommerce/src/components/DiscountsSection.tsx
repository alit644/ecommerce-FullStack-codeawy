import { Grid, Box } from "@chakra-ui/react";
import MainTitle from "./MainTitle";
import { fetchDiscounts } from "../utils/fetchingData";
import type { IProductCard } from "../interfaces";
import ProductCard from "./ui/ProductCard";
import Error from "./Error/Error";
import Skeleton from "./ui/Skeleton";
import { useFetching } from "../Hooks/useFetching";

const DiscountsSection = () => {
  const { data, isLoading, error } = useFetching({
    queryKey: ["discounts"],
    queryFn: () => fetchDiscounts(),
  });

  if (isLoading) return <Skeleton height="220px" count={6} />;
  if (error)
    return (
      <Error
        code={500}
        message="Error"
        description="Failed to fetch discounts"
      />
    );
  return (
    <Box spaceY={8} w="full">
      <MainTitle title="Special Offers" isArrow={false} />
      <Grid
        w="full"
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
        gap={6}
      >
        {data?.data?.map((product: IProductCard) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default DiscountsSection;
