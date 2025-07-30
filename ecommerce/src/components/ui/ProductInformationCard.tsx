import React from "react";
import { Box, HStack, Square, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons/lib";
interface IProductInformationCard {
  label: string;
  value: string | number | string[];
  children?: React.ReactNode;
  icon?: IconType;
  color?: string;
  
}
const ProductInformationCard = ({
  label,
  value,
  icon,
  children,
  color,
}: IProductInformationCard) => {
  return (
    <Box
      p={5}
      _hover={{
        bg: "blue.100",
        border: "1px solid blue",
        transition: "all 0.3s ease",
      }}
      maxW={"350px"}
      minW={"45%"}
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Box alignItems="start">
          <Text fontSize="lg" color="gray.600" fontWeight="semibold">
            {label}
          </Text>
          <Text fontSize="xl" color="gray.700" fontWeight="bold" as={"h2"}>
            {value}
          </Text>
        </Box>

        {/* Icon */}
        {icon && (
          <Square size="14" bg={color} borderRadius="md" color="white">
            {React.createElement(icon, { size: 24 })}
          </Square>
        )}
      </HStack>
      {children && children}
    </Box>
  );
};

export default ProductInformationCard;
