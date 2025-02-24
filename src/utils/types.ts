export type UserName = {
  userName: string;
  passWord: string;
};
export type Profile = {
  age: number | null;
  bio: string;
  location: string;
};
export type UserProfie = {
  userName: string;
  profile: Profile;
};
