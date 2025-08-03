import {
  Box,
  Text,
  Heading,
  VStack,
  Badge,
  Grid,
  Field,
  Input,
  Button,
} from "@chakra-ui/react";
import ProductInformationCard from "../../components/ui/ProductInformationCard";
import { dashboardOverview } from "../../data";
import RecentProductsCard from "../../components/ui/RecentProductsCard";
import { useState } from "react";
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
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      console.log(file);
      try {
       const formData = new FormData();
      formData.append("files", file);
       const response = await fetch("http://localhost:1337/api/upload", {
         method: "POST",
         body: formData,
       });
       const data = await response.json();
       console.log(data);
      } catch (error) {
       console.log(error)
       
      }
    }
  };
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
        {/* File Upload */}
        <form action="" onSubmit={handelSubmit}>
          <Field.Root required>
            <Field.Label>
              Image <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="file"
              placeholder="Upload Image"
              onChange={handleFileChange}
            />
            <Field.HelperText>Upload product image</Field.HelperText>
            <Button type="submit">Upload</Button>
          </Field.Root>
        </form>
      </VStack>
    </Box>
  );
};

export default Index;
