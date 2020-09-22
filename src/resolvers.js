// This resolvers.js file is going to be the way we provide the instructions for turning a GraphQL operation into data.
// In GraphQL, you will deal with three main concepts:
// queries — the way you’re going to get data from the server.
// mutations — the way you’re going to modify data on the server and get updated data back (create, update, delete).
// subscriptions — the way you’re going to maintain a real-time connection with the server.

import { users } from "./db";

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
        return users.find(user => user.id == id);
    },
    users: (parent, args, context, info) => {
        return users;
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {
      const newUser = { id, name, email, age };

      users.push(newUser);

      return newUser;
    },
    updateUser: (parent, { id, name, email, age }, context, info) => {
      let newUser = users.find(user => user.id == id);

      newUser.name = name;
      newUser.email = email;
      newUser.age = age;

      return newUser;
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex(user => user.id == id);

      if (userIndex === -1) throw new Error("User not found.");

      const deletedUsers = users.splice(userIndex, 1);

      return deletedUsers[0];
    }
  }
};

export default resolvers;