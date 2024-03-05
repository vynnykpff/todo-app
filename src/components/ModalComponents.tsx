import { TodoCreateModal } from "@/components/TodoLayout/TodoCreateModal";
import { TodoEditModal } from "@/components/TodoLayout/TodoEditModal";
import { ConfirmModal } from "@/components/ConfirmModal";

import { useAppSelector } from "@hooks";
import { ModalState } from "@store";
import { FC, ReactNode } from "react";

export const components: Record<keyof ModalState, FC<any>> = {
  createTodoModal: TodoCreateModal,
  editTodoModal: TodoEditModal,
  confirmModal: ConfirmModal,
};

export const ModalComponents = (): ReactNode => {
  const modalState = useAppSelector(state => state.modalReducer);

  return (
    <>
      {Object.keys(modalState).map(i => {
        const key = i as keyof typeof modalState;
        if (!modalState[key].visible) {
          return null;
        }

        const Component = components[key];

        return <Component key={key} {...modalState[key].props} />;
      })}
    </>
  );
};
