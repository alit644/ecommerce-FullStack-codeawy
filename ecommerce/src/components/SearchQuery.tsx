import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import MInput from "./ui/MInput";
interface ISearchQuery {
  setSearchQuery: (query: string) => void;
}
const SearchQuery = ({ setSearchQuery }: ISearchQuery) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 600);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <Box w="full" position="relative">
      <Box
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
      >
        <FaSearch size={16} color="#ccc" />
      </Box>
      <MInput
        value={query}
        onChange={handleChange}
        type="search"
        placeholder="Search products..."
        pl="32px"
        bg="white"
        maxW={{ md: "86%", lg: "37%" }}
        _placeholder={{ color: "gray.500" }}
        borderColor="gray.200"
        _focus={{
          shadow: "0 0 4px 0 rgb(0, 128, 128)",
          borderColor: "teal.500",
        }}
        borderRadius="md"
      />
    </Box>
  );
};

export default SearchQuery;
