import { Box, Grid, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import ProductCard from "../ui/ProductCard";
import type { IProductCard } from "../../interfaces";
import { tabs } from "../../data";
import { useProductsByTag } from "../../Hooks/useProductsByTag";
import Skeleton from "../ui/Skeleton";

const TabsProducts = () => {
  const [value, setValue] = useState<string | null>("featured");

  //! Fetch products from the API
  const { data, isLoading, error } = useProductsByTag(value);

  //! Render the products based on the selected tab
  const renderProducts = data?.data?.map((product: IProductCard) => {
    return (
      <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        thumbnail={{
          url: `${import.meta.env.VITE_BASE_URL}${product.thumbnail.url}`,
        }}
      />
    );
  });

  if (isLoading) return <Skeleton height="300px"/>
  if (error) return <div>Error fetching products</div>;
  if (data?.data?.length === 0) return <div>لا توجد منتجات في هذا القسم</div>;

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
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
              gap={6}
              mt={6}
            >
              {renderProducts}
            </Grid>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default TabsProducts;
