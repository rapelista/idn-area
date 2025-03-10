import {
  CheckIcon,
  CloseButton,
  Code,
  Combobox,
  ComboboxProps,
  Group,
  Loader,
  Stack,
  TextInput,
  TextInputProps,
  useCombobox,
} from "@mantine/core";
import { useRef, useState } from "react";
import { EntityType } from "~/types/entity";
import { ParamsType } from "~/types/uri";
import { useFetchPaginatedData } from "../hooks";

export interface AsyncAutocompleteProps<V, T>
  extends AsyncAutocompleteControlledProps<V>,
    AsyncAutocompleteComponentProps,
    Omit<TextInputProps, "defaultValue" | "value"> {
  context: string;
  params?: ParamsType;

  valueKey?: keyof T;
  renderKey?: keyof T;

  defaultRender?: string;
  defaultValue?: V;

  withAuth?: boolean;
  clearable?: boolean;

  /**
   * Make sure dev only.
   */
  debug?: boolean;
}

export interface AsyncAutocompleteComponentProps {
  comboboxProps?: ComboboxProps;
}

export interface AsyncAutocompleteControlledProps<V> {
  value?: V | null;
  searchValue?: string;
  onValueChange?: (value: V | null) => void;
  onSearchChange?: (search: string) => void;
}

export function AsyncAutocomplete<
  V extends number | string | null,
  T extends EntityType & Record<string, V>
>({
  context,
  params,

  valueKey = "code",
  renderKey = "name",

  defaultRender,
  defaultValue,

  withAuth,
  clearable = false,

  /**
   * Make sure dev only.
   */
  debug = false,

  /**
   * ComponentProps
   */
  comboboxProps,

  /**
   * TextInputProps.
   */
  rightSection,

  /**
   * Controlled
   */
  value: controlledValue,
  searchValue: controlledSearchValue,
  onValueChange,
  onSearchChange,

  ...props
}: AsyncAutocompleteProps<V, T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<V | null>(defaultValue || null);
  const [search, setSearch] = useState(defaultRender || "");

  const enabled =
    !!controlledSearchValue ||
    !!defaultRender ||
    (controlledValue ?? value) === null;

  const { data, isFetching } = useFetchPaginatedData<T>(
    context,
    { search: controlledSearchValue ?? search, ...params },
    { enabled, withAuth }
  );

  const loading = isFetching;
  const empty = data.length === 0;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = (data || []).map((item) => {
    const itemValue = String(item[valueKey]);
    const itemRender = item[renderKey];

    return (
      <Combobox.Option
        key={itemValue}
        value={itemValue}
        active={itemValue === String(controlledValue ?? value)}
      >
        <Group gap="xs">
          {itemValue === String(controlledValue ?? value) && (
            <CheckIcon size={12} />
          )}
          <span>{itemRender}</span>
        </Group>
      </Combobox.Option>
    );
  });

  const updateSearch = (search: string) => {
    if (onSearchChange) {
      onSearchChange(search);
    } else {
      setSearch(search);
    }
  };

  const updateValue = (value: V | null) => {
    if (onValueChange) {
      onValueChange(value);
    } else {
      setValue(value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.currentTarget.value);
    updateValue(null);

    combobox.resetSelectedOption();
    combobox.openDropdown();
  };

  const handleOptionSubmit = (optionValue: string) => {
    const option = data.find(
      (item: Record<string, V>) => item[valueKey]?.toString() === optionValue
    );

    if (option) {
      updateSearch(String(option[renderKey]));
      updateValue(option[valueKey]);
    }

    combobox.closeDropdown();
  };

  const handleReset = () => {
    updateValue(null);
    updateSearch("");

    inputRef.current?.focus();
  };

  const renderCombobox = () => {
    return (
      <Combobox
        onOptionSubmit={handleOptionSubmit}
        withinPortal={false}
        store={combobox}
        {...comboboxProps}
      >
        <Combobox.Target>
          <TextInput
            ref={inputRef}
            value={controlledSearchValue ?? search}
            onChange={handleChange}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={
              loading ? (
                <Loader size={18} />
              ) : clearable ? (
                <CloseButton
                  variant="transparent"
                  onClick={handleReset}
                  display={controlledValue ?? value ? undefined : "none"}
                />
              ) : (
                rightSection
              )
            }
            {...props}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  };

  const renderDebug = () => {
    return <Code block>{JSON.stringify({ value }, null, 2)}</Code>;
  };

  return debug ? (
    <Stack>
      {renderCombobox()}
      {renderDebug()}
    </Stack>
  ) : (
    renderCombobox()
  );
}
