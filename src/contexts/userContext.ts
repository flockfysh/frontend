import React from 'react';

export const UserContext = React.createContext(
  {
    loggedIn: false,
    setLoggedIn: (_: boolean) => {}
  }
);
