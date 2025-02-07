import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../../external/supabaseconfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.session?.user || null);
      setLoading(false);
    };

    getUser();

    // Listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
