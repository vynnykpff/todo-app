import { TodoCurrentFilter } from "@/common/constants/TodoConstants/TodoFilters.ts";
import { TodoConstants, TodoEditingConstants, TodoFilteringConstants } from "@/common/constants/TodoConstants/TodoManagementActions.ts";
import { Todo, TodoActionTypes } from "@/common/types/Todo.ts";

type TodoState = {
  todos: Todo[];
  todoTitle: string;
  todo: Todo;
  originalTodos: Todo[];
  filterValue: typeof TodoCurrentFilter.ALL;
  searchedTodos: Todo[];
  searchValue: string;
};

const initialState: TodoState = {
  todos: [],
  todoTitle: "",
  todo: { todoId: "", todoTitle: "", createdDate: "", isCompleted: false, expirationDate: "" },
  originalTodos: [],
  filterValue: TodoCurrentFilter.ALL,
  searchedTodos: [],
  searchValue: "",
};

const filterTodos = (todos: Todo[], filter: string): Todo[] => {
  switch (filter) {
    case TodoCurrentFilter.ACTIVE:
      return todos.filter(todo => !todo.isCompleted);
    case TodoCurrentFilter.COMPLETED:
      return todos.filter(todo => todo.isCompleted);
    default:
      return todos;
  }
};

const updateTodosAndOriginalTodos = (state: TodoState, updatedTodos: Todo[], filterValue: typeof TodoCurrentFilter.ALL): TodoState => {
  const filteredTodos = filterTodos(updatedTodos, filterValue);
  return {
    ...state,
    todos: filteredTodos,
    searchedTodos: filteredTodos,
    originalTodos: updatedTodos,
    filterValue,
    searchValue: "",
  };
};

const getSearchedTodos = (todos: Todo[], searchValue: string): Todo[] => {
  return todos.filter(todo => todo.todoTitle.toLowerCase().includes(searchValue.toLowerCase()));
};

export const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case TodoConstants.ADD_TODO: {
      const newTodo = action.payload;
      const updatedOriginalTodos = [newTodo, ...state.originalTodos];
      return updateTodosAndOriginalTodos(state, updatedOriginalTodos, TodoCurrentFilter.ALL);
    }
    case TodoEditingConstants.SET_TODO_TITLE:
      return {
        ...state,
        ...action.payload,
      };
    case TodoEditingConstants.SET_COMPLETED_TODO: {
      const { todoId } = action.payload;
      const updatedTodos = state.todos.map(todo =>
        todo.todoId === todoId
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
          : todo,
      );
      const updatedOriginalTodos = state.originalTodos.map(todo =>
        todo.todoId === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      );

      const filteredTodos = filterTodos(updatedTodos, state.filterValue);

      return {
        ...state,
        todos: filteredTodos,
        searchedTodos: filteredTodos,
        originalTodos: updatedOriginalTodos,
        searchValue: "",
      };
    }
    case TodoConstants.DELETE_TODO: {
      const filteredTodos = state.originalTodos.filter(todo => todo.todoId !== action.payload.todoId);
      return updateTodosAndOriginalTodos(state, filteredTodos, state.filterValue);
    }

    case TodoEditingConstants.EDIT_TODO: {
      const { todoId, todoTitle, createdDate, expirationDate } = action.payload;

      const updatedTodoIndex = state.originalTodos.findIndex(todo => todo.todoId === todoId);

      if (updatedTodoIndex === -1) {
        return state;
      }

      const updatedTodo = {
        ...state.originalTodos[updatedTodoIndex],
        todoTitle,
        createdDate,
        expirationDate,
      };

      const updatedOriginalTodos = [
        ...state.originalTodos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.originalTodos.slice(updatedTodoIndex + 1),
      ];

      return updateTodosAndOriginalTodos(state, updatedOriginalTodos, state.filterValue);
    }
    case TodoEditingConstants.SET_CURRENT_TODO: {
      return {
        ...state,
        todo: action.payload,
      };
    }
    case TodoFilteringConstants.SET_FILTRATION_VALUE: {
      const { filter } = action.payload;
      const filteredTodos = filterTodos(state.originalTodos, filter);
      const updatedTodos = filter === TodoCurrentFilter.ALL ? state.originalTodos : filteredTodos;

      return {
        ...state,
        filterValue: filter,
        todos: updatedTodos,
        searchedTodos: getSearchedTodos(filteredTodos, state.searchValue),
      };
    }
    case TodoConstants.DELETE_COMPLETED_TODOS: {
      const filteredCompletedTodos = state.originalTodos.filter(todo => !todo.isCompleted);
      return updateTodosAndOriginalTodos(state, filteredCompletedTodos, TodoCurrentFilter.ALL);
    }
    case TodoFilteringConstants.SEARCH_VALUE: {
      const searchValue = action.payload;

      return {
        ...state,
        searchValue,
        searchedTodos: getSearchedTodos(state.todos, searchValue),
      };
    }
    default:
      return state;
  }
};
