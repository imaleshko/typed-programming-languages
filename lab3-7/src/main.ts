import { summarizeUser } from "./summarize.js";

const rawId = process.argv[2];

let id = 1;

if (rawId !== undefined) {
  id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    console.log("bad-id");
    process.exit(1);
  }
}

const result = await summarizeUser(id);

if (result.ok) {
  console.log("Імʼя: " + result.summary.name);
  console.log("Email: " + result.summary.email);
  console.log("Місто: " + result.summary.city);
  console.log("Компанія: " + result.summary.company);
  console.log("Кількість постів: " + result.summary.posts);
  console.log("Кількість завдань: " + result.summary.todos);
  console.log("Кількість завершених завдань: " + result.summary.completed);
  console.log("Частка виконаних завдань: " + result.summary.doneRatio);
  if (result.summary.longest) {
    console.log("Найдовший пост:");
    console.log("Заголовок: " + result.summary.longest.title);
    console.log("Довжина: " + result.summary.longest.body.length);
  }
  console.log("Відкриті завдання:");
  for (const todoTitle of result.summary.openTitles) {
    console.log("Заголовок: " + todoTitle);
  }
} else {
  switch (result.failure.kind) {
    case "bad-id":
      console.log(result.failure.kind);
      console.log(result.failure.raw);
      break;
    case "network":
      console.log(result.failure.kind);
      console.log(result.failure.message);
      break;
    case "http":
      console.log(result.failure.kind);
      console.log(result.failure.status);
      break;
    case "parse":
      console.log(result.failure.kind);
      console.log(result.failure.reason);
      break;
    default: {
      const leftover: never = result.failure;
    }
  }
  process.exit(1);
}
