import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
interface MainTitleProps {
  title: string;
  onNext?: () => void;
  onPrev?: () => void;
  pageCount?: number;
  page?: number;
}
const MainTitle = ({
  title,
  onNext,
  onPrev,
  pageCount,
  page,
}: MainTitleProps) => {
  return (
    <HStack justifyContent={"space-between"} alignItems={"center"}>
      <Box
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        color="gray.700"
        textAlign="center"
        mb={4}
      >
        {title}
      </Box>
      <Flex gap={2} alignItems="center">
        <IconButton
          variant="subtle"
          aria-label="Browse categories"
          mx={2}
          onClick={onPrev}
          disabled={page === 1}
          as={LuChevronLeft}
          fontSize="md"
          color="gray.500"
          _hover={{ color: "gray.700" }}
          transition="color 0.2s"
        />

        <IconButton
          variant="subtle"
          aria-label="Browse categories"
          onClick={onNext}
          disabled={page === pageCount}
          as={LuChevronRight}
          fontSize="md"
          color="gray.500"
          _hover={{ color: "gray.700" }}
          transition="color 0.2s"
        ></IconButton>
      </Flex>
    </HStack>
  );
};

export default MainTitle;
