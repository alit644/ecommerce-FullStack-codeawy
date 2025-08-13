"use client";

import * as React from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  IconButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
// import icone
import { FaStore } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { Link, NavLink, Outlet } from "react-router";
import { dashboardLinks } from "../../data";
import type { IconType } from "react-icons/lib";
import { RiMenu4Fill } from "react-icons/ri";
import DrawerComponent from "../../components/ui/Drawer";
import { useAppDispatch } from "../../App/store";
import { openDrawer } from "../../App/features/globalSlice";
import { Tooltip } from "../../components/ui/tooltip";
import { useAppSelector } from "../../App/store";
import cookieManager from "../../utils/cookieManager";
import type { IUserInfo } from "../../interfaces";
const renderLinks = dashboardLinks.map((link) => (
  <SidebarButton key={link.name} icon={link.icon} href={link.href}>
    {link.name}
  </SidebarButton>
));
export default function SidebarLayout() {
  const user = cookieManager.get<IUserInfo>("user");
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector((state) => state.global.isOpenDrawer);
  return (
    <>
      <Flex h="100vh" position="sticky" top={0} bottom={0} overflow="hidden">
        <Box
          display={{ base: "none", md: "block" }}
          borderRight={"1px solid #e4e4e7"}
          w="260px"
          bg="white"
          // bg="gray.800"
          color="gray.500"
        >
          <AppSidebar
            username={user?.username || ""}
            email={user?.email || ""}
          />
        </Box>

        {/* Main content and Outlet */}
        <Flex direction="column" flex="1" overflow="auto">
          <Flex
            as="header"
            justify="space-between"
            h="60px"
            align="center"
            gap={4}
            p={4}
            borderColor="gray.200"
            bg="white"
            borderBottom="1px solid #e4e4e7"
            px={{ base: 4, lg: 6 }}
          >
            <IconButton
              color="gray.500"
              size="sm"
              aria-label="Open sidebar"
              as={RiMenu4Fill}
              display={{ base: "inline-flex", md: "none" }}
              onClick={() => dispatch(openDrawer())}
              variant="ghost"
            />
            <HStack justifyContent="space-between" w="full">
              <Link to="/">
                <Tooltip content="Store">
                  <IconButton
                    variant={"outline"}
                    color={"gray.500"}
                    _hover={{ color: "teal.500" }}
                    size={"md"}
                  >
                    <FaStore size={16} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Avatar.Root size="sm">
                <Avatar.Fallback name={user?.username || ""} />
              </Avatar.Root>
            </HStack>
          </Flex>
          <Box as="main" flex="1" p={{ base: 4, md: 6 }}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
      {/* Drawer for mobile */}
      <DrawerComponent
        isOpenDrawer={isOpenDrawer}
        title="Dashboard Menu"
        children={
          <AppSidebar
            username={user?.username || ""}
            email={user?.email || ""}
          />
        }
        action={false}
      />
    </>
  );
}

function AppSidebar({ username, email }: { username: string; email: string }) {
  return (
    <Flex direction="column" h="100%">
      {/* Header */}
      <Flex align="center" gap={2} px={4} py={3}>
        <Flex
          h={8}
          w={8}
          align="center"
          justify="center"
          rounded="md"
          bg="teal.500"
        >
          <GoPackage size={16} color="white" />
        </Flex>
        <Box>
          <Text fontSize="sm" fontWeight="bold">
            Products Dashboard
          </Text>
          <Text fontSize="xs" color="gray.400">
            Manage your products
          </Text>
        </Box>
      </Flex>
      {/* Navigation */}
      <VStack divideX={"2px"} align="stretch" spaceY={1} px={2} mt={4}>
        <Text fontSize="xs" color="gray.400" px={2} mb={1}>
          Navigation
        </Text>
        {renderLinks}
      </VStack>

      <Flex flex="1" />
      {/* Footer */}
      <Box px={4} py={3} borderTop="1px" borderColor="gray.700">
        <HStack justify="space-between">
          <HStack>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={username || ""} />
            </Avatar.Root>
            <Box>
              <Text fontSize="sm" fontWeight="medium">
                {username || ""}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {email || ""}
              </Text>
            </Box>
          </HStack>
          <IconButton
            aria-label="Settings"
            // as={FaHome}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Box>
    </Flex>
  );
}

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
        variant={isActive ? "solid" : "ghost"}
        colorScheme={isActive ? "blue" : undefined}
        justifyContent="flex-start"
        color="gray.400"
        w="100%"
        fontWeight="normal"
        fontSize="sm"
        borderRadius="md"
        _hover={{ bg: "teal.500", color: "white" }}
        px={3}
        py={2}
      >
        {icon && React.createElement(icon, { size: 16 })}
        {children}
      </Button>
    </NavLink>
  );
}
