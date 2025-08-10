import { Center, VStack, Icon, Text } from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";
interface INoResult {
    title: string;
    description: string;
}
const NoResult = ({title= "No Products Found", description= "Try adjusting your filters or search criteria"}: INoResult) => {
  return (
    <Center h="200px">
      <VStack spaceY={4}>
        <Icon as={FaBoxOpen} boxSize={12} color="gray.300" />
        <Text fontSize="xl" fontWeight="bold" color="gray.600">
          {title}
        </Text>
        <Text color="gray.500">
          {description}
        </Text>
      </VStack>
    </Center>
  );
};

export default NoResult;
