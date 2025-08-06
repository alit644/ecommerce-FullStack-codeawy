import { Box, Grid, Tabs } from "@chakra-ui/react";
import { lazy, Suspense, useState } from "react";
const ProductCard = lazy(() => import("../ui/ProductCard"));
import type { IProductCard } from "../../interfaces";
import { tabs } from "../../data";
import { useProductsByTag } from "../../Hooks/useProductsByTag";
import ProductListWrapper from "../ProductListWrapper";
import SkeletonCard from "../ui/Skeleton";

const TabsProducts = () => {
  const [value, setValue] = useState<string | null>("featured");

  //! Fetch products from the API
  const { data, isLoading, error } = useProductsByTag(value);

  return (
    <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={4}>
      <Tabs.Root
        borderEnd={"0"}
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        <Tabs.List border={"none"}>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/*  Tabs Content  */}
        {tabs.map((tab) => (
          <Tabs.Content value={tab.value} key={tab.value}>
            {/*  Product List Wrapper (DATA)  */}
            <ProductListWrapper
              isLoading={isLoading}
              error={error}
              data={data?.data}
            >
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(auto-fill, minmax(220px, 1fr))",
                }}
                gap={6}
                mt={6}
              >
                {data?.data?.map((product: IProductCard) => {
                  return (
                    <Suspense key={product.id} fallback={<SkeletonCard count={5} noOfLines={3} isAction={true} />}>
                      <ProductCard  data={product} />
                    </Suspense>
                  );
                })}
              </Grid>
            </ProductListWrapper>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default TabsProducts;
