import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const session = supabase.auth.getSession();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    )

    return () => listener?.subscription.unsubscribe();
  }, []);

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
