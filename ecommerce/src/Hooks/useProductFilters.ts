import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../App/store";
import { resetFilter, setFilter } from "../App/features/filtersSlice";
import { setPage } from "../App/features/paginationSlice";

export const useProductFilters = () => {
  const dispatch = useAppDispatch();
  const filtersSlice = useAppSelector((state) => state.filters);
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
    },
    [dispatch, filtersSlice]
  );
  //! Reset Filter
  const resetFilters = useCallback(() => {
    dispatch(resetFilter());
    dispatch(setPage(1));
  }, [dispatch]);

  return {
    filtersSlice,
    handleFilterChange,
    resetFilters,
  };
};
