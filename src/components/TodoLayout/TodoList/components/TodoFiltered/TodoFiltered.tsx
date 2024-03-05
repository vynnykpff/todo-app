import { TodoCurrentFilterArray } from "@constants";
import { Button } from "@components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setFiltrationValue } from "@store";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoFiltered.module.scss";

export const TodoFiltered = (): ReactNode => {
  const { filterValue } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filteredTodoContainer}>
      {TodoCurrentFilterArray.map((value: string) => (
        <Button
          key={uuidv4()}
          disabled={filterValue === value}
          className={styles.filteredTodoButton}
          onClick={() => dispatch(setFiltrationValue(value))}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};
