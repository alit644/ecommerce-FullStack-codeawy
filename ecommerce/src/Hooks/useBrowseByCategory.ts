import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../utils/fetchCategory";

interface IBrowseByCategory {
  page: number;
  pageSize: number;
}
export const useBrowseByCategory = ({ page, pageSize }: IBrowseByCategory) => {
  return useQuery({
    queryKey: ["category", page],
    queryFn: () => fetchCategory(page, pageSize),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    placeholderData: (prev) => prev,
  });
};
