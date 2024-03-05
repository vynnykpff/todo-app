import { Button, Input } from "@components";
import { ButtonType, NotificationType, TodoNotificationMessages, TodoValidateData } from "@constants";
import { useAppDispatch, useAppSelector, useModalState } from "@hooks";
import { addTodo, setNotification, setTodoTitle } from "@store";
import { getNextDate, isValidField, setExpirationDateFormat } from "@utils";
import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { BsPlusLg } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoCreate.module.scss";

const SEND_KEY = "Enter";

export const TodoCreate = (): ReactNode => {
  const { todoTitle } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();

  const setTitleStoreValue = (value: string): void => {
    dispatch(setTodoTitle(value));
  };

  const setModalActive = useModalState("createTodoModal")[1];

  const handleCreateTodo = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code !== SEND_KEY) {
      return;
    }

    if (!todoTitle.trim().length) {
      dispatch(setNotification({ title: TodoNotificationMessages.EMPTY_TITLE, type: NotificationType.ERROR }));
      return;
    }
    dispatch(
      addTodo({
        createdDate: setExpirationDateFormat(new Date()),
        expirationDate: getNextDate(new Date()),
        todoTitle,
        isCompleted: false,
        todoId: uuidv4(),
      }),
    );
    return setTitleStoreValue("");
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;

    if (inputValue.trim().length >= TodoValidateData.MAX_TITLE_LENGTH) {
      dispatch(setNotification({ title: TodoNotificationMessages.MAX_LENGTH, type: NotificationType.ERROR }));
      return setTitleStoreValue(todoTitle.replace(inputValue, ""));
    }
    setTitleStoreValue(isValidField(inputValue));
  };

  return (
    <div className={styles.createTodoContainer}>
      <Input
        onKeyDown={handleCreateTodo}
        onChange={handleChangeInput}
        value={todoTitle}
        className={styles.createTodoInput}
        placeholder="Enter new todo"
      />
      <Button onClick={() => setModalActive(true)} type={ButtonType.BUTTON} className={styles.createTodoButton}>
        <span className={styles.createTodoButtonTitle}>
          <span>Create</span>
          <BsPlusLg />
        </span>
      </Button>
    </div>
  );
};
