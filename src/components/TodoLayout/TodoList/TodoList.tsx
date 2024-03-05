import { ReactNode } from "react";
import { useAppSelector } from "@hooks";
import { Todo, TodoListEmpty, TodoListHeader } from "./components";
import styles from "./TodoList.module.scss";

export const TodoList = (): ReactNode => {
  const { searchedTodos, todos, filterValue, searchValue } = useAppSelector(state => state.todoReducer);

  const visibleTodos = searchValue.length ? searchedTodos : todos;

  const setTodoEmptyMessage = (): string => {
    return searchValue.length ? `Nothing found in the filter: ${filterValue}` : filterValue;
  };

  return (
    <section className={styles.todoListSection}>
      <TodoListHeader />
      <ul className={styles.todoListContainer}>
        {visibleTodos.length ? (
          visibleTodos.map(todo => <Todo key={todo.todoId} {...todo} />)
        ) : (
          <TodoListEmpty title={setTodoEmptyMessage()} />
        )}
      </ul>
    </section>
  );
};
