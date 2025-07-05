
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'github' | 'facebook';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (provider: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('todo_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate OAuth login - in real app, this would redirect to OAuth provider
    const mockUser: User = {
      id: `${provider}_${Date.now()}`,
      name: provider === 'google' ? 'John Doe' : provider === 'github' ? 'Jane Smith' : 'Bob Wilson',
      email: `user@${provider}.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      provider: provider as 'google' | 'github' | 'facebook'
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    localStorage.setItem('todo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('todo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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
