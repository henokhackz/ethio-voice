/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string | null;
  lastName: string | null;
  username: string;
  photo: string;
};

declare type Feedback = {
  id: number;
  name: string;
  phoneNumber: string;
  feedback: string;
  category: string;
  state: string;
};

declare type Notification = {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
};
