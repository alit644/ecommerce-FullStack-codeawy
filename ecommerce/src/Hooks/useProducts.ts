import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../App/store";
import { useEffect } from "react";
import { fetchProducts } from "../utils/fetchingData";
import type { FilterType, ProductsResponse } from "../interfaces";
import { generateStrapiQuery } from "../utils/generateStrapiQuery";


export const useProducts = (filters: FilterType , valueSort?: string ,query?: string) => {
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const queryClient = useQueryClient();
  const filtersQuery = generateStrapiQuery(filters);
  const { data, isLoading, isError, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products", "pagination", page, pageSize, filtersQuery,valueSort,query],
    queryFn: () => fetchProducts(page, pageSize, filtersQuery, valueSort,query ),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });

  const pageCount = data?.meta.pagination.pageCount;

  //! ✅ prefetchQuery جلب المنتجات التالية عند تحميل الصفحة

  useEffect(() => {
    if (page < (pageCount ?? 0)) {
      queryClient.prefetchQuery({
        queryKey: ["products", "pagination", page + 1, filtersQuery,valueSort,query],
        queryFn: () => fetchProducts(page + 1, pageSize, filtersQuery, valueSort,query),
        staleTime: 1000 * 60 * 2,
      });
    }
  }, [page, pageSize, pageCount, queryClient, filtersQuery,valueSort,query]);

  return {
    data,
    isLoading,
    isError,
    pageCount: pageCount ?? 0,
    isFetching,
  };
};
