import { Types } from "mongoose";

const ids = [
  new Types.ObjectId(),
  new Types.ObjectId(),
  new Types.ObjectId(),
  new Types.ObjectId()
];

export const users = [
  {
    _id: ids[0],
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "$2b$10$W96U5jk.q2BTPdWjnqAgP.S1lsbWXzkUtG9Gn6I7RrEWLkIgsgn8O",
    picturePath: "default_picture.jpg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    viewedProfile: 570,
    impressions: 560,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0
  },
  {
    _id: ids[1],
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
    password: "$2b$10$W96U5jk.q2BTPdWjnqAgP.S1lsbWXzkUtG9Gn6I7RrEWLkIgsgn8O",
    picturePath: "profile1.jpg",
    friends: [],
    location: "New York",
    occupation: "Software Engineer",
    viewedProfile: 570,
    impressions: 560,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0
  },
];

export const posts = [
  {
    _id: ids[2],
    userId: ids[0],
    description: "Some really long random description",
    likes: new Map([
      [ids[1], true]
    ]),
    comments: [
      "random comment",
      "another random comment"
    ],
    userPicturePath: "default_picture.jpg",
    location: "San Fran, CA",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: ids[3],
    userId: ids[1],
    description: "Another really long random description. This one is longer than the previous one.",
    likes: new Map([
      [ids[0], true]
    ]),
    comments: [
      "random comment",
      "another random comment"
    ],
    picturePath: "post1.jpg",
    userPicturePath: "profile1.jpg",
    location: "New York",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  }
];
