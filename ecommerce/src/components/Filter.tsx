import {
  Box,
  Accordion,
  Input,
  Checkbox,
  Stack,
  Button,
  For,
} from "@chakra-ui/react";
import api from "../Api/axios";
import { useQuery } from "@tanstack/react-query";
import type { FilterType, ICategory, ITag } from "../interfaces";
import { brands, price } from "../data";

interface IFilterSidebarprops {
  filters: FilterType;
  handleFilterChange: (filter: string, value: string[]) => void;
  resetFilters: () => void;
}

const fetchFilters = async () => {
  const [catRes, tagRes] = await Promise.all([
    api.get("/api/categories?fields=title"),
    api.get("/api/tags?fields=tag"),
  ]);
  return {
    categories: catRes.data,
    tags: tagRes.data,
  };
};

//TODO : refactor this code (FilterSidebar)
//TODO : Add Price Section

const FilterSidebar = ({
  filters,
  handleFilterChange,
  resetFilters,
}: IFilterSidebarprops) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  //! Render Data
  const categories: ICategory[] = data?.categories?.data;
  const tags: ITag[] = data?.tags?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box w="full" maxW="300px" p={2} borderRight="1px solid #e2e8f0">
      <Accordion.Root collapsible defaultValue={[""]}>
        {/* Brand Section */}
        <Accordion.Item p={2} value="brand" key="brand">
          <h2>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Brand
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h2>
          <Accordion.ItemContent pb={4}>
            <Input placeholder="Search" mb={3} />
            <Stack align="start" spaceY={1} w="full">
              <Checkbox.Group
                value={filters.brand}
                onValueChange={(e: string[]) => {
                  handleFilterChange("brand", e);
                }}
              >
                <For each={brands}>
                  {(brand) => (
                    <Checkbox.Root
                      value={brand.name}
                      colorPalette="teal"
                      size="md"
                      key={brand.name}
                      p={2}
                      w="full"
                      display="flex"
                      flexDirection="row"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{brand.name} </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                </For>
              </Checkbox.Group>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* categories  Section*/}

        <Accordion.Item p={2} value="categories" key="categories">
          <h2>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Categories
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h2>
          <Accordion.ItemContent pb={4}>
            <Input placeholder="Search" mb={3} />
            <Stack align="start" spaceY={1} w="full">
              <Checkbox.Group
                value={filters.category}
                onValueChange={(e: string[]) =>
                  handleFilterChange("category", e)
                }
              >
                <For each={categories}>
                  {(category) => (
                    <Checkbox.Root
                      value={category.title}
                      colorPalette="teal"
                      size="md"
                      key={category.title}
                      p={2}
                      w="full"
                      display="flex"
                      flexDirection="row"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{category.title} </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                </For>
              </Checkbox.Group>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Price */}
        <Accordion.Item p={2} value="price" key="price">
          <h2>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Price
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h2>
          <Accordion.ItemContent pb={4}>
            <Input placeholder="Search" mb={3} />
            <Stack align="start" spaceY={1} w="full">
              <Checkbox.Group
                value={filters.price}
                onValueChange={(e: string[]) => handleFilterChange("price", e)}
              >
                <For each={price}>
                  {(price) => (
                    <Checkbox.Root
                      value={price.name}
                      colorPalette="teal"
                      size="md"
                      key={price.name}
                      p={2}
                      w="full"
                      display="flex"
                      flexDirection="row"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{price.name} </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                </For>
              </Checkbox.Group>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* tags */}

        <Accordion.Item p={2} value="tags" key="tags">
          <h2>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Tags
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h2>
          <Accordion.ItemContent pb={4}>
            <Input placeholder="Search" mb={3} />
            <Stack align="start" spaceY={1} w="full">
              <Checkbox.Group
                value={filters.tags}
                onValueChange={(e: string[]) => handleFilterChange("tags", e)}
              >
                <For each={tags}>
                  {(tag) => (
                    <Checkbox.Root
                      value={tag.tag}
                      colorPalette="teal"
                      size="md"
                      key={tag.tag}
                      p={2}
                      w="full"
                      display="flex"
                      flexDirection="row"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{tag.tag} </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                </For>
              </Checkbox.Group>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      {/* Reset Button */}
      <Button
        colorScheme="blackAlpha"
        w="full"
        mt={4}
        variant="outline"
        size="md"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
