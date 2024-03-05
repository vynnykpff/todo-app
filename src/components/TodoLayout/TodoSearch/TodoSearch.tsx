import { Input } from "@components";
import { useAppDispatch, useAppSelector, useDebounce } from "@hooks";
import { setSearchValue } from "@store";
import cn from "classnames";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./TodoSearch.module.scss";

export const TodoSearch = (): ReactNode => {
  const [value, setValue] = useState("");
  const { filterValue, searchValue } = useAppSelector(state => state.todoReducer);
  const debouncedValue = useDebounce<string>(value, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value.length && !searchValue.length) {
      setValue("");
    }
  }, [filterValue, searchValue]);

  useEffect(() => {
    dispatch(setSearchValue(value));
  }, [debouncedValue]);

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleClearSearchValue = (): void => {
    if (searchValue.length) {
      dispatch(setSearchValue(""));
    }
  };

  return (
    <span className={styles.searchTodoContainer}>
      <IoIosClose
        onClick={handleClearSearchValue}
        className={cn(styles.searchClearIcon, !searchValue.length && styles.searchClearIconDisabled)}
      />
      <Input
        value={value}
        onChange={handleChangeSearchValue}
        className={styles.searchTodoInput}
        placeholder="Enter to search for your todos"
      />
    </span>
  );
};
