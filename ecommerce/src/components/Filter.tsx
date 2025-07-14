import {
  Box,
  Accordion,
  Input,
  Checkbox,
  Stack,
  Badge,
  Button,
} from "@chakra-ui/react";

const brands = [
  { name: "Apple", count: 110 },
  { name: "Samsung", count: 125 },
  { name: "Xiaomi", count: 68 },
  { name: "Poco", count: 44 },
  { name: "OPPO", count: 38 },
  { name: "Honor", count: 10 },
  { name: "Motorola", count: 34 },
  { name: "Nokia", count: 22 },
  { name: "Realme", count: 35 },
];
const categories = [
  { name: "Mobile", count: 110 },
  { name: "Laptop", count: 125 },
  { name: "Tablet", count: 68 },
  { name: "Camera", count: 44 },
  { name: "Headphone", count: 38 },
  { name: "Smartwatch", count: 10 },
  { name: "Gadget", count: 34 },
  { name: "Gaming", count: 22 },
  { name: "Accessories", count: 35 },
];

const price = [
  { name: "Under $100", count: 110 },
  { name: "$100 - $500", count: 125 },
  { name: "$500 - $1000", count: 68 },
  { name: "$1000 - $2000", count: 44 },
  { name: "$2000 - $5000", count: 38 },
  { name: "$5000 - $10000", count: 10 },
];

const tags = [
  { name: "best-seller", count: 110 },
  { name: "new-arrival", count: 125 },
  { name: "top-rated", count: 68 },
  { name: "featured", count: 44 },
  { name: "sale", count: 38 },
  { name: "discount", count: 10 },
];

const FilterSidebar = () => {
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
            <Checkbox.Root colorScheme="blackAlpha" w="full">
              <Stack align="start" spaceY={1} w="full">
                {brands.map((brand) => (
                  <Checkbox.Group
                    p={2}
                    key={brand.name}
                    w="full"
                    display="flex"
                    flexDirection="row"
                  >
                    <Checkbox.Control />
                    <Checkbox.Label fontWeight="600">
                      {brand.name}{" "}
                      <Badge mx={2} colorPalette="teal">
                        {brand.count}
                      </Badge>
                    </Checkbox.Label>
                  </Checkbox.Group>
                ))}
              </Stack>
            </Checkbox.Root>
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
            <Checkbox.Root colorScheme="blackAlpha" w="full">
              <Stack align="start" spaceY={1} w="full">
                {categories.map((category) => (
                  <Checkbox.Group
                    p={2}
                    key={category.name}
                    w="full"
                    display="flex"
                    flexDirection="row"
                  >
                    <Checkbox.Control />
                    <Checkbox.Label fontWeight="600">
                      {category.name}{" "}
                      <Badge mx={2} colorPalette="teal">
                        {category.count}
                      </Badge>
                    </Checkbox.Label>
                  </Checkbox.Group>
                ))}
              </Stack>
            </Checkbox.Root>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Price Section */}
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
            <Checkbox.Root colorScheme="blackAlpha" w="full">
              <Stack align="start" spaceY={1} w="full">
                {price.map((price) => (
                  <Checkbox.Group
                    p={2}
                    key={price.name}
                    w="full"
                    display="flex"
                    flexDirection="row"
                  >
                    <Checkbox.Control />
                    <Checkbox.Label fontWeight="600">
                      {price.name}{" "}
                      <Badge mx={2} colorPalette="teal">
                        {price.count}
                      </Badge>
                    </Checkbox.Label>
                  </Checkbox.Group>
                ))}
              </Stack>
            </Checkbox.Root>
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
            <Checkbox.Root colorScheme="blackAlpha" w="full">
              <Stack align="start" spaceY={1} w="full">
                {tags.map((tag) => (
                  <Checkbox.Group
                    p={2}
                    key={tag.name}
                    w="full"
                    display="flex"
                    flexDirection="row"
                  >
                    <Checkbox.Control />
                    <Checkbox.Label fontWeight="600">
                      {tag.name}{" "}
                      <Badge mx={2} colorPalette="teal">
                        {tag.count}
                      </Badge>
                    </Checkbox.Label>
                  </Checkbox.Group>
                ))}
              </Stack>
            </Checkbox.Root>
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
      >
        Reset
      </Button>
    </Box>
  );
};

export default FilterSidebar;
