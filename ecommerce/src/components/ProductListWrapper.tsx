import type { IProductCard } from "../interfaces";
import Error from "./Error/Error";
import NoResult from "./ui/NoResult";
import SkeletonCard from "./ui/Skeleton";
interface ProductCardLoaderProps {
  isLoading: boolean;
  error: Error | null;
  data: IProductCard[];
  children: React.ReactNode;
}
const ProductListWrapper = ({
  isLoading,
  error,
  data,
  children,
}: ProductCardLoaderProps) => {
  if (isLoading)
    return <SkeletonCard count={5} noOfLines={3} isAction={true} />;
  if (error)
    return (
      <Error
        code={500}
        message="Error"
        description="Failed to fetch products"
      />
    );
  if (!data?.length) return <NoResult />;
  return <>{children}</>;
};

export default ProductListWrapper;
