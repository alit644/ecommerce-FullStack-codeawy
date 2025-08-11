import { Flex, Button } from "@chakra-ui/react";
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
    <Flex
      direction={{ base: "row", md: "column" }}
      w={{ base: "full", md: "260px" }}
      h="100%"
    >
      {/* Navigation */}
      <Flex
        direction={{ base: "row", md: "column" }}
        alignItems={{ base: "center", md: "start" }}
        justifyContent={{ base: "space-between", md: "stretch" }}
        align={{ base: "center", md: "stretch" }}
        spaceY={{ base: 1, md: 2 }}
        px={2}
        mt={4}
        w={{ base: "full", md: "260px" }}
      >
        {renderLinks}
      </Flex>
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
      style={{ border: "none", width: "100%" }}
      end
    >
      <Button
        border={"none"}
        className="profileButton"
        variant={isActive ? "solid" : "ghost"}
        colorScheme={isActive ? "blue" : undefined}
        justifyContent="flex-start"
        color="gray.400"
        w="full"
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
