import { useMemo } from "react";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          isActive={isFirstPage}
          onClick={() => onPageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    ];

    // Add the first page
    if (currentPage > 4) {
      pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // Add the middle pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    if (totalPages !== 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={isLastPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={cn(isFirstPage && "cursor-not-allowed text-gray-400")}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {renderPageNumbers}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={cn(isLastPage && "cursor-not-allowed text-gray-400")}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
