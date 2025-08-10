import { Menu, Flex } from "@chakra-ui/react";
import { HiSortAscending } from "react-icons/hi";
import { sortItems } from "../../data";
import MenuComponent from "./Menu";

const SortMenu = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <MenuComponent
      menuTrigger={
        //
        <Flex
          alignItems="center"
          fontWeight={"medium"}
          color={"gray.800"}
          _hover={{ bg: "gray.100" }}
          gap={2}
          cursor="pointer"
          bg="white"
          border={"1px solid #e4e4e7"}
          p={"7px 15px"}
          borderRadius="md"
        >
          <HiSortAscending size={20} /> Sort
        </Flex>
      }
    >
      <Menu.RadioItemGroup
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        {sortItems.map((item) => (
          <Menu.RadioItem key={item.value} value={item.value}>
            {item.label}
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </Menu.RadioItemGroup>
    </MenuComponent>
  );
};

export default SortMenu;
