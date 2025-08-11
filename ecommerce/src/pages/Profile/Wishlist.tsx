import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import ProfileOrderCard from "../../components/ui/ProfileOrderCard";
import { useAppSelector } from "../../App/store";

const Wishlist = () => {
 const {wishlistData} = useAppSelector((state) => state.wishlist);
 const renderWishlist = wishlistData?.map((item) => (
    <ProfileOrderCard key={item.id} data={item} />
  ));
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
      <SimpleGrid columns={{ base: 3,md:2,lg:3,xl:4 }} gap={4}>
       {renderWishlist}
       
      </SimpleGrid>
    </Box>
  );
};

export default Wishlist;
