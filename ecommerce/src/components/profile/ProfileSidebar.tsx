import { Flex, Text, VStack, Button } from "@chakra-ui/react";
import { profileLinks } from "../../data";
import { NavLink } from "react-router";
import React from "react";
import type { IconType } from "react-icons/lib";
const ProfileSidebar = () => {
  const renderLinks = profileLinks.map((link) => (
    <SidebarButton key={link.name} icon={link.icon} href={link.href}>
      {link.name}
    </SidebarButton>
  ));
  return (
    <Flex direction="column" h="100%">
      {/* Navigation */}
      <VStack  align="stretch" spaceY={1} px={2} mt={4}>
        {renderLinks}
      </VStack>
    </Flex>
  );
};

export default ProfileSidebar;

function SidebarButton({
  children,
  isActive,
  icon,
  href,
}: {
  icon?: IconType;
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
}) {
  return (
    <NavLink
      to={href}
      className={isActive ? "active" : ""}
      style={{ border: "none" }}
      end
    >
      <Button
        border={"none"}
        className="profileButton"
        variant={isActive ? "solid" : "ghost"}
        colorScheme={isActive ? "blue" : undefined}
        justifyContent="flex-start"
        color="gray.400"
        w="100%"
        fontWeight="normal"
        fontSize="md"

        borderRadius="md"
        _hover={{ bg: "gray.100", color: "black" }}
        px={3}
        py={2}
      >
        {icon && React.createElement(icon, { size: 16 })}
        {children}
      </Button>
    </NavLink>
  );
}
