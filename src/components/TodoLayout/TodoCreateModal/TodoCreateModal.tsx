import { TodoScheme } from "@schemes";
import { ButtonType, TodoTimeConstants, TodoValidateData, TodoValidateFields } from "@constants";
import { Button, Input, Modal } from "@components";
import { useAppDispatch, useAppSelector, useModalState } from "@hooks";
import { addTodo, setTodoTitle } from "@store";
import { setExpirationDateFormat, setMaxTimeToDate, setMinTimeToDate, setSelectedDate, setSelectedTodoTitle } from "@utils";
import cn from "classnames";
import { Formik } from "formik";
import { FormEvent, ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/ModalCommom.module.scss";

export const TodoCreateModal = (): ReactNode => {
  const [modalActive, setModalActive] = useModalState("createTodoModal");

  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const { todoTitle } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    setModalActive(false);
    dispatch(setTodoTitle(""));
  };

  const setChangedTodoTitle = (
    e: FormEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    field: string,
  ): void => {
    const newTodoValue = setSelectedTodoTitle(e, setFieldValue, field);
    dispatch(setTodoTitle(newTodoValue));
  };

  const handleSubmit = (): void => {
    setModalActive(false);
    if (expirationDate) {
      dispatch(
        addTodo({
          createdDate: setExpirationDateFormat(new Date()),
          expirationDate: setExpirationDateFormat(expirationDate),
          todoTitle,
          isCompleted: false,
          todoId: uuidv4(),
        }),
      );
      dispatch(setTodoTitle(""));
    }
  };

  const handleChangeDatePicker = (date: Date, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
    if (setExpirationDateFormat(date).length === TodoValidateData.MAX_DATE_LENGTH) {
      setSelectedDate(date, setFieldValue, setExpirationDate);
      return;
    }
  };

  return (
    <Modal className={styles.modalContainer} setModalActive={setModalActive} modalActive={modalActive} title="Create Todo">
      <form onSubmit={e => e.preventDefault()} className={styles.modalForm}>
        <Formik
          initialValues={{
            todoTitle,
            expirationDate: "",
          }}
          validationSchema={TodoScheme}
          onSubmit={handleSubmit}
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
                  onChange={e => setChangedTodoTitle(e, setFieldValue, TodoValidateFields.TODO_TITLE)}
                  value={values.todoTitle}
                  id={TodoValidateFields.TODO_TITLE}
                />

                <label className={styles.modalLabel} htmlFor={TodoValidateFields.CREATED_DATE}>
                  Created date:
                </label>
                <Input
                  className={cn(styles.modalField, styles.disabledModalField)}
                  value={setExpirationDateFormat(new Date())}
                  disabled
                  id={TodoValidateFields.CREATED_DATE}
                />

                <label className={styles.modalLabel} htmlFor={TodoValidateFields.EXPIRATION_DATE}>
                  <span className={styles.requiredSymbol}>*</span> Expiration date:
                  <span className={styles.modalError}>{errors.expirationDate}</span>
                </label>
                <DatePicker
                  className={cn(styles.modalField, errors.expirationDate ? styles.modalFieldError : styles.modalField)}
                  selected={expirationDate}
                  onChange={(date: Date) => handleChangeDatePicker(date, setFieldValue)}
                  showTimeSelect
                  todayButton="Today"
                  timeFormat="HH:mm"
                  timeIntervals={TodoTimeConstants.TIME_INTERVAL}
                  dateFormat="dd.MM.yyyy HH:mm"
                  id={TodoValidateFields.EXPIRATION_DATE}
                  placeholderText="Select expiration date"
                  minDate={new Date()}
                  minTime={setMinTimeToDate(expirationDate)}
                  maxTime={setMaxTimeToDate(new Date())}
                />
              </div>

              <div className={styles.footerModal}>
                <Button
                  onClick={handleCloseModal}
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
