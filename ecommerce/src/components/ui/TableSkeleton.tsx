import { Flex, Skeleton, HStack, VStack } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <VStack
      mt={4}
      gap={3}
      w="100%"
      overflow="auto"
      p={3}
      borderRadius={"md"}
      border={"1px solid #e4e4e7"}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Flex
          key={index}
          direction={"row"}
          alignItems={"center"}
          w={"full"}
          gap={3}
        >
          <Skeleton height={50} w={50} />
          <Skeleton height={"4"} w={"32"} />
          <Skeleton height={"4"} w={"32"} />
          <Skeleton height={"4"} w={"32"} />
          <Skeleton height={"4"} w={"32"} />
          <Skeleton height={"4"} w={"32"} />
          <Skeleton height={"4"} w={"32"} />
          <HStack>
            <Skeleton height={"4"} w={"12"} bg={"blue.500"} />
            <Skeleton height={"4"} w={"12"} bg={"red.500"} />
          </HStack>
        </Flex>
      ))}
    </VStack>
  );
};

export default TableSkeleton;
