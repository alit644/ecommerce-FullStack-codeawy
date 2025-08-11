import { Container, GridItem, Grid } from "@chakra-ui/react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { Outlet } from "react-router";
import { HStack, VStack, Text } from "@chakra-ui/react";
import MAvatar from "../../components/ui/MAvatar";
import cookieManager from "../../utils/cookieManager";
import type { IUserInfo } from "../../interfaces";
const ProfileLayout = () => {
  const user = cookieManager.get<IUserInfo>("user");
  return (
    <Container maxW="container.xl" mt={6} mb={6} minH={'lg'}>
      {/* Customer information */}
      <HStack alignItems={"start"} gap={2} mb={6}>
        <MAvatar
          name={user?.username || ""}
          colorPalette="purple"
          border="2px solid #a855f7"
          size="lg"
        />
        <VStack alignItems={"start"} gap={0}>
          <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
            {user?.username || ""}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            {user?.email || ""}
          </Text>
        </VStack>
      </HStack>
      <Grid gap={6} templateColumns={{ base: "1fr", md: "250px 1fr" }}>
        <GridItem
          w={{ base: "full", md: "260px" }}
          color="gray.500"
          position={{ base: "relative", md: "sticky" }}
          top={0}
          bottom={0}
          overflow="auto"
          className="scrollBarNone"
        >
          <ProfileSidebar />
        </GridItem>
        <GridItem maxW="100%" p={2} overflow="auto">
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProfileLayout;
