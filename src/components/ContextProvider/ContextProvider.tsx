import { useState } from "react";

import { UserContext } from "lib/context/userContext";

type ContextProviderProps = {
  children: React.ReactNode;
};

export default function ContextProvider({
  children
}: ContextProviderProps) {
  const [ givenName, setGivenName ] = useState("");
  const [ pictureUrl, setPictureUrl ] = useState("");

  return (
    <UserContext.Provider 
      value={{ givenName, setGivenName, pictureUrl, setPictureUrl }}>
      {children}
    </UserContext.Provider>
  )
}