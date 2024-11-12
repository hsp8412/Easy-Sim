import _ from "lodash";
import {ReactNode, useEffect, useState} from "react";
import DataTableHeader from "./tableHeader";
import DataTableBody from "./tableBody";
import Pagination from "../pagination/pagination";

export type Column<T> = {
  path: string;
  label: string;
  content: (item: T) => ReactNode;
  isButton?: boolean;
  disableSorting?: boolean;
  narrow?: boolean;
};

type Props = {
  columns: Column<any>[];
  items: any[];
  keyPath: string;
  itemsPerPage: number;
};

export type SortingProps = {
  path: string;
  order: "asc" | "desc" | boolean;
};

const DataTable = <T extends {}>({
  columns,
  items,
  keyPath,
  itemsPerPage,
}: Props) => {
  // state for current page, initialized to 1
  const [currentPage, setCurrentPage] = useState(1);

  // state for sorting column, initialized to empty value(no sorting column selected)
  const [sortingColumn, setSortingColumn] = useState<SortingProps>({
    path: "",
    order: false,
  });

  //handle sorting column change
  const handleSorting = (column: Column<T>) => {
    //if column is a button column or sorting is disabled for the column, do nothing
    if (column.isButton || column.disableSorting) return;

    // if column selected is the same as the current sorting column, reverse the order
    if (sortingColumn.path === column.path) {
      setSortingColumn({
        path: column.path,
        order: sortingColumn.order === "asc" ? "desc" : "asc",
      });
      return;
    } // if the column selected is not the current soring column, set the column as the sorting column and set the order to be ascending(default)
    else {
      setSortingColumn({path: column.path, order: "asc"});
      return;
    }
  };

  let filtered = items;

  let sorted: T[];
  if (sortingColumn.order === false) {
    sorted = filtered;
  } else {
    sorted = _.orderBy(filtered, [sortingColumn.path], [sortingColumn.order]);
  }

  /**Pagination logic**/

  const pagesCount = Math.ceil(sorted.length / itemsPerPage);
  const itemsToDisplay = _.chunk(sorted, itemsPerPage)[currentPage - 1];

  useEffect(() => {
    if (pagesCount < currentPage) setCurrentPage(Math.max(pagesCount, 1));
  }, [currentPage, pagesCount]);

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-x-auto">
      {/*table header and table body*/}
      <section className="w-full overflow-x-auto">
        {itemsToDisplay && itemsToDisplay.length !== 0 ? (
          <table className="table-auto w-full text-sm text-left text-gray-500 divide-y rounded-2xl">
            <DataTableHeader
              columns={columns}
              handleSorting={handleSorting}
              sortingColumn={sortingColumn}
            />
            <DataTableBody
              items={itemsToDisplay || []}
              columns={columns}
              keyPath={keyPath}
            />
          </table>
        ) : (
          <p className="text-lg text-center font-semibold">
            No items to display
          </p>
        )}
      </section>

      {/*items below the table*/}
      <section className={"mt-4"}>
        <Pagination
          currentPage={currentPage}
          pageCount={pagesCount}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default DataTable;
