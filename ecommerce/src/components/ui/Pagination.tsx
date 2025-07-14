"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useCallback } from "react";
import { useAppDispatch } from "../../App/store";
import { setPage } from "../../App/features/paginationSlice";
interface IPagination {
  count: number;
  pageSize: number;
  page: number;
}
const PaginationComponent = ({ count, pageSize, page }: IPagination) => {
  const dispatch = useAppDispatch();

  const handlePageChange = useCallback(
    (e: { page: number }) => {
      dispatch(setPage(e.page));
      console.log(e.page);
    },
    [dispatch]
  );

  return (
    <Pagination.Root
      scrollBehavior="revert-layer"
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={handlePageChange}
      p={3}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};
export default PaginationComponent;
