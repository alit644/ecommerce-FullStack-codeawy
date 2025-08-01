import { Select, Portal, createListCollection } from "@chakra-ui/react";

interface ISelect {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string[] | undefined;
  onChange?: (value: string[] | string) => void;
  multiple?: boolean;
}

const MSelect = (
  ({ label, options, value, onChange, multiple, ...props } : ISelect) => {
    const collection = createListCollection({ items: options || [] });

    return (
     <Select.Root
     value={value}
     onValueChange={(e) => onChange?.(e.value)}
     collection={collection}
     multiple={multiple} // تمرير خاصية multiple
     {...props}
   >
     {label && <Select.Label>{label}</Select.Label>}
     <Select.Control>
       <Select.Trigger>
         <Select.ValueText placeholder="Select an option" />
       </Select.Trigger>
       <Select.IndicatorGroup>
         <Select.Indicator />
       </Select.IndicatorGroup>
     </Select.Control>
     <Portal>
       <Select.Positioner>
         <Select.Content>
           {collection.items.map((option) => (
             <Select.Item key={option.value} item={option}>
               <Select.ItemText>{option.label}</Select.ItemText>
               <Select.ItemIndicator />
             </Select.Item>
           ))}
         </Select.Content>
       </Select.Positioner>
     </Portal>
   </Select.Root>
    );
  }
);

export default MSelect;
