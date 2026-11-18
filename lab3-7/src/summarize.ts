import type { Post } from "./feed";
import { ApiFailure, loadUser, UserBundle } from "./client.js";

export type Summary = Pick<UserBundle["user"], "name" | "email"> & {
  city: string;
  company: string;
  posts: number;
  todos: number;
  completed: number;
  doneRatio: number;
  longest: Post | null;
  openTitles: string[];
};

export type SummaryResult =
  { ok: true; summary: Summary } | { ok: false; failure: ApiFailure };

const longestPost = (posts: Readonly<Post[]>): Post | null => {
  if (posts.length === 0) {
    return null;
  }

  let longest = posts[0];
  for (const post of posts) {
    if (post.body.length > longest.body.length) {
      longest = post;
    }
  }
  return longest;
};

export const summarizeBundle = ({
  user,
  posts,
  todos,
}: Readonly<UserBundle>): Summary => {
  let completed = 0;
  const openTitles: string[] = [];

  for (const todo of todos) {
    if (todo.completed) {
      completed++;
    } else {
      openTitles.push(todo.title);
    }
  }

  return {
    name: user.name,
    email: user.email,
    city: user.address.city,
    company: user.company.name,
    posts: posts.length,
    todos: todos.length,
    completed,
    doneRatio: todos.length === 0 ? 0 : completed / todos.length,
    longest: longestPost(posts),
    openTitles,
  };
};

export const summarizeUser = async (id: number): Promise<SummaryResult> => {
  const load: Awaited<ReturnType<typeof loadUser>> = await loadUser(id);

  if (!load.ok) {
    return { ok: false, failure: load.failure };
  }

  return {
    ok: true,
    summary: summarizeBundle(load.data),
  };
};
