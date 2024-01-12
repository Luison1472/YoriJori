import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getPageButtons = () => {
    const visibleButtons =12; // 표시될 페이지 버튼 수를 조절합니다.
    const totalVisibleButtons = visibleButtons + 2; // prev와 next 버튼을 포함한 전체 버튼 수
    const start = Math.max(1, Math.min(currentPage - Math.floor(visibleButtons / 2), totalPages - visibleButtons + 1));
    const end = Math.min(start + visibleButtons - 1, totalPages);

    // 페이지 버튼 수가 총 버튼 수 미만이면 모든 페이지 버튼을 표시
    if (totalPages <= totalVisibleButtons) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // 현재 페이지가 가운데에 위치하도록 시작 페이지를 조절
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