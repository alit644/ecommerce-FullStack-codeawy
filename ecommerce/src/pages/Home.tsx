import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import HeroSection from "../components/ui/HeroSection";
import BrowseByCategory from "../components/BrowseByCategory";
const FeaturedProducts = lazy(
  () => import("../components/tabsProducts/FeaturedProducts")
);
const HeroSummer = lazy(() => import("../components/ui/HeroSummer"));
const DiscountsSection = lazy(() => import("../components/DiscountsSection"));
import SkeletonCard from "../components/ui/Skeleton";

interface LazyLoadOnViewProps {
  children: React.ReactNode;
  height?: string;
}

function LazyLoadOnView({ children, height = "200px" }: LazyLoadOnViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref} minH={height} >
      {isVisible ? children : ''}
    </Box>
  );
}
//TODO : اضافة خقل البحث الكلي في الموقع 
//TODO : تعديل اساسيات الموقع مثل الالوان واضافة خط جديد 
//TODO : qs in path url في قسم الفلترة و البحث اضافة 
//TODO : الصحفة الرئيسة في لوحة تحكم اضافة الاحصائيات
//TODO : اضافاة ترتيب من الاحدث الى الاقدم في قسم الفلترة و البحث

const Home = () => {
  return (
    <>
      <HeroSection />
      <Container maxW="container.xl" mt={6} mb={6}>
        <BrowseByCategory />
        <LazyLoadOnView>
          <Suspense fallback={<SkeletonCard count={5} noOfLines={3} isAction={true} />}>
            <FeaturedProducts />
          </Suspense>
        </LazyLoadOnView>
      </Container>
      <LazyLoadOnView height="350px" >
        <Suspense
          fallback={
            <SkeletonCard
              height="350px"
              width="100%"
              count={1}
              isAction={false}
              textSkeleton={false}
            />
          }
        >
          <HeroSummer />
        </Suspense>
      </LazyLoadOnView>
      <LazyLoadOnView>
        <Suspense
          fallback={<SkeletonCard count={5} noOfLines={3} isAction={true} />}
        >
          <Container maxW="container.xl" mt={6} mb={6}>
            <DiscountsSection />
          </Container>
        </Suspense>
      </LazyLoadOnView>
    </>
  );
};

export default Home;
