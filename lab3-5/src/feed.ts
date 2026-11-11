import type { Todo } from "./todo";

interface Address {
  city: string;
}

interface Company {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  company: Company;
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type FeedItem = { kind: "post"; post: Post } | { kind: "todo"; todo: Todo };

const describe = (item: FeedItem): string => {
  switch (item.kind) {
    case "post":
      return `допис ${item.post.title}`;
    case "todo":
      return `завдання ${item.todo.title} ${item.todo.completed ? "виконано" : "відкрито"}`;
    default: {
      const leftover: never = item;
      return leftover;
    }
  }
};

const user: User = {
  id: 1,
  name: "Ivan",
  email: "ivan@gmail.com",
  address: {
    city: "Uzhhorod",
  },
  company: {
    name: "none",
  },
};

const feed: FeedItem[] = [
  {
    kind: "post",
    post: {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
    },
  },
  {
    kind: "post",
    post: {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
    },
  },
  {
    kind: "todo",
    todo: {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
  },
  {
    kind: "todo",
    todo: {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: true,
    },
  },
];

console.log(`Імʼя: ${user.name}`);
console.log(`Місто: ${user.address.city}`);
console.log(`Назва компанії: ${user.company.name}`);

for (const item of feed) {
  console.log(describe(item));
}
