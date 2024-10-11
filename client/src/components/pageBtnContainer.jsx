import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  //   console.log(numOfPages, currentPage);
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
        className={`btn page-btn ${activeClass && "active"}`}
      >
        {pageNumber}
      </button>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key={"dots-1"}>
          ..
        </span>
      );
    }
    if (currentPage !== 1 && currentPage !== 2) {
      // one before current page
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // current page

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }
    // one after current page

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }
    // dots
    if (numOfPages - currentPage > 2) {
      pageButtons.push(
        <span className="page-btn dots" key={"dots+1"}>
          ..
        </span>
      );
    }
    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;

// Previous approach is down as many page buttons as number of pages

// import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// import Wrapper from "../assets/wrappers/PageBtnContainer";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { useAllJobsContext } from "../pages/AllJobs";

// const PageBtnContainer = () => {
//   const {
//     data: { numOfPages, currentPage },
//   } = useAllJobsContext();
//   //   console.log(numOfPages, currentPage);
//   const pages = Array.from({ length: numOfPages }, (_, index) => {
//     return index + 1;
//   });
//   //   console.log(pages, "here");

//   const { search, pathname } = useLocation();
//   const navigate = useNavigate();
//   //   console.log(pathname, "heretoo");
//   //   console.log(search, "heretoo");

//   const handlePageChange = (pageNumber) => {
//     const searchParams = new URLSearchParams(search);
//     searchParams.set("page", pageNumber);
//     navigate(`${pathname}?${searchParams.toString()}`);
//     // console.log(searchParams);
//     // console.log(pageNumber);
//   };
//   return (
//     <Wrapper>
//       <button
//         className="btn prev-btn"
//         onClick={() => {
//           let prevPage = currentPage - 1;
//           if (prevPage < 1) prevPage = numOfPages;
//           handlePageChange(prevPage);
//         }}
//       >
//         <HiChevronDoubleLeft />
//         prev
//       </button>
//       <div className="btn-container">
//         {pages.map((pageNumber) => {
//           return (
//             <button
//               key={pageNumber}
//               onClick={() => {
//                 handlePageChange(pageNumber);
//               }}
//               className={`btn page-btn ${
//                 pageNumber === currentPage && "active"
//               }`}
//             >
//               {pageNumber}
//             </button>
//           );
//         })}
//       </div>
//       <button
//         className="btn next-btn"
//         onClick={() => {
//           let nextPage = currentPage + 1;
//           if (nextPage > numOfPages) nextPage = 1;
//           handlePageChange(nextPage);
//         }}
//       >
//         next
//         <HiChevronDoubleRight />
//       </button>
//     </Wrapper>
//   );
// };

// export default PageBtnContainer;
