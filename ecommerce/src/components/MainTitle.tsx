import {  Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
interface MainTitleProps {
  title: string;
  onNext?: () => void;
  onPrev?: () => void;
  pageCount?: number;
  page?: number;
  isArrow?: boolean;
}
const MainTitle = ({
  title,
  onNext,
  onPrev,
  pageCount,
  page,
  isArrow = true,
}: MainTitleProps) => {
  return (
    <HStack justifyContent={"space-between"} alignItems={"center"}>
      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        color="gray.700"
        mb={4}
      >
        {title}
      </Text>
      {isArrow && (
        <Flex gap={2} alignItems="center">
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
      )}
    </HStack>
  );
};

export default MainTitle;
