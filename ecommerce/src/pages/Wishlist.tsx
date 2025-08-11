import { Container, SimpleGrid } from "@chakra-ui/react";
import ProfileOrderCard from "../components/ui/ProfileOrderCard";
import { useAppSelector } from "../App/store";
import NoResult from "../components/ui/NoResult";

const Wishlist = () => {
  const { wishlistData } = useAppSelector((state) => state.wishlist);
  const renderWishlist = wishlistData?.map((item) => (
    <ProfileOrderCard key={item.id} data={item} />
  ));
  return (
    <Container maxW="container.xl" minH="lg" mt={6} mb={6}>
     {wishlistData?.length === 0 ? (
      <NoResult title="Your wishlist is empty" description="Please add some items to your wishlist." />
     ) : (
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, xl: 6 }} gap={4}>
        {renderWishlist}
      </SimpleGrid>
     )}
    </Container>
  );
};

export default Wishlist;
