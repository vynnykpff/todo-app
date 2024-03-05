import { TodoCreate, TodoList, TodoSearch } from "@components";
import { ReactNode } from "react";
import styles from "./TodoLayout.module.scss";

export const TodoLayout = (): ReactNode => {
  return (
    <main className={styles.todoLayoutContainer}>
      <TodoCreate />
      <TodoSearch />
      <TodoList />
    </main>
  );
};
