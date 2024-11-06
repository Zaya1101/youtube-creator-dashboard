import { createContext } from "react";

type UserContextType = {
  givenName: string;
  setGivenName: (name: string) => void;
  pictureUrl: string;
  setPictureUrl: (url: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export { UserContext, UserContextType };