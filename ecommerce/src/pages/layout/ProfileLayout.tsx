import {  Container, Grid, GridItem } from "@chakra-ui/react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <Container maxW="container.xl" mt={6} mb={6} h="100vh">
      <Grid templateColumns={"260px 1fr"} templateRows={"auto"} gap={6}>
        <GridItem
          rowSpan={3}
          display={{ base: "none", md: "block" }}
          w="260px"
          bg="white"
          color="gray.500"
        >
          <ProfileSidebar />
        </GridItem>
        <GridItem rowSpan={6} w="100%" p={2}>
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProfileLayout;
