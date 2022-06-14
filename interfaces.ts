export interface ICandidate {
  id?: string;
  username: string;
  age: number;
  hobbies: string | string[];
}

export interface IUser extends ICandidate {
  id: string;
}
