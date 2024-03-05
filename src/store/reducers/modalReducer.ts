import { ModalConstants } from "@/common/constants/ModalConstants.ts";
import { ModalActionTypes } from "@/common/types/Modal.ts";

const initialState: ModalState = {
  createTodoModal: {
    visible: false,
    props: {},
  },
  editTodoModal: {
    visible: false,
    props: {},
  },
  confirmModal: {
    visible: false,
    props: {},
  },
};

export type ComponentsState<P extends object = object> = {
  visible: boolean;
  props: P | object;
};

export type ModalState = {
  createTodoModal: ComponentsState;
  editTodoModal: ComponentsState;
  confirmModal: ComponentsState;
};

export const modalReducer = (state = initialState, action: ModalActionTypes): ModalState => {
  switch (action.type) {
    case ModalConstants.SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
