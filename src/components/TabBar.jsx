import React from 'react';

export default function TabBar({ tabs = [], activeTabId, onSelectTab, onCloseTab }) {
  // FIXED: SOLVED 'tabs is not defined' ReferenceError instantly
  if (!tabs || tabs.length === 0) return null;

  return (
    <div style={styles.tabBar} className="tab-bar-container">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            /* DEEPLY COMPACT ZERO GAP FOLDER TAB DESIGN WITH SHARP BORDERS */
            style={{
              ...styles.tabLink,
              backgroundColor: isActive ? '#fbfbfb' : '#ededed',
              color: isActive ? '#0f172a' : '#64748b',
              fontWeight: isActive ? '700' : '500',
              paddingLeft: '16px',
              paddingRight: '12px',
              border: '1px solid #cbd5e1',
              borderBottom: isActive ? '2.5px solid #ea580c' : '1px solid #cbd5e1',
              marginRight: '-1px',
              borderRadius: '0px'
            }}
          >
            <span>{tab.title}</span>

            {/* NATIVE SVG CLOSE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents selection trigger
                onCloseTab(tab.id, e);
              }}
              style={styles.closeBtn}
              title={`Close ${tab.title}`}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  tabBar: { 
    display: 'flex', 
    backgroundColor: '#ededed', 
    borderBottom: '1px solid #cbd5e1', 
    padding: '0px', 
    gap: '0px', 
    overflowX: 'auto', 
    overflowY: 'hidden',
    height: '40px',
    boxSizing: 'border-box'
  },
  tabLink: { display: 'flex', alignItems: 'center', gap: '6px', border: 'none', fontSize: '11.5px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease', height: '40px', lineHeight: '40px', borderRadius: '0px', marginLeft: '0px' },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#94a3b8',
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.15s ease',
    lineHeight: '1',
    fontWeight: 'bold',
  }
};