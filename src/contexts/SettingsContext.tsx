import { createContext, ReactNode } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { themeSettingsProps } from '../theme';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const initialSettings: themeSettingsProps = {
  direction: 'ltr',
  theme: THEMES.LIGHT,
  responsiveFontSizes: true,
};

export const SettingsContext = createContext({
  settings: initialSettings,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveSettings: (arg: themeSettingsProps) => {},
});

// component props type
type settingsProviderProps = {
  children: ReactNode;
};

const SettingsProvider = ({ children }: settingsProviderProps) => {
  const { data: settings, storeData: setSettings } = useLocalStorage(
    'settings',
    initialSettings
  );

  const saveSettings = (updateSettings: themeSettingsProps) => {
    setSettings(updateSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
