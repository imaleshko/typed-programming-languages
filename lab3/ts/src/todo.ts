type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type IdTitle = [id: number, title: string];

const items: Todo[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
];

const completedCount = (items: Todo[]): number => {
  if (items.length === 0) {
    throw new Error("немає завдань");
  }
  let count = 0;
  for (const item of items) {
    if (item.completed) {
      count++;
    }
  }
  return count;
};

const openTitles = (items: Todo[]): string[] => {
  const result: string[] = [];
  for (const item of items) {
    if (!item.completed) {
      result.push(item.title);
    }
  }
  return result;
};

const toPair = (item: Todo): IdTitle => {
  return [item.id, item.title];
};

const printTodos = (items: Todo[]): void => {
  for (const item of items) {
    console.log(
      `${item.id}: ${item.title} - ${item.completed ? "виконано" : "відкрито"}`,
    );
  }
};

console.log(`Виконано завдань: ${completedCount(items)}`);
console.log(`Відкриті завдання: ${openTitles(items).join(", ")}`);
console.log("id та назва 4 завдання:", toPair(items[3]));
console.log("Список завдань:");
printTodos(items);
