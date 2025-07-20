import { Box, Heading, Badge, IconButton } from "@chakra-ui/react";
import { BsFilterRight } from "react-icons/bs";
import { useAppDispatch } from "../../App/store";
import { openDrawer } from "../../App/features/globalSlice";
interface ProductHeaderProps {
  totalProducts: number;
}

export const ProductHeader = ({ totalProducts }: ProductHeaderProps) => {
  const dispatch = useAppDispatch();
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading fontSize="2xl" as="h2" fontWeight="bold">
        Selected Products <Badge colorPalette="teal">{totalProducts}</Badge>
      </Heading>
      {/* Filter Button */}

      <IconButton
        display={{ base: "block", lg: "none" }}
        variant="ghost"
        aria-label="Filter"
        as={BsFilterRight}
        size="sm"
        _hover={{ color: "teal.600" }}
        color="teal.600"
        onClick={() => dispatch(openDrawer())}
      />
    </Box>
  );
};
