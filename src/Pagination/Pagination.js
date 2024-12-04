import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {
  const pageCount = Math.ceil(totalRecords / recordsPerPage);

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={(event) => paginate(event.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Pagination;

