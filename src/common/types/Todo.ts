import { TodoConstants, TodoEditingConstants, TodoFilteringConstants } from "@/common/constants/TodoConstants/TodoManagementActions.ts";

type AddTodoAction = {
  type: typeof TodoConstants.ADD_TODO;
  payload: Todo;
};

type SetTodoTitleAction = {
  type: typeof TodoEditingConstants.SET_TODO_TITLE;
  payload: {
    todoTitle: Todo["todoTitle"];
  };
};

type SetTodoCompletedAction = {
  type: typeof TodoEditingConstants.SET_COMPLETED_TODO;
  payload: {
    todoId: Todo["todoId"];
  };
};

type DeleteTodoAction = {
  type: typeof TodoConstants.DELETE_TODO;
  payload: {
    todoId: Todo["todoId"];
  };
};

type EditTodoAction = {
  type: typeof TodoEditingConstants.EDIT_TODO;
  payload: EditTodo;
};

type SetCurrentTodoAction = {
  type: typeof TodoEditingConstants.SET_CURRENT_TODO;
  payload: Todo;
};

type SetFiltrationValueAction = {
  type: typeof TodoFilteringConstants.SET_FILTRATION_VALUE;
  payload: {
    filter: string;
  };
};

type DeleteCompletedTodoAction = {
  type: typeof TodoConstants.DELETE_COMPLETED_TODOS;
};

type SearchTodosAction = {
  type: typeof TodoFilteringConstants.SEARCH_TODO;
  payload: Todo[];
};

type SetSearchValueAction = {
  type: typeof TodoFilteringConstants.SEARCH_VALUE;
  payload: Todo["todoTitle"];
};

export type Todo = {
  todoTitle: string;
  createdDate: string;
  expirationDate: string;
  isCompleted: boolean;
  todoId: string;
};

export type EditTodo = {
  todoTitle: Todo["todoTitle"];
  createdDate: Todo["createdDate"];
  expirationDate: Todo["expirationDate"];
  todoId: Todo["todoId"];
};

export type TodoActionTypes =
  | AddTodoAction
  | SetTodoTitleAction
  | SetTodoCompletedAction
  | DeleteTodoAction
  | EditTodoAction
  | SetCurrentTodoAction
  | SetFiltrationValueAction
  | DeleteCompletedTodoAction
  | SearchTodosAction
  | SetSearchValueAction;
