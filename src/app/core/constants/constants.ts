import { register } from "module";

export const constants = {
  CURRENT_TOKEN: "CURRENT_TOKEN",
};

const apiUrl = "http://localhost:3077/api";

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiUrl}/user/login`,
    logout: `${apiUrl}/user/logout`,
    loggedUser: `${apiUrl}/user/me`,
    register: `${apiUrl}/user`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiUrl}/task/all`,
    getTodoById: `${apiUrl}/task`,
    addTodo: `${apiUrl}/task`,
    updateTodo: `${apiUrl}/task`,
    updateTodoStatus: `${apiUrl}/task/status`,
    deleteTodo: `${apiUrl}/task/delete`,
  },
};
