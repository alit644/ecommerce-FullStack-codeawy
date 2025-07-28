import { Box, Heading, Badge, IconButton, Button } from "@chakra-ui/react";
import { BsFilterRight } from "react-icons/bs";
import { useAppDispatch } from "../../App/store";
import { openDrawer } from "../../App/features/globalSlice";
interface ProductHeaderProps {
  totalProducts: number;
}

export const ProductHeader = ({ totalProducts }: ProductHeaderProps) => {
  const dispatch = useAppDispatch();
  //TODO : Generate Fake Data (FAKER)

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Heading fontSize="2xl" as="h2" fontWeight="bold">
          Selected Products <Badge colorPalette="teal">{totalProducts}</Badge>
        </Heading>
        <Button variant={"outline"} size={"sm"} >
          Generate Fake Data
        </Button>
      </Box>
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
