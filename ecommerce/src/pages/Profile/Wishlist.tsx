import { Box, Flex } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import ProfileOrderCard from "../../components/ui/ProfileOrderCard";

const Wishlist = () => {
  return (
    <Box>
      <Flex
        direction={"row"}
        alignItems="center"
        w={"full"}
        justifyContent="space-between"
      >
        <MainTitle title="Wishlist" isArrow={false} />
      </Flex>
      <ProfileOrderCard />
      <ProfileOrderCard />
      <ProfileOrderCard />
      <ProfileOrderCard />
    </Box>
  );
};

export default Wishlist;
