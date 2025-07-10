import { Container } from "@chakra-ui/react";
import HeroSection from "../components/ui/HeroSection";
import BrowseByCategory from "../components/BrowseByCategory";
import FeaturedProducts from "../components/tabsProducts/FeaturedProducts";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Container maxW="container.xl" mt={6} mb={6}>
        <BrowseByCategory />
        <FeaturedProducts />
      </Container>
    </>
  );
};

export default Home;
