import { Accordion, Box, Stack } from "@chakra-ui/react";
import type { CheckboxOption, FilterType } from "../../interfaces";
import CheckboxGroup from "../Checkbox";

interface IAccordion {
  label: string;
  value: string;
  key: string;
  options: CheckboxOption[];
  filters: FilterType;
  handleFilterChange: (filter: string, value: string[]) => void;
}
const AccordionComponent = ({
  label,
  value,
  key,
  options,
  filters,
  handleFilterChange,
}: IAccordion) => {
  return (
    <Accordion.Item p={2} value={value} key={key}>
      <h2>
        <Accordion.ItemTrigger>
          <Box flex="1" textAlign="left" fontWeight="bold">
            {label}
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
      </h2>
      <Accordion.ItemContent pb={4}>
        <Stack align="start" spaceY={1} w="full">
          <CheckboxGroup
            options={options}
            value={filters[value as keyof FilterType] || []}
            onChange={(e: string[]) => handleFilterChange(value, e)}
          />
        </Stack>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default AccordionComponent;
