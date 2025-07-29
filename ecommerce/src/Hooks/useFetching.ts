import { useQuery } from "@tanstack/react-query";
interface IFetching<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}
export const useFetching = <T>({ queryKey, queryFn }: IFetching<T>) => {
  return useQuery<T>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
  });
};
