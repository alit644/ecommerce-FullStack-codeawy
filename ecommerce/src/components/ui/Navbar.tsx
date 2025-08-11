import React, { lazy } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Spacer,
  Badge,
  Menu,
  Button,
} from "@chakra-ui/react";
const FaStore = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaStore }))
);
const RxHamburgerMenu = lazy(() =>
  import("react-icons/rx").then((module) => ({
    default: module.RxHamburgerMenu,
  }))
);
import { IoIosClose } from "react-icons/io";
import MButton from "./MButton";
import { Link, Link as RouterLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../App/store";
import { cartSelector } from "../../App/features/cartSlice";
import MenuComponent from "./Menu";
import cookieManager from "../../utils/cookieManager";
import type { IUserInfo } from "../../interfaces";
import { logout } from "../../App/features/authSlice";
import MAvatar from "./MAvatar";

const Links = [
  { name: "Home", href: "/", isAuth: false },
  { name: "Shop", href: "/shop", isAuth: false },
  { name: "Dashboard", href: "/dashboard", isAuth: true },
];

const NavLink = ({
  href,
  children,
  isAuth,
  isAuthenticated,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  isAuth: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
}) => {
  if (isAuth && !isAuthenticated) return null;
  return (
    <RouterLink to={href}>
      <Box
        onClick={() => {
          onClose();
        }}
        px={2}
        py={1}
        rounded="md"
        _hover={{
          textDecoration: "none",
          bg: "gray.200",
        }}
      >
        {children}
      </Box>
    </RouterLink>
  );
};

export default function Navbar() {
  const userInfo = cookieManager.get<IUserInfo>("user");

  const { open, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector(cartSelector);
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
              <NavLink
                key={link.name}
                href={link.href}
                isAuth={link.isAuth}
                isAuthenticated={isAuthenticated}
                onClose={onClose}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Spacer />
        {/* Auth */}
        <Flex alignItems={"center"} spaceX={2}>
          <RouterLink to={"cart"}>
            <Box position="relative">
              {cartData.length > 0 && (
                <Badge
                  position="absolute"
                  top={-1}
                  right={-1}
                  size="sm"
                  colorPalette="red"
                  variant="subtle"
                >
                  {cartData.length}
                </Badge>
              )}

              <IconButton
                variant={"plain"}
                color={"gray.500"}
                _hover={{ color: "teal.500" }}
                size={"md"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </IconButton>
            </Box>
          </RouterLink>
          <RouterLink to={"wishlist"}>
            <IconButton variant={"plain"} size={"md"} color={"gray.500"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart-icon lucide-heart"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </IconButton>
          </RouterLink>

          {isAuthenticated ? (
            <>
              <MenuComponent
                menuTrigger={
                  <MAvatar
                    colorPalette="teal"
                    border="2px solid #14b8a6"
                    size="sm"
                    name={userInfo?.username || ""}
                  />
                }
                children={
                  <>
                    <Menu.Item value="account" fontSize="md">
                      <Link to="/profile">My Account</Link>
                    </Menu.Item>

                    <Menu.Separator />
                    <Menu.Item value="logout" fontSize="md">
                      <Button
                        size="md"
                        variant="outline"
                        onClick={() => {
                          dispatch(logout());
                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </Button>
                    </Menu.Item>
                  </>
                }
                // dashboard
              />
            </>
          ) : (
            <>
              <HStack display={{ base: "none", md: "flex" }}>
                <RouterLink to={"login"}>
                  <MButton size="md" title="Login" variant="outline" />
                </RouterLink>
                <RouterLink to={"register"}>
                  <MButton size="md" title="Sign Up" variant="solid" />
                </RouterLink>
              </HStack>
            </>
          )}

          <IconButton
            size={"md"}
            aria-label={"Open Menu"}
            variant={"plain"}
            color={"gray.500"}
            _hover={{ color: "teal.500" }}
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
              <NavLink
                key={link.name}
                href={link.href}
                isAuth={link.isAuth}
                isAuthenticated={isAuthenticated}
                onClose={onClose}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
          {!isAuthenticated && (
            <HStack display={{ base: "flex", md: "none" }} mt={4}>
              <RouterLink to={"login"}>
                <MButton size="md" title="Login" variant="outline" />
              </RouterLink>
              <RouterLink to={"register"}>
                <MButton size="md" title="Sign Up" variant="solid" />
              </RouterLink>
            </HStack>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
