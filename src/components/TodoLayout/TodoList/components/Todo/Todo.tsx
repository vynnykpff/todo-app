import { NotificationType, TodoConfirmMessages, TodoNotificationMessages } from "@constants";
import { Input } from "@components";
import { useAppDispatch, useModalState } from "@hooks";
import { deleteTodo, setCurrentTodo, setNotification, updateStatusTodo } from "@store";
import { Todo as TodoProps } from "@types";
import { checkOnCurrentExpirationDate } from "@utils";
import cn from "classnames";
import { FC, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import styles from "./Todo.module.scss";

export const Todo: FC<TodoProps> = ({ todoTitle, createdDate, expirationDate, todoId, isCompleted }) => {
  const [isShowInfo, setIsShowInfo] = useState(false);
  const setEditModalActive = useModalState("editTodoModal")[1];
  const setConfirmModalActive = useModalState("confirmModal")[1];
  const dispatch = useAppDispatch();

  const handleChangeStatusTodo = (): void => {
    dispatch(updateStatusTodo(todoId));
  };

  const handleClickDeleteTodo = (): void => {
    setConfirmModalActive(true, {
      confirmCallback: () => {
        dispatch(deleteTodo(todoId));
        dispatch(setNotification({ title: TodoNotificationMessages.DELETE_TODO, type: NotificationType.SUCCESS }));
      },
      message: TodoConfirmMessages.DELETE_TODO,
    });
  };

  const handleClickEditTodo = (): void => {
    if (!isCompleted) {
      setEditModalActive(true);
      dispatch(setCurrentTodo({ todoId, todoTitle, expirationDate, createdDate, isCompleted }));
    }
  };

  return (
    <li className={cn(styles.todoContainer, !checkOnCurrentExpirationDate(expirationDate) && styles.expiredTodoContainer)}>
      <div>
        <div className={styles.todoContent}>
          <label className={styles.todoCheck}>
            <Input className={styles.todoInput} type="checkbox" checked={isCompleted} onChange={handleChangeStatusTodo} />
            <span className={styles.todoCheckbox}></span>
          </label>
          <p className={cn(styles.todoTitle, isCompleted && styles.todoCompleted)}>{todoTitle}</p>
        </div>
        {isShowInfo && (
          <ul className={styles.todoDateContainer}>
            <li className={styles.todoDateContent}>{createdDate}</li>
            <BsDashLg className={styles.todoDateContent} />
            <li className={styles.todoDateContent}> {expirationDate}</li>
          </ul>
        )}
      </div>
      <HiOutlinePencilAlt
        className={cn(styles.todoIcon, styles.editIcon, isCompleted && styles.disabledEditIcon)}
        onClick={handleClickEditTodo}
      />
      <BiTrash className={cn(styles.todoIcon, styles.trashIcon)} onClick={handleClickDeleteTodo} />
      <AiOutlineInfoCircle className={cn(styles.todoIcon, styles.infoIcon)} onClick={() => setIsShowInfo(prev => !prev)} />
    </li>
  );
};
