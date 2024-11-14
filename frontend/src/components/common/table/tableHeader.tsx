import {faCaretUp, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Column, SortingProps} from "./dataTable";

type Props<T extends Record<string, any>> = {
  columns: Column<T>[];
  handleSorting: (column: Column<T>) => void;
  sortingColumn: SortingProps;
};

const DataTableHeader = <T extends Record<string, any>>({
  columns,
  handleSorting,
  sortingColumn,
}: Props<T>) => {
  return (
    <thead className={"text-xs text-gray-700 uppercase bg-gray-50"}>
      <tr>
        {/*Loop through each column to display*/}
        {columns.map((column) => (
          <th
            key={column.path}
            onClick={() => {
              handleSorting(column);
            }}
            className="px-6 py-3 text-center"
          >
            {/*Column name*/}
            {column.label}
            {/*Render sorting icon(triangle) if the column is the sorting column*/}
            {sortingColumn.path !== "" &&
              sortingColumn.path === column.path &&
              (sortingColumn.order === "asc" ? (
                // Up triangle if ascending
                <FontAwesomeIcon icon={faCaretUp} className="ms-1" />
              ) : (
                // Down triangle if descending
                <FontAwesomeIcon icon={faCaretDown} className="ms-1" />
              ))}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
