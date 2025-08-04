import {
  Box,
  Text,
  Heading,
  VStack,
  Badge,
  Grid,
} from "@chakra-ui/react";
import ProductInformationCard from "../../components/ui/ProductInformationCard";
import { dashboardOverview } from "../../data";
import RecentProductsCard from "../../components/ui/RecentProductsCard";
const Index = () => {
  const renderProductInformationCard = dashboardOverview.map((item) => (
    <ProductInformationCard
      key={item.name}
      label={item.name}
      value={item.count}
      icon={item.icon}
      children={
        <>
          <Text fontSize="sm" mt={4} color="gray.500" fontWeight="semibold">
            <Badge
              mr={2}
              colorScheme="green"
              colorPalette={item.percentage.includes("+") ? "green" : "red"}
            >
              {item.percentage}
            </Badge>
            {item.description}
          </Text>
        </>
      }
      color={item.color}
    />
  ));


  return (
    <Box>
      <VStack alignItems="start" mb={4}>
        <Heading as="h2" fontSize="2xl" fontWeight="bold" color="gray.700">
          Dashboard Overview
        </Heading>
        <Text color="gray.500">
          Welcome back! Here's what's happening with your products.
        </Text>
      </VStack>
      <Grid
        mb={8}
        gap={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {renderProductInformationCard}
      </Grid>

      {/* Recent Products */}
      <VStack
        divideY="1px"
        divideColor="gray.200"
        alignItems="start"
        mb={4}
        boxShadow="md"
      >
        <Heading
          p={4}
          borderBottom="1px solid gray.200"
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          color="gray.700"
          w={"full"}
        >
          Recent Products
        </Heading>
        <Box p={4} w={"full"}>
          <RecentProductsCard />
          <RecentProductsCard />
          <RecentProductsCard />
          <RecentProductsCard />
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
