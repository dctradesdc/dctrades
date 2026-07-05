"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";

import { PAIR_GROUPS } from "./pairs";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PairComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function PairCombobox({
  value,
  onChange,
}: PairComboboxProps) {
  const [open, setOpen] =
    React.useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        type="button"
        className="inline-flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent"
      >
        <span
          className={cn(
            !value &&
              "text-muted-foreground"
          )}
        >
          {value || "Select pair"}
        </span>

        <ChevronsUpDown className="size-4 opacity-50" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-85 p-0"
      >
        <Command>
          <CommandInput placeholder="Search trading pair..." />

          <CommandList className="max-h-80">
            <CommandEmpty>
              No trading pair found.
            </CommandEmpty>

            {PAIR_GROUPS.map((group) => (
              <CommandGroup
                key={group.title}
                heading={group.title}
              >
                {group.pairs.map((pair) => (
                  <CommandItem
                    key={pair}
                    value={pair}
                    onSelect={() => {
                      onChange(pair);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        value === pair
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {pair}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}