import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
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
        {/* <Pagination.Root scrollBehavior="revert-layer" page={page} onPageChange={onNext}>
          <Pagination.PrevTrigger >
            <IconButton disabled={page === 1} onClick={onPrev}>
              <HiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.NextTrigger >
            <IconButton disabled={page === pageCount} onClick={onNext}>
              <HiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </Pagination.Root> */}
        <IconButton
          variant="subtle"
          aria-label="Browse categories"
          mx={2}
          onClick={onPrev}
          disabled={page === 1}
          as={HiChevronLeft}
          _icon={{ color: "gray.500", fontSize: "2xs" }}
          fontSize="md"
          _hover={{ color: "gray.700" }}
          transition="color 0.2s"
        /> 
         <IconButton
          variant="subtle"
          aria-label="Browse categories"
          onClick={onNext}
          disabled={page === pageCount}
          as={HiChevronRight}
          _icon={{ color: "gray.500", fontSize: "2xs" }}
          fontSize="md"
          _hover={{ color: "gray.700" }}
          transition="color 0.2s"
        /> 
      </Flex>
    </HStack>
  );
};

export default MainTitle;
