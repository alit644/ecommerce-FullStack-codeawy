import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
interface IFetching<T> {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
  options?: UseQueryOptions<T, Error, T, (string | number)[]>;
}
export const useFetching = <T>({
  queryKey,
  queryFn,
  options,
}: IFetching<T>) => {
  return useQuery<T, Error, T, (string | number)[]>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};
