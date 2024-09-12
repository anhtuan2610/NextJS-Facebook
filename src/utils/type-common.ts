export type TUser = {
  id: number,
  username: string,
  email: string,
  passwordHash: string,
  fullName: string,
  profileImg: string,
  coverImg: string,
  bio: string,
  dateOfBirth: string,
  gender: string,
  createdAt: string,
  updatedAt: string,
}

export type ResponseAuth = {
    message: string,
    accessToken: string
}

export type TResponseLastedChat = {
  userId: number,
  fullName: string,
  lastMessage: string,
  createAt: string,
  isSender: boolean,
}
