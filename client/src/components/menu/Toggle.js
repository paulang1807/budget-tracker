// REF: https://blog.logrocket.com/dark-mode-in-react-an-in-depth-guide/
import React, { useState, useEffect } from 'react';
import Toggle from "react-toggle";
import { useMediaQuery } from 'react-responsive';
import { FaSun, FaMoon } from "react-icons/fa";

import Tooltip from '../common/Tooltip';

// Styles
import "react-toggle/style.css"
import "../../styles/menu/Toggle.css"

// RFE: Use persisted state
// https://medium.com/swlh/persisting-state-on-react-apps-726c310f35ed

export const DarkModeToggle = () => {
  // useMediaQuery hook takes a query, initial value, and an onChange handler that is fired whenever the query’s output is changed
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    isSystemDark => setIsDark(isSystemDark)
  );

  const [isDark, setIsDark] = useState(systemPrefersDark);

  // Effect to add or remove dark mode class to the css root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]); 

  return (
    <Tooltip tooltip={'Toggle Dark Mode'}>
      <div>
        <Toggle
          className="dark-mode"
          checked={isDark}
          onChange={({ target }) => setIsDark(target.checked)}
          icons={{ checked: <FaSun />, unchecked: <FaMoon /> }}
          aria-label="Dark mode toggle"
        />
      </div>
    </Tooltip>
  );

}