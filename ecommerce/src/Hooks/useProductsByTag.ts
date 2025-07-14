import { useQuery,  } from "@tanstack/react-query";
import { fetchProductsByTag } from "../utils/fetchingData";

export const useProductsByTag = (value: string | null) => {
  return useQuery({
    queryKey: ["products", value],
    queryFn: () => fetchProductsByTag(value as string),
    refetchOnWindowFocus: false,
    //! cache time
    staleTime: 1000 * 60 * 3, // 3 minutes
    refetchInterval: 1000 * 60 * 4, // 4 minutes
    enabled: !!value, // Only run the query if value is set
  });
};
