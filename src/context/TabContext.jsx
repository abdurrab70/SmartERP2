// src/context/TabContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [openActiveTabs, setOpenActiveTabs] = useState(() => {
    const saved = localStorage.getItem('erp_open_tabs');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentActiveTabId, setCurrentActiveTabId] = useState(() => {
    return localStorage.getItem('erp_active_tab_id') || null;
  });

  useEffect(() => {
    localStorage.setItem('erp_open_tabs', JSON.stringify(openActiveTabs));
  }, [openActiveTabs]);

  useEffect(() => {
    if (currentActiveTabId) {
      localStorage.setItem('erp_active_tab_id', currentActiveTabId);
    } else {
      localStorage.removeItem('erp_active_tab_id');
    }
  }, [currentActiveTabId]);

  const openNewTab = (id, title) => {
    if (!openActiveTabs.some((tab) => tab.id === id)) {
      setOpenActiveTabs([...openActiveTabs, { id, title }]);
    }
    setCurrentActiveTabId(id);
  };

  const closeTab = (id) => {
    const remaining = openActiveTabs.filter((tab) => tab.id !== id);
    setOpenActiveTabs(remaining);
    if (currentActiveTabId === id) {
      if (remaining.length > 0) {
        setCurrentActiveTabId(remaining[remaining.length - 1].id);
      } else {
        setCurrentActiveTabId(null);
      }
    }
  };

  return (
    <TabContext.Provider
      value={{
        openActiveTabs,
        currentActiveTabId,
        setCurrentActiveTabId,
        openNewTab,
        closeTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
