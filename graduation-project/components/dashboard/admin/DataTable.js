"use client";
import React, { useState } from "react";
import "./Table.css";
// import Pagination from './Pagination';
import StatusBadge from "./StatusBadge";
import { FiPrinter } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import Pagination from "./Pagination";
import ToggleSwitch from "@/components/pageProps/doctorCopmonent/ToggleSwitch";

const DataTable = ({
  title,
  columns,
  data,
  onAddNew,
  onEdit,
  onDelete,
  onPrint,
  onActive,
  addButtonLabel = "إضافة مستخدم جديد",
  printButtonLabel = "طباعة",
  itemsPerPageOptions = [10, 25, 50, 100],
  showCheckboxes = true,
  showSearch = true,
  statusColumn = "activity_status",
  className = "",
  setIsOpenPopup,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;

    // Search across all string/number fields
    return Object.values(item).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle checkbox changes
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allIds = currentItems.map((item) => item.id || item._id);
      setSelectedRows(new Set(allIds));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === currentItems.length);
  };

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Items per page change handler
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={`data-table-container ${className}`} dir="rtl">
      <div className="border-b-1 border-[#EEEEEE] p-[24px]">
        <h1 className=" data-table-title">{title}</h1>
      </div>
      <div className="data-table-header">
        <div className="items-per-page">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className=" border-[#E0E0E0] focus:border-none"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="data-table-actions">
          {showSearch && (
            <div className="search-container">
              <input
                type="text"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input focus:outline-none focus:border-none"
              />
              <CiSearch size={16} className="search-icon" />
            </div>
          )}
          <div className="button-group">
            {onPrint && (
              <button onClick={onPrint} className="print-button">
                <FiPrinter size={16} /> {printButtonLabel}
              </button>
            )}
            {onAddNew && (
              <button onClick={onAddNew} className="add-button">
                <span>+</span> {addButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="data-table-wrapper overflow-x-auto md:w-full w-[350px]">
        <table className="data-table w-full">
          <thead>
            <tr>
              {showCheckboxes && (
                <th className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th className="actions-column">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {showCheckboxes && (
                    <td className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={`${row.id || rowIndex}-${column.key}`}>
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : column.key === statusColumn ? (
                        <StatusBadge status={row[column.key]} />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                  <td className="actions-column">
                    {onActive && (
                      <ToggleSwitch
                        id={row.id}
                        initialValue={row.activity_status} // مثلاً القيمة جاية من API كـ 1 أو 0
                        onActive={onActive}
                      />
                    )}
                    {onEdit && (
                      <button
                        className="action-button edit-button"
                        onClick={() => onEdit(row)}
                        aria-label="تعديل"
                      >
                        <LuPencil size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="action-button delete-button"
                        onClick={() => onDelete(row.id)}
                        aria-label="حذف"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (showCheckboxes ? 2 : 1)}
                  className="no-data"
                >
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="data-table-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredData.length}
        />
      </div>
    </div>
  );
};

export default DataTable;
