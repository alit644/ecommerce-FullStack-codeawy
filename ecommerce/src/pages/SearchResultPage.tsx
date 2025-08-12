import { useSearchParams } from "react-router";
import { useFilterGlobalProductsQuery } from "../App/services/createProductApi";

const SearchPage = () => {
  const [query] = useSearchParams();

  const { data, isLoading, isError } = useFilterGlobalProductsQuery(
    {
      query: query.get("q") || "",
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  return <div>SearchPage</div>;
};

export default SearchPage;
