import { Container } from "@chakra-ui/react";
import HeroSection from "../components/ui/HeroSection";
import BrowseByCategory from "../components/BrowseByCategory";
import FeaturedProducts from "../components/tabsProducts/FeaturedProducts";
import HeroSummer from "../components/ui/HeroSummer";
import DiscountsSection from "../components/DiscountsSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Container maxW="container.xl" mt={6} mb={6}>
        <BrowseByCategory />
        <FeaturedProducts />
      </Container>
      <HeroSummer />
      <Container maxW="container.xl" mt={6} mb={6}>
        <DiscountsSection />
      </Container>
    </>
  );
};

export default Home;
