import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getPageButtons = () => {
    const visibleButtons =12;
    const totalVisibleButtons = visibleButtons + 2; 
    const start = Math.max(1, Math.min(currentPage - Math.floor(visibleButtons / 2), totalPages - visibleButtons + 1));
    const end = Math.min(start + visibleButtons - 1, totalPages);

  
    if (totalPages <= totalVisibleButtons) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

   
    const adjustedStart = Math.min(start, Math.max(1, totalPages - totalVisibleButtons + 1));

    return Array.from({ length: totalVisibleButtons }, (_, index) => adjustedStart + index);
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        prev
      </button>

      {getPageButtons().map((number) => (
        <button key={number} onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        next
      </button>
    </div>
  );
};

export default Pagination;