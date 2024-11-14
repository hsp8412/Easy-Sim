import {useState} from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";

export interface SelectDropDownItem {
  id: string | number;
  label: string;
  value: string | number;
}

interface Props<T extends SelectDropDownItem> {
  items: T[];
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  sideEffect?: () => void;
}

const SelectDropdown = <T extends SelectDropDownItem>({
  items,
  selected,
  setSelected,
  sideEffect,
}: Props<T>) => {
  return (
    <div className="relative w-60">
      <Listbox
        value={selected}
        onChange={(value: T) => {
          setSelected(value);
          sideEffect && sideEffect();
        }}
      >
        <ListboxButton
          className={clsx(
            "relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left text-gray-900 sm:text-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
          )}
        >
          <span className="block truncate">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          className={clsx(
            "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            "transition duration-100 ease-in-out data-[leave]:opacity-0"
          )}
        >
          {items.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className={({active, selected}) =>
                clsx(
                  "relative cursor-default select-none py-2 pl-10 pr-4",
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  selected ? "font-medium" : "font-normal"
                )
              }
            >
              {({selected}) => (
                <>
                  <span
                    className={clsx(
                      "block truncate",
                      selected ? "font-semibold" : "font-normal"
                    )}
                  >
                    {item.label}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default SelectDropdown;
