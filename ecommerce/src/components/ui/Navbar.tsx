import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { FaStore } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import MButton from "./Button";
import { Link as RouterLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../App/store";
import { logout } from "../../App/features/authSlice";
const Links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Dashbord", href: "/dashbord" },
];

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <RouterLink className="navbar" to={href}>
    {children}
  </RouterLink>
);

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { open, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Box
      bg="white"
      px={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"}>
          <Box display="flex" alignItems="center">
            <Box as={FaStore} color="teal.500" boxSize={6} mr={2} />
            <Text fontWeight="bold" fontSize="xl" color="teal.600">
              Store
            </Text>
          </Box>
          <HStack as="nav" spaceX={3} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Spacer />
        {/* Auth */}
        <Flex alignItems={"center"} spaceX={2}>
          {isAuthenticated ? (
            <>
              <RouterLink to={"dashbord"}>
                <MButton size="md" title="Dashbord" variant="solid" />
              </RouterLink>
              <Button
                size="md"
                variant="outline"
                type="submit"
                onClick={() => {
                  dispatch(logout())
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <RouterLink to={"login"}>
                <MButton size="md" title="Login" variant="outline" />
              </RouterLink>
              <RouterLink to={"register"}>
                <MButton size="md" title="Sign Up" variant="solid" />
              </RouterLink>
            </>
          )}

          <IconButton
            size={"sm"}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={open ? onClose : onOpen}
            ml={2}
          >
            {open ? <IoIosClose /> : <RxHamburgerMenu />}
          </IconButton>
        </Flex>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spaceY={2}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
