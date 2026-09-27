interface User {
  firstName: string;
  lastName: string;
}

// const getAndValidate = <T>(json: string): T => {
//   const parsed = JSON.parse(json);
//   return parsed as T;
// };
//
// const user: User = getAndValidate<User>(
//   `{"firstName": "Ivan", "lastName": "Maleshko"}`,
// );
//
// const brokenUser: User = getAndValidate<User>(
//   `{"num": "18", "string": "something"}`,
// );
//
// console.log(user.firstName);
// console.log(brokenUser.firstName);

const validate = (obj: unknown): obj is User => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "firstName" in obj &&
    "lastName" in obj
  );
};

const getAndValidate = <T>(json: string): T => {
  const parsed = JSON.parse(json);
  if (!validate(parsed)) {
    throw new Error("Неправильний обʼєкт User");
  }
  return parsed as T;
};

const user: User = getAndValidate<User>(
  `{"firstName": "Ivan", "lastName": "Maleshko"}`,
);

const brokenUser: User = getAndValidate<User>(
  `{"num": "18", "string": "something"}`,
);

console.log(user);
console.log(brokenUser);
