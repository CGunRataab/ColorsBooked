import { createContext } from 'react';

type userInfo = {
  id: string;
  name: string;
  email: string;
};
type ContextType = {
  user: userInfo | null;
  setUser: React.Dispatch<React.SetStateAction<userInfo | null>>;
};

export const UploadImageContext = createContext<ContextType | null>(null);
