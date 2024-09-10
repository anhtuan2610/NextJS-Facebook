export type TUser = {
  id: "string",
  username: "string",
  email: "string",
  passwordHash: "string",
  fullName: "string",
  profileImg: "string",
  coverImg: "string",
  bio: "string",
  dateOfBirth: "string",
  gender: "string",
  createdAt: "string",
  updatedAt: "string",
  // chatReceivers: [],
  // chatSenders: [],
  // comments: [],
  // friendshipUserId1Navigations: [],
  // friendshipUserId2Navigations: [],
  // likes: [],
  // notifications: [],
  // posts: []
}

export type ResponseAuth = {
    message: string,
    accessToken: string
}

export type TResponseLastedChat = {
  userId: Number,
  fullName: string,
  lastMessage: string,
  createAt: string,
  isSender: boolean,
}