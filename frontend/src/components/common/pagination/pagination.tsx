import _ from "lodash";
import {Dispatch, SetStateAction} from "react";
import Pagi from "./pagi";
import PrevPage from "./prevPage";
import NextPage from "./nextPage";

const Pagination = ({pageCount, currentPage, setCurrentPage}: Props) => {
  if (pageCount === 1 || pageCount === 0) {
    return <></>;
  }

  const pages = _.range(1, pageCount + 1);

  const maxPage = 5;

  const displayOneSideCount = 1;

  const handlePrevPage = () => {
    if (currentPage == 1) {
      return;
    }
    setCurrentPage((pre) => pre - 1);
  };

  const handleNextPage = () => {
    if (currentPage == pageCount) {
      return;
    }
    setCurrentPage((pre) => pre + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPages = () => {
    if (pageCount <= maxPage) {
      return pages.map((page) => (
        <Pagi
          key={page}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          label={page}
        />
      ));
    }

    let startIndex = currentPage - displayOneSideCount;
    let endIndex = currentPage + displayOneSideCount;

    if (endIndex >= pageCount) {
      endIndex = pageCount;
      return (
        <>
          <Pagi
            key={1}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label={1}
          />
          <Pagi
            key="omit"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />
          {pages.slice(startIndex - 1, endIndex).map((page) => (
            <Pagi
              key={page}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              label={page}
            />
          ))}
        </>
      );
    }

    if (startIndex <= 1) {
      startIndex = 1;
      return (
        <>
          {pages.slice(startIndex - 1, endIndex).map((page) => (
            <Pagi
              key={page}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              label={page}
            />
          ))}

          <Pagi
            key="omit"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />

          <Pagi
            handlePageChange={handlePageChange}
            key={pageCount}
            currentPage={currentPage}
            label={pageCount}
          />
        </>
      );
    }
    return (
      <>
        <Pagi
          key={1}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          label={1}
        />
        {startIndex !== 2 && (
          <Pagi
            key="omit-start"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />
        )}
        {pages.slice(startIndex - 1, endIndex).map((page) => (
          <Pagi
            key={page}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label={page}
          />
        ))}
        {endIndex !== pageCount - 1 && (
          <Pagi
            handlePageChange={handlePageChange}
            key="omit-end"
            currentPage={currentPage}
            label="..."
          />
        )}
        <Pagi
          handlePageChange={handlePageChange}
          key={pageCount}
          currentPage={currentPage}
          label={pageCount}
        />
      </>
    );
  };

  return (
    <ul className="flex justify-start md:justify-center items-center h-10 text-base">
      <li onClick={handlePrevPage} className="cursor-pointer">
        <PrevPage />
      </li>

      {renderPages()}

      <li onClick={handleNextPage} className="cursor-pointer">
        <NextPage />
      </li>
    </ul>
  );
};

type Props = {
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default Pagination;
