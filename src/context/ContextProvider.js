import React, { useState } from 'react';
import Context from './Context'; // Import your context object

const ContextProvider = ({ children }) => {
  const [ispopup, setispopup] = useState(false);

  return (
    <Context.Provider value={{ ispopup, setispopup }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
