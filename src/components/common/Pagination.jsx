import React from "react";
import {Link} from 'react-router-dom'
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleLeft,
} from "react-icons/fa";
const Pagination = ({
  itemPerPage,
  totalItems,
  paginate,
  currentPage,
  runFunction,
  pageStartCount,
  pageEndCount,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationNumber = () => {
    if (pageNumbers.length <= 4) {
      return pageNumbers;
    } else if (pageNumbers.length >= 4 && currentPage <= 3) {
      return [1, 2, 3, 4, "...", pageNumbers[pageNumbers.length - 1]];
    } else if (
      pageNumbers.length >= 4 &&
      currentPage >= pageNumbers[pageNumbers.length - 3]
    ) {
      return [
        1,
        "...",
        pageNumbers[pageNumbers.length - 4],
        pageNumbers[pageNumbers.length - 3],
        pageNumbers[pageNumbers.length - 2],
        pageNumbers[pageNumbers.length - 1],
      ];
    } else if (
      pageNumbers.length > 4 &&
      currentPage > 3 &&
      currentPage < pageNumbers[pageNumbers.length - 3]
    ) {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        pageNumbers[pageNumbers.length - 1],
      ];
    }
  };

  let paginationItms = paginationNumber();

  const firstPage = () => {
    paginate(1);
    runFunction(itemPerPage, 1);
  };

  const lastPage = () => {
    paginate(pageNumbers[pageNumbers.length - 1]);
    runFunction(itemPerPage, pageNumbers.length);
  };

  const nextPage = () => {
    paginate(currentPage + 1);
    runFunction(itemPerPage, currentPage + 1);
  };

  const prevPage = () => {
    paginate(currentPage - 1);
    runFunction(itemPerPage, currentPage - 1);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ul className="pagination lms-page">
            <li
              className={`page-item prev ${
                currentPage - 1 === 0 ? "disabled" : ""
              }`}
              onClick={() => {
                if (currentPage - 1 === 0) {
                  return;
                }
                firstPage();
              }}
            >
              <Link className="page-link" to="" tabIndex="-1">
                <FaAngleDoubleLeft />
              </Link>
            </li>
            <li
              className={`page-item prev ${
                currentPage - 1 === 0 ? "disabled" : ""
              }`}
              onClick={() => {
                if (currentPage - 1 === 0) {
                  return;
                }
                prevPage();
              }}
            >
              <Link className="page-link" to="" tabIndex="-1">
                <FaAngleLeft />
              </Link>
            </li>
            {paginationItms.map((item) => {
              return (
                <li className={`page-item first-page ${isNaN(item) ? 'disabled' : ''} ${currentPage === item ? "active" : ""}`} key={item}>
                  <Link to="" className="page-link"
                    onClick={(ev)=>{
                      ev.preventDefault();
                      paginate(item);
                      runFunction(itemPerPage, item);
                    }}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            <li className={`page-item next ${pageNumbers[pageNumbers.length - 1] === currentPage || (totalItems === 0) ? 'disabled' :''}`}>
              <Link className="page-link" to="" 
              onClick={(ev) => {
                ev.preventDefault();
                nextPage();
              }}>
                <FaAngleRight />
              </Link>
            </li>
            <li className={`page-item next ${pageNumbers[pageNumbers.length - 1] === currentPage || (totalItems === 0)   ? 'disabled' :''}`}>
              <Link className="page-link" 
              onClick={(ev) => {
                ev.preventDefault();
                lastPage();
              }}
              >
                <FaAngleDoubleRight />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
