import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { FaStore } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import MButton from "./Button";

const Links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    px={3}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
    href={href}
    fontWeight="medium"
    fontSize="md"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { open, onOpen, onClose } = useDisclosure();

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
          <MButton
            size="sm"
            title="Login"
            variant="outline"
          />
          <MButton
            size="sm"
            title="Sign Up"
            variant="solid"
          />
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
