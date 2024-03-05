import { ButtonType, TodoTimeConstants, TodoValidateFields } from "@/common";
import { TodoScheme } from "@schemes";
import { Button, Input, Modal } from "@components";
import { useAppDispatch, useAppSelector, useModalState } from "@hooks";
import { editTodo } from "@store";
import {
  getExpirationDateFormat,
  setExpirationDateFormat,
  setMaxTimeToDate,
  setMinTimeToDate,
  setSelectedDate,
  setSelectedTodoTitle,
} from "@utils";
import cn from "classnames";
import { isValid } from "date-fns";
import { Formik } from "formik";
import { ChangeEvent, ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "@/styles/ModalCommom.module.scss";

type FormData = {
  todoTitle: string;
  expirationDate: Date | null;
};

export const TodoEditModal = (): ReactNode => {
  const [modalActive, setModalActive] = useModalState("editTodoModal");
  const { todo } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const handleSubmit = (data: FormData): void => {
    setModalActive(false);
    const { todoTitle, expirationDate } = data;
    const { todoId, createdDate } = todo;
    const formattedExpirationDate =
      isValid(expirationDate) && expirationDate !== null ? setExpirationDateFormat(expirationDate) : todo.expirationDate;
    dispatch(editTodo({ todoTitle, expirationDate: formattedExpirationDate, createdDate, todoId }));
  };

  return (
    <Modal className={styles.modalContainer} setModalActive={setModalActive} modalActive={modalActive} title="Edit Todo">
      <form onSubmit={e => e.preventDefault()} className={styles.modalForm}>
        <Formik
          initialValues={{
            todoTitle: todo.todoTitle,
            expirationDate: todo.expirationDate ? new Date(todo.expirationDate) : null,
          }}
          validationSchema={TodoScheme}
          onSubmit={(data: FormData) => handleSubmit(data)}
        >
          {({ handleSubmit, values, errors, setFieldValue }) => (
            <>
              <div className={styles.modalFieldsWrapper}>
                <label className={styles.modalLabel} htmlFor={TodoValidateFields.TODO_TITLE}>
                  <span className={styles.requiredSymbol}>*</span> Title:
                  <span className={styles.modalError}>{errors.todoTitle}</span>
                </label>
                <Input
                  className={cn(styles.modalField, errors.todoTitle ? styles.modalFieldError : styles.modalField)}
                  placeholder="Enter new todo"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedTodoTitle(e, setFieldValue, TodoValidateFields.TODO_TITLE)}
                  value={values.todoTitle}
                  id={TodoValidateFields.TODO_TITLE}
                />

                <label className={styles.modalLabel} htmlFor={TodoValidateFields.CREATED_DATE}>
                  Created date:
                </label>
                <Input
                  className={cn(styles.modalField, styles.disabledModalField)}
                  value={todo.createdDate}
                  disabled
                  id={TodoValidateFields.CREATED_DATE}
                />

                <label className={styles.modalLabel} htmlFor={TodoValidateFields.EXPIRATION_DATE}>
                  <span className={styles.requiredSymbol}>*</span> Expiration date:
                  <span className={styles.modalError}>{errors.expirationDate}</span>
                </label>
                <DatePicker
                  className={cn(styles.modalField, errors.expirationDate ? styles.modalFieldError : styles.modalField)}
                  onChange={date => setSelectedDate(date, setFieldValue, setExpirationDate)}
                  selected={expirationDate ?? getExpirationDateFormat(todo.expirationDate)}
                  showTimeSelect
                  todayButton="Today"
                  timeFormat="HH:mm"
                  timeIntervals={TodoTimeConstants.TIME_INTERVAL}
                  dateFormat="dd.MM.yyyy HH:mm"
                  id={TodoValidateFields.EXPIRATION_DATE}
                  placeholderText="Select expiration date"
                  minDate={new Date()}
                  minTime={setMinTimeToDate(expirationDate ?? getExpirationDateFormat(todo.expirationDate))}
                  maxTime={setMaxTimeToDate(new Date())}
                />
              </div>

              <div className={styles.footerModal}>
                <Button
                  onClick={() => setModalActive(false)}
                  type={ButtonType.BUTTON}
                  className={cn(styles.cancelButton, styles.createTodoModalButton)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSubmit()}
                  type={ButtonType.BUTTON}
                  className={cn(styles.agreeButton, styles.createTodoModalButton)}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </Formik>
      </form>
    </Modal>
  );
};
