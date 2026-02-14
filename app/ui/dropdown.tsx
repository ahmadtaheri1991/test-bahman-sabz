"use client";

import {
  Input,
  Checkbox,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect, useMemo } from "react";

interface Item {
  id: number;
  name: string;
  group?: string;
}

type SingleProps = {
  items: Item[];
  selected: Item | null;
  onSelectionChange: (item: Item) => void;
  multiple?: false;
  groupBy?: (item: Item) => string;
};

type MultipleProps = {
  items: Item[];
  selected: Item[];
  onSelectionChange: (items: Item[]) => void;
  multiple: true;
  groupBy?: (item: Item) => string;
};

type Props = SingleProps | MultipleProps;

export default function DropdownSelect(props: Props) {
  const { items, selected, onSelectionChange, multiple, groupBy } = props;

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    if (!search) {
      setFilteredItems(items);
      return;
    }

    setFilteredItems(
      items.filter((item) => item.name.toLowerCase().includes(search)),
    );
  }, [search, items]);

  const groupedItems = useMemo(() => {
    if (!groupBy) return null;

    return filteredItems.reduce<Record<string, Item[]>>((acc, item) => {
      const key = groupBy(item) || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [filteredItems, groupBy]);

  function handleIsAllCheckedChange(val: boolean) {
    setIsAllChecked(val);

    if (!multiple) return;
    onSelectionChange(val ? items : []);
  }

  useEffect(() => {
    if (!multiple) return;

    setIsAllChecked(items.length == selected.length);
  }, [selected, multiple, items, setIsAllChecked]);

  return (
    <div className="mx-auto h-screen w-52 pt-20">
      <Listbox
        value={selected as any}
        onChange={onSelectionChange as any}
        multiple={multiple}
      >
        <ListboxButton className="relative block w-full min-h-9 rounded-lg bg-black/90 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white">
          {multiple
            ? (selected as Item[]).map((x) => x.name).join(", ")
            : (selected as Item | null)?.name || "Select item"}

          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>

        <Transition
          leave="transition duration-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setSearch("")}
        >
          <ListboxOptions
            anchor="bottom"
            transition
            className="w-(--button-width) rounded-xl border border-black/90 bg-black/90 p-1 [--anchor-gap:--spacing(1)] focus:outline-none"
          >
            <Input
              className={clsx(
                "mb-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == " ") e.stopPropagation();
              }}
              placeholder="search"
            />

            {multiple && (
              <Checkbox
                checked={isAllChecked}
                onChange={handleIsAllCheckedChange}
                className="inline-block group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
              >
                <CheckIcon className="hidden size-4 fill-black group-data-checked:block" />
              </Checkbox>
            )}

            {!groupedItems &&
              filteredItems.map((item) => (
                <ListboxOption
                  key={item.name}
                  value={item}
                  className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />

                  <div className="text-sm/6 text-white">{item.name}</div>
                </ListboxOption>
              ))}

            {groupedItems &&
              Object.entries(groupedItems).map(([group, groupItems]) => (
                <div key={group}>
                  <div className="px-3 py-1 text-xs text-white/40">{group}</div>

                  {groupItems.map((item) => (
                    <ListboxOption
                      key={item.id}
                      value={item}
                      className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 pl-6 select-none data-focus:bg-white/10"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                      <div className="text-sm/6 text-white">{item.name}</div>
                    </ListboxOption>
                  ))}
                </div>
              ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
