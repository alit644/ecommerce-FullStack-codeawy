import { useSearchParams } from "react-router";
import { useFilterGlobalProductsQuery } from "../App/services/createProductApi";



const SearchPage = () => {
  const [query] = useSearchParams();
  console.log(query.get("q"));

  const { data, isLoading, isError } = useFilterGlobalProductsQuery(
    {
      query: query.get("q") || "",
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  console.log(data?.data);

  return <div>SearchPage</div>;
};

export default SearchPage;
