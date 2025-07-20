import { Checkbox, For } from "@chakra-ui/react";
import type { CheckboxOption } from "../interfaces";

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (values: string[]) => void;
}

export function CheckboxGroup({
  options,
  value,
  onChange,
}: CheckboxGroupProps) {
  return (
    <Checkbox.Group value={value} onValueChange={onChange}>
      <For each={options}>
        {(option) => (
          <Checkbox.Root
            value={option.name || option.tag || option.title}
            key={option.name || option.tag || option.title}
            colorPalette="teal"
            size="md"
            p={2}
            w="full"
            display="flex"
            flexDirection="row"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              {option.name || option.tag || option.title}
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
    </Checkbox.Group>
  );
}

export default CheckboxGroup;
