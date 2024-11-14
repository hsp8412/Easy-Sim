import {Key} from "react";
import {Column} from "./dataTable";

type Props<T extends Record<string, Key>> = {
  items: T[];
  columns: Column<T>[];
  keyPath: string;
  isButton?: boolean;
};

const DataTableBody = <T extends Record<string, Key>>({
  items,
  columns,
  keyPath,
  isButton,
}: Props<T>) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {/*Loop through all items*/}
      {items.map((item, index) => (
        <tr
          key={isButton ? "" : (item[keyPath] as Key)}
          className={`py-2 ${
            index % 2 === 0 ? "" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {/*For each item, loop through the columns to display the contents*/}
          {columns.map((column, index) => (
            <td
              key={`${column.label}-${item[keyPath]}-${index}`}
              className={`text-center align-middle  ${
                column.narrow ? "w-10" : "px-4 py-4"
              }`}
            >
              {/*contents of the cell*/}
              {column.content(item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DataTableBody;
