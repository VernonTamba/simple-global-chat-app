import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        login,
        setLogin,
        signUp,
        setSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
