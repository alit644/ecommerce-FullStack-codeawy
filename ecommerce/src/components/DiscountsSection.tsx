import { Box } from "@chakra-ui/react";
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

      <ProductListWrapper isLoading={isLoading} error={error} dataLength={data?.data.length}>
        {data?.data?.map((product: IProductCard) => {
          // memo Product data
          return <ProductCard key={product.id} data={product} />;
        })}
      </ProductListWrapper>
    </Box>
  );
};

export default DiscountsSection;
