import type { FilterType, StrapiFilters } from "../interfaces";
import qs from "qs";

export const generateStrapiQuery = (filters: FilterType) => {
  const query: { filters: StrapiFilters } = {
    filters: {},
  };

  if (filters.brand) {
    query.filters.brand = {
      $in: filters.brand,
    };
  }

  if (filters.category) {
    query.filters.category = {
      title: {
        $in: filters.category,
      },
    };
  }

  if (filters.tags) {
    query.filters.tags = {
      tag: {
        $in: filters.tags,
      },
    };
  }

  return qs.stringify(query, { encodeValuesOnly: true });
};
