export interface LoginFormObj {
  email: string;
  password: string;
}

export interface userObj {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface updateUserForm {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface addUserForm {
  name: string;
  email: string;
  role: string;
}
