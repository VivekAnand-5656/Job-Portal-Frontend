import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );
  const [token,setToken] = useState(
    localStorage.getItem("token") || null
  ) 
  const [loading, setLoading] = useState(true);

//   ---------- Show education form -------
  const [showEdu,setShowEdu] = useState(false)
  const [showPro,setShowPro] = useState(false)
  const [showUpdateEdu,setShowUpdateEdu] = useState(false)

//   ---------- See Full Detail of Job By id -----
  const [jobdetail,setJobdetail] = useState({})
  // ---------------- LOAD USER FROM LOCALSTORAGE ----------------
  useEffect(() => {
    const storedToken = localStorage.getItem("usertoken");
    const storedRole = localStorage.getItem("userrole")

    if (storedToken) { 
      setToken(storedToken)
      setRole(storedRole) 
    } 

    setLoading(false);
  }, []);

  // ---------------- LOGIN ----------------
  const login = (userData) => {
    localStorage.setItem("usertoken", userData.token); 
    localStorage.setItem("userrole",userData.role)
    setToken(userData.token)  
    setRole(userData.role)
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userrole") 
    setToken(null)
    setRole(null)
  };

  return (
    <AuthContext.Provider
      value={{ 
        role,
        token,
        login,
        logout, 
        loading,
        showEdu,setShowEdu,
        showPro,setShowPro,
        showUpdateEdu,setShowUpdateEdu,
        jobdetail,setJobdetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

 