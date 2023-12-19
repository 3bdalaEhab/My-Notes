import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  const [tokenUser, setTokenUser] = useState(localStorage.getItem("token"))
  async function signIn(value) {
    try {
      const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        value
      );
      localStorage.setItem("token" ,`3b8ny__${data.token}`)
      return data;
    } catch (error) {
      let err = error.response.data.msg;
      console.log(error);
      return err
      
    }
  }
  
  async function signUp(value) {
    try {
      const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        value
      );

      return data;
    } catch (error) {

      let err = error.response.data.msg;
      console.log(error);
      return err
    }
  }

  function logOut(){
    localStorage.removeItem("token")
  }

  return (
    <UserContext.Provider value={{ signUp, signIn , tokenUser , setTokenUser ,logOut}}>
      {children}
    </UserContext.Provider>
  );
}
