import React, { useState, useEffect } from 'react';

// Import our decoupled Modules (Strictly separated folders!)
import Login from './modules/auth/Login';
import TabBar from './components/TabBar';
import Sidebar from './components/Sidebar';
import SetupEngine from './modules/setup/SetupEngine';
import EmployeeManagement from './modules/hr/EmployeeManagement';
import EmployeeInformation from './modules/hr/EmployeeInformation';

// Central Master Lookup Database Dictionary (32 setups)
const SETUP_CONFIGS = {
  department: { name: 'Department', fields: ['id', 'code', 'name', 'status'] },
  designation: { name: 'Designation', fields: ['id', 'code', 'name', 'status'] },
  shift: { name: 'Shift', fields: ['id', 'code', 'name', 'status'] },
  unit: { name: 'Unit', fields: ['id', 'code', 'name', 'status'] },
  employee_type: { name: 'Employee Type', fields: ['id', 'code', 'name', 'status'] },
  leave_type: { name: 'Leave Type', fields: ['id', 'code', 'name', 'status'] },
  buyer_department: { name: 'Buyer Department', fields: ['id', 'code', 'name', 'status'] },
  style: { name: 'Style', fields: ['id', 'code', 'name', 'status'] },
  color: { name: 'Color', fields: ['id', 'code', 'name', 'status'] },
  machine: { name: 'Machine', fields: ['id', 'code', 'name', 'status'] },
  line: { name: 'Line', fields: ['id', 'code', 'name', 'status'] },
  team: { name: 'Team', fields: ['id', 'code', 'name', 'status'] },
  wash_type: { name: 'Wash Type', fields: ['id', 'code', 'name', 'status'] },
  factory: { name: 'Factory', fields: ['id', 'code', 'name', 'status'] },
  recipe_type: { name: 'Recipe Type', fields: ['id', 'code', 'name', 'status'] },
  recipe_approved: { name: 'Recipe Approved', fields: ['id', 'code', 'name', 'status'] },
  order_type: { name: 'Order Type', fields: ['id', 'code', 'name', 'status'] },
  chemical: { name: 'Chemical', fields: ['id', 'code', 'name', 'status'] },
  company: { name: 'Company', fields: ['id', 'code', 'name', 'status'] },
  buyer: { name: 'Buyer', fields: ['id', 'code', 'name', 'status'] },
  holiday: { name: 'Holiday', fields: ['id', 'code', 'name', 'status'] },
  status: { name: 'Status', fields: ['id', 'code', 'name', 'status'] },
  dry_wash_type: { name: 'Dry / Wash Type', fields: ['id', 'code', 'name', 'status'] },
  root_sequence: { name: 'Root Sequence', fields: ['id', 'code', 'name', 'status'] },
  SpWash: { name: 'Sp Wash', fields: ['id', 'code', 'name', 'status'] },
  fabric_type: { name: 'Fabric Type', fields: ['id', 'code', 'name', 'status'] },
  garments_item: { name: 'Garments Item', fields: ['id', 'code', 'name', 'status'] },
  uom: { name: 'Unit of Measurement', fields: ['id', 'code', 'name', 'status'] },
  supplier_vendor: { name: 'Supplier / Vendor', fields: ['id', 'code', 'name', 'status'] },
  wash_shade: { name: 'Wash Shade', fields: ['id', 'code', 'name', 'status'] },
  buyer_brand: { name: 'Buyer Brand', fields: ['id', 'code', 'name', 'status'] },
  destination_country: { name: 'Destination Country', fields: ['id', 'code', 'name', 'status'] },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState('');
  const [pinnedItems, setPinnedItems] = useState([]);
  const [activeEditingEmployee, setActiveEditingEmployee] = useState(null);

  // DECOUPLED SECURE LOGOUT SYSTEM ACTION (HOISTED AT THE TOP OF THE BODY!)
  function handleLogout() {
    setIsLoggedIn(false);
    setTabs([]); // Resets active workspace tabs safely
    setActiveEditingEmployee(null); // Resets any pending profile edit states
  }

  // Global State Database (Setup Records + Isolated HR employees table)
  const [savedRecords, setSavedRecords] = useState({
    department: [
      { id: 1718001, data: { id: 1, code: 'Dept-HR', name: 'Human Resources', status: 'Active' }, createdAt: new Date().toLocaleString() },
      { id: 1718002, data: { id: 2, code: 'Dept-PROD', name: 'Production', status: 'Active' }, createdAt: new Date().toLocaleString() }
    ],
    designation: [
      { id: 1718101, data: { id: 1, code: 'Desg-MD', name: 'Managing Director', status: 'Active' }, createdAt: new Date().toLocaleString() },
      { id: 1718102, data: { id: 2, code: 'Desg-WASH', name: 'Wash Operator', status: 'Active' }, createdAt: new Date().toLocaleString() }
    ],
    shift: [
      { id: 1718201, data: { id: 1, code: 'Shift-A', name: 'Morning Shift (A)', status: 'Active' }, createdAt: new Date().toLocaleString() }
    ],
    unit: [
      { id: 1718301, data: { id: 1, code: 'Unit-01', name: 'Factory Production Unit A', status: 'Active' }, createdAt: new Date().toLocaleString() }
    ],
    employee_type: [
      { id: 1718401, data: { id: 1, code: 'Type-Perm', name: 'Permanent', status: 'Active' }, createdAt: new Date().toLocaleString() }
    ], 
    leave_type: [], buyer_department: [], style: [], color: [],
    machine: [], line: [], team: [], wash_type: [], factory: [], recipe_type: [],
    recipe_approved: [], order_type: [], chemical: [], company: [], buyer: [], holiday: [], status: [],
    dry_wash_type: [], root_sequence: [], SpWash: [],
    fabric_type: [], garments_item: [], uom: [], supplier_vendor: [], wash_shade: [], buyer_brand: [], destination_country: [],
    
    // Dedicated Employees Archive
    employees: [
      {
        id: 1,
        data: {
          empId: "EMP-0001",
          firstName: "Mohammad",
          lastName: "Rahman",
          email: "rahman@smartex.com",
          phone: "01712345678",
          joiningDate: "2026-01-15",
          department: "Human Resources",
          designation: "Managing Director",
          shift: "Morning Shift (A)",
          empType: "Permanent",
          status: "Active"
        }
      }
    ]
  });

  const [passwordFields, setPasswordFields] = useState({ username: 'admin@erp.com', oldPassword: '', newPassword: '', confirmPassword: '' });
  const [supportMessage, setSupportMessage] = useState('');

  // Load local cache config on mount
  useEffect(() => {
    const savedPins = localStorage.getItem('erp_pinned_items');
    const savedData = localStorage.getItem('erp_saved_records');
    if (savedPins) setPinnedItems(JSON.parse(savedPins));
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (!parsed.employees) parsed.employees = [];
        setSavedRecords(parsed);
      } catch (err) {
        console.error("Localstorage schema migration failed...", err);
      }
    }
  }, []);

  const updatePinnedItems = (newPins) => {
    setPinnedItems(newPins);
    localStorage.setItem('erp_pinned_items', JSON.stringify(newPins));
  };

  const updateSavedRecords = (newData) => {
    setSavedRecords(newData);
    localStorage.setItem('erp_saved_records', JSON.stringify(newData));
  };

  const togglePin = (setupKey, e) => {
    e.stopPropagation();
    const updated = pinnedItems.includes(setupKey) ? pinnedItems.filter((k) => k !== setupKey) : [...pinnedItems, setupKey];
    updatePinnedItems(updated);
  };

  // STANDARD HOISTED FUNCTION DECLARATIONS (SOLVES ALL REFERENCE ERRORS)
  function openListTab(setupKey) {
    const tabId = `tab-${setupKey}`;
    const setupInfo = SETUP_CONFIGS[setupKey];
    const isHrModule = setupKey.startsWith('hr-');

    const hrTitles = {
      'hr-employee_profile': 'Employee Profile',
      'hr-employee_info': 'Employee Information',
      'hr-attendance_shift': 'Attendance & Shift Management',
      'hr-leave_mgt': 'Leave Management',
      'hr-payroll_processing': 'Payroll Processing & Pay Slip',
      'hr-overtime': 'Overtime',
      'hr-recruitment_joining': 'Recruitment & Joining Process',
      'hr-training_skill': 'Training & Skill Development',
      'hr-id_card': 'ID Card Generate',
      'hr-termination_settlement': 'Termination & Final Settlement',
    };

    const existingTab = tabs.find((t) => t.id === tabId);
    if (!existingTab) {
      setTabs([
        ...tabs,
        { 
          id: tabId, 
          title: isHrModule ? (hrTitles[setupKey] || 'HR Module') : (setupInfo ? setupInfo.name : setupKey), 
          type: isHrModule ? 'hr_module' : (setupInfo ? 'setup' : 'generic_module'), 
          setupKey 
        },
      ]);
    }
    setActiveTabId(tabId);
  }

  // DECOUPLED INDEPENDENT WORKSPACE GENERATOR FOR EDITING TARGETS NAMED WITH EMP ID
  function openEmployeeEditTab(employeeRecord) {
    const empIdVal = employeeRecord.data.empId;
    const tabId = `tab-hr-employee_edit-${empIdVal}`;

    const existingTab = tabs.find((t) => t.id === tabId);
    if (!existingTab) {
      setTabs([
        ...tabs,
        {
          id: tabId,
          title: empIdVal, // Tab title is exactly the Employee ID! (e.g. EMP-0001)
          type: 'hr_employee_edit',
          setupKey: employeeRecord.id // Store the master database row ID as the key!
        }
      ]);
    }
    setActiveTabId(tabId);
  }

  function openFormTab(setupKey, e) {
    if (e) e.stopPropagation();
    const tabId = `tab-${setupKey}`;
    const setupInfo = SETUP_CONFIGS[setupKey];
    if (!setupInfo) return;

    const existingTab = tabs.find((t) => t.id === tabId);
    if (!existingTab) {
      setTabs([...tabs, { id: tabId, title: setupInfo.name, type: 'setup', setupKey, viewMode: 'form' }]);
    } else {
      setTabs(tabs.map((t) => (t.id === tabId ? { ...t, viewMode: 'form' } : t)));
    }
    setActiveTabId(tabId);
  }

  function openPasswordTab() {
    const tabId = 'change-password-tab';
    const existingTab = tabs.find((t) => t.id === tabId);
    if (!existingTab) {
      setTabs([...tabs, { id: tabId, title: 'Change Password', type: 'password-change' }]);
    }
    setActiveTabId(tabId);
  }

  function openHelpSupportTab() {
    const tabId = 'help-support-tab';
    const existingTab = tabs.find((t) => t.id === tabId);
    if (!existingTab) {
      setTabs([...tabs, { id: tabId, title: 'Help & Support', type: 'help-support' }]);
    }
    setActiveTabId(tabId);
  }

  // GLOBAL SYSTEM COMPONENT FORM HANDLERS
  const handlePasswordSaveSubmit = (e) => {
    e.preventDefault();
    alert("Password updated successfully!");
    closeTab('change-password-tab', e);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    alert("Technical support ticket submitted successfully!");
    setSupportMessage('');
    closeTab('help-support-tab', e);
  };

  // MASTER DATA ACTION WORKSPACE
  const saveExternalRecord = (setupKey, recordInputs) => {
    const currentRecords = savedRecords[setupKey] || [];
    const existingIndex = currentRecords.findIndex((r) => r.data.id === recordInputs.id);
    let updatedRecords;
    if (existingIndex > -1) {
      const copy = [...currentRecords];
      copy[existingIndex] = { ...copy[existingIndex], data: recordInputs, updatedAt: new Date().toLocaleString() };
      updatedRecords = { ...savedRecords, [setupKey]: copy };
    } else {
      updatedRecords = { ...savedRecords, [setupKey]: [...currentRecords, { id: Date.now(), data: recordInputs, createdAt: new Date().toLocaleString() }] };
    }
    updateSavedRecords(updatedRecords);
  };

  const deleteExternalRecord = (setupKey, recordId) => {
    const currentRecords = savedRecords[setupKey] || [];
    const updatedList = currentRecords.filter((r) => r.data.id !== recordId);
    updateSavedRecords({ ...savedRecords, [setupKey]: updatedList });
  };

  // DEDICATED HR STATE MANAGERS
  const saveEmployeeProfile = (employeeData) => {
    const currentList = savedRecords.employees || [];
    const existingIndex = currentList.findIndex((r) => r.id === employeeData.id);
    let updatedList;
    if (existingIndex > -1) {
      const copy = [...currentList];
      copy[existingIndex] = { ...copy[existingIndex], data: employeeData, updatedAt: new Date().toLocaleString() };
      updatedList = copy;
    } else {
      updatedList = [...currentList, { id: employeeData.id, data: employeeData, createdAt: new Date().toLocaleString() }];
    }
    updateSavedRecords({ ...savedRecords, employees: updatedList });
  };

  const deleteEmployeeProfile = (id) => {
    const filtered = (savedRecords.employees || []).filter(r => r.id !== id);
    updateSavedRecords({ ...savedRecords, employees: filtered });
  };

  const handleEditEmployeeFromDirectory = (employeeRecord) => {
    setActiveEditingEmployee(employeeRecord);
    openEmployeeEditTab(employeeRecord); // Triggers Edit Tab directly!
  };

  const closeTab = (tabId, e) => {
    if (e) e.stopPropagation();
    const remaining = tabs.filter((t) => t.id !== tabId);
    setTabs(remaining);

    if (activeTabId === tabId) {
      setActiveTabId(remaining[remaining.length - 1]?.id || '');
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        .tab-bar-container::-webkit-scrollbar { display: none !important; }
        .tab-bar-container { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      <Sidebar 
        onLogout={handleLogout} 
        onChangePasswordClick={openPasswordTab}
        onOpenListTab={openListTab}
        onOpenFormTab={openFormTab}
        onHelpSupportClick={openHelpSupportTab}
        currentActiveTabId={activeTabId}
        pinnedItems={pinnedItems}
        onTogglePin={togglePin}
      />

      <main style={styles.workspace}>
        <TabBar 
          tabs={tabs} 
          activeTabId={activeTabId} 
          onSelectTab={(id) => setActiveTabId(id)} 
          onCloseTab={closeTab} 
        />

        <div style={styles.contentBody}>
          {tabs.map((tab) => {
            if (tab.id !== activeTabId) return null;

            // 1. DEDICATED DYNAMIC REGISTERED EMPLOYEE EDIT TAB ROUTER! (WITH DETAILED IN-FORM DELETION BINDING!)
            if (tab.type === 'hr_employee_edit') {
              const empRecord = (savedRecords.employees || []).find(e => e.id === tab.setupKey);
              return (
                <EmployeeManagement
                  key={tab.id}
                  records={savedRecords.employees || []}
                  setupRecords={savedRecords}
                  activeEditingEmployee={empRecord}
                  onSaveEmployee={saveEmployeeProfile}
                  onDeleteEmployee={(id) => {
                    deleteEmployeeProfile(id); // Deletes record in database
                    closeTab(tab.id); // Autoclose active editing tab instantly!
                  }}
                />
              );
            }

            if (tab.type === 'generic_module') {
              return (
                <div key={tab.id} style={{ padding: '24px', backgroundColor: '#e0e0e0', minHeight: 'calc(100vh - 120px)' }}>
                  <div style={styles.formCard}>
                    <h2 style={styles.formCardTitle}>{tab.title} Operational Workspace</h2>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>The enterprise system operation dashboard is currently pending live integration.</p>
                  </div>
                </div>
              );
            }

            if (tab.type === 'password-change') {
              return (
                <div key={tab.id} style={styles.formLayoutSingle}>
                  <div style={styles.formCard}>
                    <h2 style={styles.formCardTitle}>Modify Account Access Keys</h2>
                    <form onSubmit={handlePasswordSaveSubmit} style={styles.formElement}>
                      <div style={styles.formGroup}><label style={styles.formLabel}>User Name / ID</label><input type="text" required style={styles.formInput} value={passwordFields.username} onChange={(e) => setPasswordFields({ ...passwordFields, username: e.target.value })} /></div>
                      <div style={styles.formGroup}><label style={styles.formLabel}>Old Password</label><input type="password" required placeholder="Input current security key" style={styles.formInput} value={passwordFields.oldPassword} onChange={(e) => setPasswordFields({ ...passwordFields, oldPassword: e.target.value })} /></div>
                      <div style={styles.formGroup}><label style={styles.formLabel}>New Password</label><input type="password" required placeholder="Input new complex password" style={styles.formInput} value={passwordFields.newPassword} onChange={(e) => setPasswordFields({ ...passwordFields, newPassword: e.target.value })} /></div>
                      <button type="submit" style={styles.saveButton}>Verify & Update Credentials</button>
                    </form>
                  </div>
                </div>
              );
            }

            if (tab.type === 'help-support') {
              return (
                <div key={tab.id} style={styles.formLayoutSingle}>
                  <div style={styles.formCard}>
                    <h2 style={styles.formCardTitle}>Technical Support Request</h2>
                    <form onSubmit={handleSupportSubmit} style={styles.formElement}>
                      <div style={styles.formGroup}><label style={styles.formLabel}>Active User ID</label><input type="text" readOnly style={{ ...styles.formInput, backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }} value="admin@erp.com" /></div>
                      <div style={styles.formGroup}><label style={styles.formLabel}>Explain Your Issue / Query</label><textarea required rows={6} placeholder="Describe the problem..." style={{ ...styles.formInput, fontFamily: 'inherit', resize: 'vertical' }} value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} /></div>
                      <button type="submit" style={styles.saveButton}>Secure Submit Ticket</button>
                    </form>
                  </div>
                </div>
              );
            }

            if (tab.type === 'hr_module') {
              if (tab.setupKey === 'hr-employee_profile') {
                return (
                  <EmployeeManagement
                    key={tab.id}
                    records={savedRecords.employees || []}
                    setupRecords={savedRecords}
                    activeEditingEmployee={null}
                    onSaveEmployee={saveEmployeeProfile}
                  />
                );
              }
              if (tab.setupKey === 'hr-employee_info') {
                return (
                  <EmployeeInformation
                    key={tab.id}
                    records={savedRecords.employees || []}
                    onEditEmployee={handleEditEmployeeFromDirectory}
                    onDeleteEmployee={deleteEmployeeProfile}
                  />
                );
              }
              return (
                <div key={tab.id} style={{ padding: '24px', backgroundColor: '#e0e0e0', minHeight: 'calc(100vh - 120px)' }}>
                  <div style={styles.formCard}>
                    <h2 style={styles.formCardTitle}>HR & Payroll — {tab.title}</h2>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>The <strong>{tab.title}</strong> operational module is successfully integrated into the SmarTex HR & Payroll core.</p>
                  </div>
                </div>
              );
            }

            if (tab.type === 'setup' && tab.setupKey) {
              const records = savedRecords[tab.setupKey] || [];
              return (
                <SetupEngine
                  key={tab.id}
                  setupKey={tab.setupKey}
                  records={records}
                  onSaveRecord={(inputs) => saveExternalRecord(tab.setupKey, inputs)}
                  onDeleteRecord={(id) => deleteExternalRecord(tab.setupKey, id)}
                />
              );
            }
            return null;
          })}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', width: '100vw', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#e0e0e0', overflow: 'hidden' },
  workspace: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#e0e0e0' },
  contentBody: { flex: 1, padding: '0px', overflowY: 'auto' }, // 0px Padding around table to keep it fully flush!
  formCard: { backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '6px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
  formCardTitle: { margin: '0 0 16px 0', fontSize: '13.5px', color: '#0f172a', fontWeight: '600' },
  formElement: { display: 'flex', flexDirection: 'column', gap: '12px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  formLabel: { fontSize: '11.5px', fontWeight: '500', color: '#475569' },
  formInput: { padding: '6px 10px', fontSize: '12.5px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none', color: '#0f172a', backgroundColor: '#fbfbfb', width: '100%', boxSizing: 'border-box' },
  saveButton: { backgroundColor: '#0f172a', color: '#ffffff', border: 'none', padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', marginTop: '6px' },
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
  },
};