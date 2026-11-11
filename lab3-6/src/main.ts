import { loadUser } from "./client.js";

const rawId = process.argv[2];
const id = Number(rawId);

if (!Number.isInteger(id) || id < 1) {
  console.log("bad-id");
  process.exit(1);
}

const result = await loadUser(id);

if (result.ok) {
  console.log(result.data.user.name);
  console.log(result.data.user.address.city);
  console.log(result.data.user.company.name);
  console.log(result.data.posts.length);
  console.log(result.data.todos.length);
} else {
  switch (result.failure.kind) {
    case "bad-id":
      console.log(result.failure.raw);
      break;
    case "network":
      console.log(result.failure.message);
      break;
    case "http":
      console.log(result.failure.status);
      break;
    case "parse":
      console.log(result.failure.reason);
      break;
    default: {
      const leftover: never = result.failure;
    }
  }
  process.exit(1);
}
