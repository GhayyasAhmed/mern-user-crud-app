type UserRecord = {
  _id: { toString(): string };
  name: string;
  email: string;
  age: number;
};

export function toUserResponse(user: UserRecord) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    age: user.age,
  };
}
