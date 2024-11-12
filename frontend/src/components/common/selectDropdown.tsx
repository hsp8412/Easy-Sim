import {Dispatch, Fragment} from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface SelectDropDownItem {
  id: string | number;
  label: string;
  value: string | number;
}

interface Props<T extends SelectDropDownItem> {
  items: T[];
  selected: T;
  setSelected: Dispatch<T>;
  sideEffect?: () => void;
}

const SelectDropdown = <T extends SelectDropDownItem>({
  items,
  selected,
  setSelected,
  sideEffect,
}: Props<T>) => {
  return (
    <Listbox
      value={selected}
      onChange={(value: T) => {
        setSelected(value);
        sideEffect && sideEffect();
      }}
    >
      {({open}) => (
        <>
          <div className="relative mt-2 w-60">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
              <span className="flex items-center justify-start">
                <span className="ml-3 block truncate">{selected.label}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <ListboxOption
                    key={item.id}
                    className={({focus}) =>
                      classNames(
                        focus ? "bg-primary text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({selected, focus}) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {item.label}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              focus ? "text-white" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectDropdown;
