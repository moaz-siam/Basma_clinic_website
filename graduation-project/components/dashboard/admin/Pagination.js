"use client";
import React from "react";
import { LuChevronFirst } from "react-icons/lu";
import { LuChevronLast } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  maxPageButtons = 5,
}) => {
  // Generate page numbers to display
  const getPageRange = () => {
    const range = [];

    if (totalPages <= maxPageButtons) {
      // Show all pages if there are fewer than maxPageButtons
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Calculate start and end of page range
      let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let end = start + maxPageButtons - 1;

      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxPageButtons + 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }
    }

    return range;
  };

  const pageRange = getPageRange();

  return (
    <div className="pagination-container">
      <div className="pagination-summary">
        يعرض الجدول {currentPage} من {Math.min(totalItems, currentPage * 10)}{" "}
        معطيات من أصل {totalItems}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button first"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="الصفحة الأولى"
        >
                    <LuChevronLast size={16} />

        </button>

        <button
          className="pagination-button prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="الصفحة السابقة"
        >
          <FaChevronRight size={16} />
          
        </button>

        {pageRange.map((page, index) => (
          <button
            key={index}
            className={`pagination-button page-number ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="الصفحة التالية"
        >
          <FaChevronLeft size={16} />
        </button>

        <button
          className="pagination-button last"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="الصفحة الأخيرة"
        >
          <LuChevronFirst size={16} />
        
        </button>
      </div>
    </div>
  );
};

export default Pagination;
