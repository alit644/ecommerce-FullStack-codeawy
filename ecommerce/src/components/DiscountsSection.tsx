import { Grid, Box } from "@chakra-ui/react";
import MainTitle from "./MainTitle";
import { fetchDiscounts } from "../utils/fetchingData";
import type { IProductCard } from "../interfaces";
import ProductCard from "./ui/ProductCard";
import { useFetching } from "../Hooks/useFetching";
import ProductListWrapper from "./ProductListWrapper";

const DiscountsSection = () => {
  const { data, isLoading, error } = useFetching({
    queryKey: ["discounts"],
    queryFn: () => fetchDiscounts(),
  });

  return (
    <Box spaceY={8} w="full">
      <MainTitle title="Special Offers" isArrow={false} />
      <ProductListWrapper isLoading={isLoading} error={error} data={data?.data}>
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
      </ProductListWrapper>
    </Box>
  );
};

export default DiscountsSection;
