import { Box, Accordion, Button } from "@chakra-ui/react";
import api from "../Api/axios";
import { useQuery } from "@tanstack/react-query";
import type {
  CheckboxOption,
  FilterType,
  IAccordionItems,
  ICategory,
  ITag,
} from "../interfaces";
import { brands, price } from "../data";
import AccordionComponent from "./Accordion/Accordion";
import { useMemo } from "react";
import Error from "./Error/Error";
import SkeletonCard from "./ui/Skeleton";

//TODO: add filter price

interface IFilterSidebarprops {
  filters: FilterType;
  handleFilterChange: (filter: string, value: string[]) => void;
  resetFilters: () => void;
}

const fetchFilters = async (): Promise<{
  categories: { data: ICategory[] };
  tags: { data: ITag[] };
}> => {
  const [catRes, tagRes] = await Promise.all([
    api.get("/api/categories?fields=title"),
    api.get("/api/tags?fields=tag"),
  ]);
  return {
    categories: catRes.data,
    tags: tagRes.data,
  };
};

const FilterSidebar = ({
  filters,
  handleFilterChange,
  resetFilters,
}: IFilterSidebarprops) => {
  // Get Category and Tags from Strapi
  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });

  //* Render Data
  const categories: ICategory[] = useMemo(
    () => data?.categories?.data || [],
    [data]
  );
  const tags: ITag[] = useMemo(() => data?.tags?.data || [], [data]);

  //* Data
  const accordionItems: IAccordionItems[] = useMemo(
    () => [
      {
        value: "brand",
        key: "brand",
        label: "Brand",
        each: brands as CheckboxOption[],
      },
      {
        value: "price",
        key: "price",
        label: "Price",
        each: price as CheckboxOption[],
      },
      {
        value: "category",
        key: "category",
        label: "Category",
        each: categories,
      },
      { value: "tags", key: "tags", label: "Tags", each: tags },
    ],
    [categories, tags]
  );

  if (isLoading)
    return (
      <SkeletonCard count={accordionItems.length} noOfLines={2} isAction={false} height="60px" textSkeleton={false}/>
    );
  if (error) return <Error code={500} message="Error" description="Failed to fetch filters" />;
  if (!categories || !tags) return <Error code={500} message="Error" description="Filters not available" />;

 return (
    <Box w="full" maxW="280px" p={2} borderRight={{base:"0", md:"1px solid #e2e8f0"}} h="full">
      <Accordion.Root collapsible defaultValue={[""]}>
        {accordionItems.map((item) => (
          <AccordionComponent
            key={item.key}
            value={item.value}
            label={item.label}
            options={item.each}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        ))}
      </Accordion.Root>

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
