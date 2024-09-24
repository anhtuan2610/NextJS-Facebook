export type TUser = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  fullName: string;
  profileImg: string;
  coverImg: string;
  bio: string;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
};

export type TResponseAuth = {
  message: string;
  accessToken: string;
};

export type TResponseLastedChat = {
  userId: number;
  fullName: string;
  lastMessage: string;
  createAt: string;
  isSender: boolean;
};

export type TResponseChatBetweenUsers = {
  id?: number;
  content: string;
  createAt: string;
  isSender: boolean;
};

export type TNewChat = {
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
};
