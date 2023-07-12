export interface LoginFormObj {
  email: string;
  password: string;
}

export interface loginUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  brief: string;
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
}

export interface updateMeForm {
  name?: string;
  email?: string;
}

export interface updateRoleForm {
  id: string;
  role: string;
}

export interface addUserForm {
  name: string;
  email: string;
  role: string;
}

export interface updatePswForm {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}
