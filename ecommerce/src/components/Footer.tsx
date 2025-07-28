import { Box, VStack, HStack, Text, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box bg={bgColor} py={8}>
      <Box maxW={{ base: "container.sm", md: "container.lg" }} mx="auto" px={4}>
        <VStack spaceY={8}>
          {/* Main Footer Content */}
          <HStack gap={5} justify="space-between" flexWrap="wrap" alignItems="start">
            {/* Quick Links */}
            <VStack align="start" spaceY={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={useColorModeValue("gray.800", "white")}
              >
                Quick Links
              </Text>

              <Link href="/contact" color={textColor}>
                Contact
              </Link>

              <Link href="/shop" color={textColor}>
                Shipping
              </Link>
            </VStack>

            {/* Contact Info */}
            <VStack align="start" spaceY={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={useColorModeValue("gray.800", "white")}
              >
                Contact Us
              </Text>
              <Text color={textColor}>Email: support@codeawy.com</Text>
              <Text color={textColor}>Phone: +1 234 567 890</Text>
              <Text color={textColor}>
                Address: 123 Codeawy Street, Tech City
              </Text>
            </VStack>
          </HStack>

          {/* Social Links */}
          <HStack spaceX={6} justify="center" mt={8}>
            <Link href="/" color={textColor}>
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
            <Link href="/" color={textColor}>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link href="/" color={textColor}>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
            <Link href="/" color={textColor}>
              <Icon as={FaYoutube} boxSize={6} />
            </Link>
          </HStack>

          {/* Copyright */}
          <Text textAlign="center" color={textColor} fontSize="sm">
            © {new Date().getFullYear()} Codeawy. All rights reserved.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Footer;
