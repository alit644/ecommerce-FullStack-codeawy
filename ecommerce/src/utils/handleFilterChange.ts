import { setFilter } from "../App/features/filtersSlice";
import { setPage } from "../App/features/paginationSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFilterChange = (dispatch: any, filtersSlice: any, filter: string, value: string[]) => {
  // TODO: Generate Path From Filters

  dispatch(
    setFilter({
      ...filtersSlice,
      [filter]: value,
    })
  );

  dispatch(setPage(1));
  // const newPath = generateStrapiQuery({
  //   ...filtersSlice,
  //   [filter]: value,
  // });
  // navigate(newPath, { replace: true });
};
