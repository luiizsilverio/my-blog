/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  function sign_Out() {
    supabase.auth.signOut()
      .then(() => setUser(null))
  }

  useEffect(() => {
    setLoading(true);

    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    )

    return () => {
      authListener?.subscription.unsubscribe();
      setUser(null);
    }
  }, []);


  // useEffect(() => {
  //   const session = supabase.auth.getSession();

  //   console.log(session)
  //   setUser(session?.user ?? null);
  //   setLoading(false);

  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     async (session) => {
  //       setUser(session?.user ?? null);
  //       setLoading(false);
  //     }
  //   )

  //   return () => listener?.subscription.unsubscribe();
  // }, []);

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => sign_Out(), //supabase.auth.signOut()
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
