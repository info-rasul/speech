import { createContext, ReactNode, useState } from 'react';

export const TitleContext = createContext({
  title: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTitle: (arg: string) => {},
});

// props types for provider
type ProviderProps = {
  children: ReactNode;
};

const TitleContextProvider = ({ children }: ProviderProps) => {
  const [title, setTitle] = useState('');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
