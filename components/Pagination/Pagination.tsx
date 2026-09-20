'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }: { selected: number }) => onPageChange(selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      /* Оскільки в CSS стилі задані безпосередньо для .pagination li та .pagination li a, */
      /* пропси pageClassName, previousClassName тощо залишаємо порожніми або не передаємо css.pageItem */
    />
  );
}