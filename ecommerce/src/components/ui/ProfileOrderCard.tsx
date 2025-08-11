import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import MButton from "./MButton";

const ProfileOrderCard = () => {
  return (
    <Flex
    w={{base:"full",md:"80%"}}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderWidth={"1px"}
      p={2}
      gap={2}
      mb={4}
      flexWrap={'wrap'}
      borderRadius={"md"}
    >
      <HStack gap={4}>
        <Image
          loading="lazy"
          src={`https://images.unsplash.com/photo-1751193978006-4c19abfb5f3f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt={" "}
          w={"70px"}
          h={"80px"}
          objectFit="cover"
          borderRadius={"md"}
        />
        <Box >
          <Text fontSize={"md"} fontWeight={"medium"} color={"gray.800"}>
            Lenovo x240
          </Text>
          <Text fontSize={"sm"} color={"gray.500"} lineBreak={"anywhere"}>
            Lenovo x240 1TB 32 Ram
          </Text>
          <MButton  title="Remove Item" size="sm" variant="ghost" colorScheme="red"/>
        </Box>
      </HStack>
      <Text fontSize={"sm"} color={"gray.600"} fontWeight={"bold"}>
        $1000
      </Text>

      {/* actions */}
      <HStack>
        <MButton
          variant={"outline"}
          colorScheme={"blue"}
          title="View Item"
          size="sm"
        />
      </HStack>
    </Flex>
  );
};

export default ProfileOrderCard;
