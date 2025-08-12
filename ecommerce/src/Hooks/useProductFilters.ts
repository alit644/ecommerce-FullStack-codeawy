import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../App/store";
import { resetFilter, setFilter } from "../App/features/filtersSlice";
import { setPage } from "../App/features/paginationSlice";
import { useSearchParams } from "react-router";
export const useProductFilters = () => {
  const dispatch = useAppDispatch();
  const filtersSlice = useAppSelector((state) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  //! Change Filter
  const handleFilterChange = useCallback(
    (filter: string, value: string[]) => {
      dispatch(
        setFilter({
          ...filtersSlice,
          [filter]: value,
        })
      );
      dispatch(setPage(1));
      // تحديث URL
      const params = new URLSearchParams(searchParams);
      if (value.length > 0) {
        params.set(filter, value.join(","));
      } else {
        params.delete(filter);
      }
      setSearchParams(params);
    },
    [dispatch, filtersSlice, searchParams , setSearchParams]
  );
  //! Reset Filter
  const resetFilters = useCallback(() => {
    dispatch(resetFilter());
    dispatch(setPage(1));
    setSearchParams({});
  }, [dispatch, setSearchParams]);

  return {
    filtersSlice,
    handleFilterChange,
    resetFilters,
  };
};
