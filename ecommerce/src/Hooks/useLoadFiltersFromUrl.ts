import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAppDispatch } from "../App/store";
import { setFilter } from "../App/features/filtersSlice";

export const useLoadFiltersFromUrl = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filtersFromUrl = {
      brand: searchParams.get("brand")?.split(",") || [],
      category: searchParams.get("category")?.split(",") || [],
      price: searchParams.get("price")?.split(",") || [],
      tags: searchParams.get("tags")?.split(",") || [],
      query: searchParams.get("query") || "",
    };
    dispatch(setFilter(filtersFromUrl));
  }, [searchParams, dispatch]);
};
