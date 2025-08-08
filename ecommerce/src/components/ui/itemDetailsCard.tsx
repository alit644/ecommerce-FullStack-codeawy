import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

const ItemDetailsCard = () => {
  return (
    <Box>
      <HStack alignItems={"center"} gap={2}>
        <Image
          loading="lazy"
          src=""
          alt=""
          width={"60px"}
          height={"60px"}
          objectFit="cover"
          borderRadius="md"
        />
        <VStack alignItems={"start"} gap={0}>
          <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
            Laptop sa32
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            Laptop sa32
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ItemDetailsCard;
