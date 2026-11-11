import type { Post, User } from "./feed";
import type { Todo } from "./todo.js";

import { isObject, isTodo, type ParseResult } from "./parse.js";

type ApiFailure =
  | { kind: "bad-id"; raw: string }
  | { kind: "network"; message: string }
  | { kind: "http"; status: number }
  | { kind: "parse"; reason: string };

type ApiResult =
  { ok: true; value: unknown } | { ok: false; failure: ApiFailure };

type UserBundle = { user: User; posts: Post[]; todos: Todo[] };

type LoadResult =
  { ok: true; data: UserBundle } | { ok: false; failure: ApiFailure };

const readJson = async (url: string): Promise<ApiResult> => {
  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    const message = error instanceof Error ? error.message : "помилка мережі";
    return { ok: false, failure: { kind: "network", message: message } };
  }

  if (!response.ok) {
    return { ok: false, failure: { kind: "http", status: response.status } };
  }

  try {
    return { ok: true, value: (await response.json()) as unknown };
  } catch (error) {
    const message = error instanceof Error ? error.message : "помилка парсингу";
    return { ok: false, failure: { kind: "parse", reason: message } };
  }
};

const isUser = (value: unknown): value is User => {
  return (
    isObject(value) &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "address" in value &&
    isObject(value.address) &&
    value.address !== null &&
    "city" in value.address &&
    typeof value.address.city === "string" &&
    "company" in value &&
    isObject(value.company) &&
    value.company !== null &&
    "name" in value.company &&
    typeof value.company.name === "string"
  );
};

const parseUser = (value: unknown): ParseResult<User> => {
  if (isUser(value)) {
    return { ok: true, value: value };
  }
  return { ok: false, reason: "неправильний формат користувача" };
};

const isPost = (value: unknown): value is Post => {
  return (
    isObject(value) &&
    "userId" in value &&
    typeof value.userId === "number" &&
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "body" in value &&
    typeof value.body === "string"
  );
};

const parsePosts = (value: unknown): ParseResult<Post[]> => {
  if (!Array.isArray(value)) {
    return { ok: false, reason: "неправильний формат списку постів" };
  }

  for (const element of value) {
    if (!isPost(element)) {
      return { ok: false, reason: "неправильний формат посту" };
    }
  }

  return { ok: true, value: value };
};

const parseTodos = (value: unknown): ParseResult<Todo[]> => {
  if (!Array.isArray(value)) {
    return { ok: false, reason: "неправильний формат списку TODO" };
  }

  for (const element of value) {
    if (!isTodo(element)) {
      return { ok: false, reason: "неправильний формат TODO" };
    }
  }

  return { ok: true, value: value };
};

export const loadUser = async (id: number): Promise<LoadResult> => {
  if (!Number.isInteger(id) || id < 1) {
    return {
      ok: false,
      failure: {
        kind: "bad-id",
        raw: "id повинен бути цілим додатним числом",
      },
    };
  }
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const userJson = await readJson(baseUrl + "/users/" + id);
  if (!userJson.ok) {
    return userJson;
  }
  const postJson = await readJson(baseUrl + "/posts?userId=" + id);
  if (!postJson.ok) {
    return postJson;
  }
  const todoJson = await readJson(baseUrl + "/todos?userId=" + id);
  if (!todoJson.ok) {
    return todoJson;
  }

  const user = parseUser(userJson.value);
  if (!user.ok) {
    return {
      ok: false,
      failure: { kind: "parse", reason: user.reason },
    };
  }
  const postList = parsePosts(postJson.value);
  if (!postList.ok) {
    return {
      ok: false,
      failure: { kind: "parse", reason: postList.reason },
    };
  }
  const todoList = parseTodos(todoJson.value);
  if (!todoList.ok) {
    return {
      ok: false,
      failure: { kind: "parse", reason: todoList.reason },
    };
  }

  return {
    ok: true,
    data: { user: user.value, posts: postList.value, todos: todoList.value },
  };
};
