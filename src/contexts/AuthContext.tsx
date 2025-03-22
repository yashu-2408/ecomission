
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

type UserRole = 'user' | 'staff' | 'admin';

type AuthResult = {
  error: Error | null;
  data?: any;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: UserRole | null;
  signIn: (email: string, password: string, role: UserRole) => Promise<AuthResult>;
  signUp: (email: string, password: string, role: UserRole) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const setData = async () => {
      try {
        // Check active sessions when the component mounts
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Fetch user role from user metadata if available
          if (session?.user) {
            const role = session.user.user_metadata.role as UserRole;
            setUserRole(role);
          }
        }
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setLoading(false);
      }
    };

    setData();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Update role when auth state changes
        if (session?.user) {
          const role = session.user.user_metadata.role as UserRole;
          setUserRole(role);
        } else {
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, role: UserRole): Promise<AuthResult> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role, // Store role in user metadata
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { error: error };
      } else {
        toast({
          title: "Verification email sent",
          description: "Please check your email to verify your account.",
        });
        return { data, error: null };
      }
    } catch (error) {
      console.error('Error signing up:', error);
      const err = error instanceof Error ? error : new Error('Unknown error during sign up');
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string, role: UserRole): Promise<AuthResult> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error: error };
      } else if (data.user?.user_metadata.role !== role) {
        // If user tries to login to a portal they don't have access to
        await supabase.auth.signOut();
        const accessError = new Error(`You don't have permission to access the ${role} portal.`);
        toast({
          title: "Access denied",
          description: `You don't have permission to access the ${role} portal.`,
          variant: "destructive",
        });
        return { error: accessError };
      } else {
        setUserRole(role);
        toast({
          title: "Signed in successfully",
          description: `Welcome to the ${role} portal.`,
        });
        return { data, error: null };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      const err = error instanceof Error ? error : new Error('Unknown error during sign in');
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setUserRole(null);
        toast({
          title: "Signed out successfully",
        });
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
