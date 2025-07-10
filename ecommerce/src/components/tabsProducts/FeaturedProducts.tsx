import { Box } from "@chakra-ui/react";
import TabsProducts from "./TabsProducts";

const FeaturedProducts = () => {
  //TODO: Add prefetchQuery 
  return (
    <Box my={6}>
      <TabsProducts />
    </Box>
  );
};

export default FeaturedProducts;
