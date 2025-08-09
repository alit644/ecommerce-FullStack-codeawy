import { Box, Tabs } from "@chakra-ui/react";
import {  useState } from "react";
import ProductCard from "../ui/ProductCard";
import type { IProductCard } from "../../interfaces";
import { tabs } from "../../data";
import { useProductsByTag } from "../../Hooks/useProductsByTag";
import ProductListWrapper from "../ProductListWrapper";

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
              dataLength={data?.data?.length}
            >
              {data?.data?.map((product: IProductCard) => {
                return <ProductCard key={product.id} data={product} />;
              })}
            </ProductListWrapper>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default TabsProducts;
