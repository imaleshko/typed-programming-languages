import type { Todo } from "./todo";

export type ParseResult<T> =
  { ok: true; value: T } | { ok: false; reason: string };

const rawString = `[
  { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
  { "userId": 1, "id": 2, "title": "quis ut nam facilis et officia qui", "completed": false }
]`;

export const isObject = (value: unknown): value is object => {
  return typeof value === "object" && value !== null;
};

export const isTodo = (value: unknown): value is Todo => {
  return (
    isObject(value) &&
    "userId" in value &&
    typeof value.userId === "number" &&
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean"
  );
};

const isTodoList = (value: unknown): value is Todo[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const element of value) {
    if (!isTodo(element)) {
      return false;
    }
  }

  return true;
};

const parseTodos = (rawString: string): ParseResult<Todo[]> => {
  let data: unknown;
  try {
    data = JSON.parse(rawString) as unknown;
  } catch {
    return { ok: false, reason: "не JSON" };
  }

  if (!isTodoList(data)) {
    return { ok: false, reason: "не масив TODO" };
  }

  return { ok: true, value: data };
};

// console.log(rawString);
// console.log(parseTodos(rawString));
// console.log(parseTodos('[{title: "лише заголовок"}]'));
// console.log(parseTodos('[{"title": "лише заголовок"}]'));
