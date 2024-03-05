import { NotificationType, TodoConfirmMessages, TodoCurrentFilter, TodoNotificationMessages } from "@constants";
import { TodoFiltered } from "../TodoFiltered";
import { Button } from "@components";
import { useAppDispatch, useAppSelector, useModalState } from "@hooks";
import { deleteCompletedTodos, setFiltrationValue, setNotification } from "@store";
import cn from "classnames";
import styles from "./TodoListHeader.module.scss";
import { ReactNode, useEffect, useState } from "react";
import filteredStyles from "../TodoFiltered/TodoFiltered.module.scss";

export const TodoListHeader = (): ReactNode => {
  const { originalTodos } = useAppSelector(state => state.todoReducer);
  const [completedTodo, setCompletedTodo] = useState(0);
  const setConfirmModalActive = useModalState("confirmModal")[1];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const completedTodos = originalTodos.filter(todo => todo.isCompleted);
    setCompletedTodo(completedTodos.length);
  }, [originalTodos]);

  const handleDeleteCompletedTodos = (): void => {
    setConfirmModalActive(true, {
      confirmCallback: () => {
        dispatch(setNotification({ title: TodoNotificationMessages.DELETE_COMPLETED_TODOS, type: NotificationType.SUCCESS }));
        dispatch(deleteCompletedTodos());
        dispatch(setFiltrationValue(TodoCurrentFilter.ALL));
      },
      message: TodoConfirmMessages.DELETE_COMPLETED_TODOS,
    });
  };

  return (
    <div className={styles.todoListHeader}>
      <div className={styles.todoListHeaderWrapper}>
        <div className={styles.todoListContentContainer}>
          <p className={styles.todoListTitle}>
            Tasks created
            <span className={styles.todoListCounter}>{originalTodos.length}</span>
          </p>
          <p className={cn(styles.todoListTitle, styles.completedTodosTitle)}>
            Completed
            <span className={styles.todoListCounter}>
              {completedTodo} of {originalTodos.length}
            </span>
          </p>
        </div>
        <Button
          disabled={!originalTodos.filter(todo => todo.isCompleted).length}
          onClick={handleDeleteCompletedTodos}
          className={cn(filteredStyles.filteredTodoButton, styles.clearCompletedTodosButton)}
        >
          Clear Completed
        </Button>
      </div>
      <TodoFiltered />
    </div>
  );
};
