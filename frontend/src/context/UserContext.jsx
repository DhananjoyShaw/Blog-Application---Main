import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/refetch`, { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user:', err.response ? err.response.data : err.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
