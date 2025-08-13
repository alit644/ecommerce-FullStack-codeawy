import { Box, Text, Heading, VStack, Badge, Grid } from "@chakra-ui/react";
import ProductInformationCard from "../../components/ui/ProductInformationCard";
import RecentProductsCard from "../../components/ui/RecentProductsCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../Api/axios";
import cookieManager from "../../utils/cookieManager";
import { Navigate } from "react-router";
import { FaDollarSign } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import SkeletonCard from "../../components/ui/Skeleton";
import Error from "../../components/Error/Error";
import NoResult from "../../components/ui/NoResult";
const fetchDashboardStatistics = async (token: string) => {
  try {
    const { data } = await api.get("/api/dashboard-stat", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Index = () => {
  const token = cookieManager.get<string>("jwt");
  if (!token) return <Navigate to="/" replace />;
  //! Get Dashboard statistics
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardStatistics(token as string),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });

  // render recent products
  const renderRecentProducts = data?.latestProducts?.map((product: any) => (
    <RecentProductsCard key={product.id} product={product}/>
  ));

  if (isLoading)
    return (
      <SkeletonCard count={5} noOfLines={0} isAction={false} width="full" />
    );
  if (error) return <Error status={404} message="" height="full" />;
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
        <ProductInformationCard
          label="Total Products"
          value={data?.products}
          icon={GoInbox}
          color="blue.500"
          children={
            <>
              <Text fontSize="sm" mt={4} color="gray.500" fontWeight="semibold">
                <Badge
                  mr={2}
                  colorScheme="green"
                  colorPalette={data?.products > 0 ? "green" : "red"}
                >
                  {data?.products > 0 ? "+" : "-"}
                  {data?.products}
                </Badge>
                {data?.products > 0 ? "increase" : "decrease"} from last month
              </Text>
            </>
          }
        />
        <ProductInformationCard
          label="Total Categories"
          value={data?.categories}
          icon={BiCategory}
          color="green.500"
          children={
            <>
              <Text fontSize="sm" mt={4} color="gray.500" fontWeight="semibold">
                <Badge
                  mr={2}
                  colorScheme="green"
                  colorPalette={data?.categories > 0 ? "green" : "red"}
                >
                  {data?.categories > 0 ? "+" : "-"}
                  {data?.categories}
                </Badge>
                {data?.categories > 0 ? "increase" : "decrease"} from last month
              </Text>
            </>
          }
        />
        <ProductInformationCard
          label="Total Orders"
          value={data?.orders}
          icon={BsBoxSeam}
          color="purple.500"
          children={
            <>
              <Text fontSize="sm" mt={4} color="gray.500" fontWeight="semibold">
                <Badge
                  mr={2}
                  colorScheme="green"
                  colorPalette={data?.orders > 0 ? "green" : "red"}
                >
                  {data?.orders > 0 ? "+" : "-"}
                  {data?.orders}
                </Badge>
                {data?.orders > 0 ? "increase" : "decrease"} from last month
              </Text>
            </>
          }
        />
        <ProductInformationCard
          label="Total Value"
          value={data?.totalPrice}
          icon={FaDollarSign}
          color="orange.500"
          children={
            <>
              <Text fontSize="sm" mt={4} color="gray.500" fontWeight="semibold">
                <Badge
                  mr={2}
                  colorScheme="green"
                  colorPalette={data?.totalPrice > "0" ? "green" : "red"}
                >
                  {data?.totalPrice > "0" ? "+" : "-"}
                  {data?.totalPrice}
                </Badge>
                {data?.totalPrice > "0" ? "increase" : "decrease"} from last
                month
              </Text>
            </>
          }
        />
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
         {
          data?.latestProducts?.length === 0 ? (
            <NoResult
              title="No Recent Products"
              description="No recent products found"
            />
          ) : (
            renderRecentProducts
          )
         }
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
