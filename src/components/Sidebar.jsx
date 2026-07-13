import React, { useState, useContext, useEffect, useRef } from 'react';
import { TabContext } from '../context/TabContext';

// Import Official FontAwesome React Components & Icons directly
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

// Native Icons Helper (Guarantees zero compilation/dependency crashes)
const Icons = {
  logo: () => (
    <svg
      className="w-5 h-5 text-slate-800"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  myMenu: () => (
    <svg className="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  setup: () => (
    <svg
      className="w-4 h-4 text-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  hrAdmin: () => (
    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  inventory: () => (
    <svg
      className="w-4 h-4 text-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  work: () => (
    <svg
      className="w-4 h-4 text-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10l8 4 8-4z" />
      <path d="M2 10L10 5l8 5" />
    </svg>
  ),
  sales: () => (
    <svg
      className="w-4 h-4 text-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  thumbtack: (isPinned) => (
    <span style={{ color: isPinned ? '#ea580c' : '#94a3b8', marginRight: '6px', display: 'inline-flex', alignItems: 'center' }} className={isPinned ? "text-[#ea580c]" : "text-slate-400"}>
      <FontAwesomeIcon icon={faThumbtack} />
    </span>
  ),
  chevronRight: () => (
    <svg
      className="w-2.5 h-2.5 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  chevronUp: () => (
    <svg
      className="w-2.5 h-2.5 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  // LOCKED NATIVE OUTLINE DOCUMENT ICON
  plus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      fill="currentColor"
      style={{
        width: '20px', 
        height: '20px', 
        display: 'inline-block',
        flexShrink: 0,
        cursor: 'pointer'
      }}
      className="text-slate-500 hover:text-[#ea580c] transition-colors duration-150"
    >
      <path d="M304 112L192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L448 528C456.8 528 464 520.8 464 512L464 272L376 272C336.2 272 304 239.8 304 200L304 112zM444.1 224L352 131.9L352 200C352 213.3 362.7 224 376 224L444.1 224zM128 128C128 92.7 156.7 64 192 64L325.5 64C342.5 64 358.8 70.7 370.8 82.7L493.3 205.3C505.3 217.3 512 233.6 512 250.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128z" />
    </svg>
  ),
  key: () => (
    <svg
      className="w-4 h-4 text-slate-500 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  logout: () => (
    <svg
      className="w-4 h-4 text-rose-700 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  expand: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#475569' }}>
      <path d="M15 3h6v6M9 21H3v-6M21 9V3h-6M3 15v6h6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  minimize: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#475569' }}>
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
    </svg>
  ),
  support: () => (
    <svg className="w-4 h-4 text-slate-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
};

const setupItemsLocal = [
  { id: 'setup-buyer', title: 'Buyer' },
  { id: 'setup-buyer_brand', title: 'Buyer Brand' },
  { id: 'setup-buyer_department', title: 'Buyer Department' },
  { id: 'setup-chemical', title: 'Chemical' },
  { id: 'setup-color', title: 'Color' },
  { id: 'setup-company', title: 'Company' },
  { id: 'setup-department', title: 'Department' },
  { id: 'setup-designation', title: 'Designation' },
  { id: 'setup-destination_country', title: 'Destination Country' },
  { id: 'setup-dry_wash_type', title: 'Dry / Wash Type' },
  { id: 'setup-employee_type', title: 'Employee Type' },
  { id: 'setup-fabric_type', title: 'Fabric Type' },
  { id: 'setup-factory', title: 'Factory' },
  { id: 'setup-garments_item', title: 'Garments Item' },
  { id: 'setup-holiday', title: 'Holiday' },
  { id: 'setup-leave_type', title: 'Leave Type' },
  { id: 'setup-line', title: 'Line' },
  { id: 'setup-machine', title: 'Machine' },
  { id: 'setup-order_type', title: 'Order Type' },
  { id: 'setup-recipe_approved', title: 'Recipe Approved' },
  { id: 'setup-recipe_type', title: 'Recipe Type' },
  { id: 'setup-root_sequence', title: 'Root Sequence' },
  { id: 'setup-shift', title: 'Shift' },
  { id: 'setup-SpWash', title: 'Sp Wash' },
  { id: 'setup-status', title: 'Status' },
  { id: 'setup-style', title: 'Style' },
  { id: 'setup-supplier_vendor', title: 'Supplier / Vendor' },
  { id: 'setup-team', title: 'Team' },
  { id: 'setup-unit', title: 'Unit' },
  { id: 'setup-uom', title: 'Unit of Measurement' },
  { id: 'setup-wash_shade', title: 'Wash Shade' },
  { id: 'setup-wash_type', title: 'Wash Type' },
];

const getThreeColumnSetup = (items) => {
  const col1 = [
    'setup-company', 'setup-factory', 'setup-department', 'setup-designation', 
    'setup-shift', 'setup-unit', 'setup-line', 'setup-team', 'setup-status', 'setup-SpWash', 'setup-uom'
  ];
  const col2 = [
    'setup-employee_type', 'setup-leave_type', 'setup-buyer', 'setup-buyer_department', 
    'setup-style', 'setup-color', 'setup-machine', 'setup-wash_type', 
    'setup-dry_wash_type', 'setup-root_sequence', 'setup-garments_item'
  ];
  const col3_materials = [
    'setup-chemical', 'setup-holiday', 'setup-order_type', 'setup-supplier_vendor', 'setup-wash_shade', 'setup-buyer_brand', 'setup-destination_country'
  ];
  const col3_recipes = [
    'setup-recipe_type', 'setup-recipe_approved', 'setup-fabric_type'
  ];

  return [
    [
      { name: "Definitions", items: items.filter(item => col1.includes(item.id)).sort((a, b) => a.title.localeCompare(b.title)) }
    ],
    [
      { name: "Operational Setup", items: items.filter(item => col2.includes(item.id)).sort((a, b) => a.title.localeCompare(b.title)) }
    ],
    [
      { name: "Materials & Chemistry", items: items.filter(item => col3_materials.includes(item.id)).sort((a, b) => a.title.localeCompare(b.title)) },
      { name: "Recipe Engineering", items: items.filter(item => col3_recipes.includes(item.id)).sort((a, b) => a.title.localeCompare(b.title)) }
    ]
  ];
};

const hrItemsLocal = [
  { id: 'hr-employee_profile', title: 'Employee Profile' },
  { id: 'hr-employee_info', title: 'Employee Information' }, // ADDED NEW DIRECTORY SUBMODULE
  { id: 'hr-attendance_shift', title: 'Attendance & Shift Management' },
  { id: 'hr-leave_mgt', title: 'Leave Management' },
  { id: 'hr-payroll_processing', title: 'Payroll Processing & Pay Slip' },
  { id: 'hr-overtime', title: 'Overtime' },
  { id: 'hr-recruitment_joining', title: 'Recruitment & Joining Process' },
  { id: 'hr-training_skill', title: 'Training & Skill Development' },
  { id: 'hr-id_card', title: 'ID Card Generate' },
  { id: 'hr-termination_settlement', title: 'Termination & Settlement (Final Payment)' }
];

export default function Sidebar({ 
  onLogout, 
  onChangePasswordClick, 
  onOpenListTab, 
  onOpenFormTab, 
  onHelpSupportClick,
  currentActiveTabId,
  pinnedItems = [],
  onTogglePin 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState(null); 
  const [popoverTop, setPopoverTop] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sidebarRef = useRef(null);

  // ADVANCED CLICK-ANYWHERE-TO-CLOSE POPUP EVENT
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOnModuleButton = event.target.closest('.module-trigger-btn');
      const clickedInsidePopover = event.target.closest('.flyout-popover-card');
      
      if (!clickedInsidePopover && !clickedOnModuleButton) {
        setActivePopoverId(null);
      }
      
      const clickedInsideUserSection = event.target.closest('.user-section-container');
      if (!clickedInsideUserSection) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // LISTEN TO BROWSER ESC FULLSCREEN EXIT EVENT
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const modules = [
    {
      id: 'my-menu',
      title: 'My Menu',
      icon: Icons.myMenu,
      items: pinnedItems.map(key => {
        const isHr = key.startsWith('hr-');
        if (isHr) {
          const match = hrItemsLocal.find(item => item.id === key);
          return {
            id: key,
            title: match ? match.title : key
          };
        } else {
          const match = setupItemsLocal.find(item => item.id === `setup-${key}`);
          return {
            id: `setup-${key}`,
            title: match ? match.title : key
          };
        }
      })
    },
    {
      id: 'setup',
      title: 'Setup & Controls',
      icon: Icons.setup,
      items: setupItemsLocal
    },
    {
      id: 'hr-payroll',
      title: 'HR & Payroll Management',
      icon: Icons.hrAdmin,
      items: hrItemsLocal
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Icons.inventory,
      items: [{ id: 'inventory-stock', title: 'View Stock' }],
    },
    {
      id: 'work',
      title: 'Work and Management',
      icon: Icons.work,
      items: [{ id: 'work-production', title: 'Production Management' }],
    },
    {
      id: 'sales',
      title: 'Sales & Invoicing',
      icon: Icons.sales,
      items: [{ id: 'sales-invoice', title: 'Invoices' }],
    },
  ];

  const handleModuleClick = (modId, event) => {
    event.stopPropagation();
    
    // CALCULATE DYNAMIC VERTICAL PIXEL OFFSET FROM CLICKED MODULE ROW
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const relativeTop = buttonRect.top - sidebarRect.top;
    
    setPopoverTop(relativeTop);
    setActivePopoverId((prev) => (prev === modId ? null : modId));
  };

  // Find currently open flyout module mapping
  const activeMod = modules.find(m => m.id === activePopoverId);

  // ALPHABETICALLY SORTED POPUP ITEMS CAPTURED IN THE TOP LEVEL OF SCOPE TO PREVENT UNDEFINED ERROR
  const activeSortedItems = activeMod && activeMod.items 
    ? [...activeMod.items].sort((a, b) => a.title.localeCompare(b.title)) 
    : [];

  const useThreeColumns = activeSortedItems.length > 12;

  // DYNAMIC COMPACT COLUMN BALANCING ENGINE (Slices any amount of items mathematically into 3 balanced columns)
  const itemsPerColumn = Math.ceil(activeSortedItems.length / 3);
  const col1 = activeSortedItems.slice(0, itemsPerColumn);
  const col2 = activeSortedItems.slice(itemsPerColumn, itemsPerColumn * 2);
  const col3 = activeSortedItems.slice(itemsPerColumn * 2);
  const columns = [col1, col2, col3];

  // UNIQUE PIN SYNC VALIDATOR (ONLY FOR MASTER SETUP PARAMS, MY MENU & HR & PAYROLL MODULE!)
  const showPinIcon = activeMod && (activeMod.id === 'setup' || activeMod.id === 'my-menu' || activeMod.id === 'hr-payroll');

  return (
    <aside
      ref={sidebarRef}
      className={`h-screen bg-[#e0e0e0] text-slate-800 border-r-2 border-[#cbd5e1] flex flex-col transition-all duration-300 ease-in-out shrink-0 select-none relative z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* 100% VISIBLE INTERNALLY ALIGNED 3-DOT TOGGLE CONTROLLER */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsCollapsed(!isCollapsed);
          setActivePopoverId(null);
        }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '8px', // Positioned safely inside the sidebar (no clipping)
          transform: 'translateY(-50%)',
          width: '12px',
          height: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: 99999,
          padding: 0,
        }}
        className="hover:scale-125 transition-transform"
        title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar Menu"}
      >
        <span style={{ width: '5px', height: '5px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'block', flexShrink: 0 }}></span>
        <span style={{ width: '5px', height: '5px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'block', flexShrink: 0 }}></span>
        <span style={{ width: '5px', height: '5px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'block', flexShrink: 0 }}></span>
      </button>

      {/* 1. Header Logo & Branding */}
      <div
        className="h-16 flex items-center justify-between px-4 border-b border-[#cbd5e1] overflow-hidden shrink-0 select-none bg-[#cbd5e1]"
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between w-full">
            <span 
              onClick={() => setIsCollapsed(true)} 
              className="ml-2 text-[19px] text-slate-900 truncate font-bold select-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span>Smart</span>
              <span className="text-[#ea580c]">Tex</span>
            </span>
            {/* FULLSCREEN TOGGLE BUTTON RESTORED AND SECURED NEXT TO THE TEXT */}
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-[#cbd5e1] rounded transition-all flex items-center justify-center cursor-pointer ml-1 shrink-0"
              style={{ background: 'none', border: 'none' }}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? Icons.minimize() : Icons.expand()}
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setIsCollapsed(false)} 
            className="w-full flex justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[#ea580c] font-bold text-lg select-none">T</span>
          </div>
        )}
      </div>

      {/* 2. Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2 scrollbar-none relative">
        {modules.map((mod) => {
          const isOpenedPopover = activePopoverId === mod.id;

          return (
            <div key={mod.id} className="relative">
              {/* Main Module Trigger (WITH SOPHISTICATED SOFT BRAND-ORANGE ACTIVE STYLE) */}
              <button
                onClick={(e) => handleModuleClick(mod.id, e)}
                className={`module-trigger-btn w-full flex items-center justify-between rounded-lg transition-all font-bold text-xs select-none py-2.5 px-3 relative ${
                  isOpenedPopover 
                    ? 'bg-[#ffedd5] text-[#ea580c]' 
                    : 'text-slate-800 hover:text-black hover:bg-[#dcdcdc]/60'
                }`}
              >
                <div className="flex items-center min-w-0">
                  {mod.icon()}
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{mod.title}</span>
                  )}
                </div>
                {!isCollapsed && Icons.chevronRight()}

                {/* SOLID WHITE TRIANGLE INDICATOR MERGING BUTTON TO THE FLYOUT DRAWER */}
                {isOpenedPopover && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-white z-50"></div>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* 3. Account Settings Footer */}
      <div className="p-3 border-t border-[#cbd5e1] bg-[#dcdcdc]/30 relative shrink-0 z-50">
        <button
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="user-section-container w-full flex items-center hover:bg-[#cbd5e1]/50 rounded-lg transition-all text-left p-2 justify-between"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#e5e5e5] border border-[#cbd5e1] text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              A
            </div>
            {!isCollapsed && (
              <span className="text-xs font-bold text-slate-800 truncate animate-in fade-in duration-300">
                admin
              </span>
            )}
          </div>
          {!isCollapsed && Icons.chevronUp()}
        </button>

        {showUserDropdown && (
          <div className="absolute bottom-full left-3 mb-2 w-56 bg-white border border-[#cbd5e1] rounded-xl shadow-lg py-2 z-50 text-slate-800">
            <button
              onClick={() => {
                onChangePasswordClick && onChangePasswordClick();
                setShowUserDropdown(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#e9ecef] flex items-center transition-colors font-medium text-slate-700"
            >
              {Icons.key()} Change Password
            </button>
            <div className="border-t border-[#cbd5e1] my-1"></div>
            {/* Help & Support (FULLY CONNECTED & ACTIVE) */}
            <button
              onClick={() => {
                onHelpSupportClick && onHelpSupportClick(); // Successfully linked!
                setShowUserDropdown(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#e9ecef] flex items-center transition-colors font-medium text-slate-700"
            >
              {Icons.support()} Help & Support
            </button>
            <div className="border-t border-[#cbd5e1] my-1"></div>
            {/* Log Out (FULLY CONNECTED & ACTIVE) */}
            <button
              onClick={() => {
                onLogout && onLogout(); // Successfully linked!
                setShowUserDropdown(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs text-rose-700 hover:bg-rose-50 flex items-center transition-colors font-bold"
            >
              {Icons.logout()} Log Out
            </button>
          </div>
        )}
      </div>

      {/* FLOATING FLYOUT MODAL DRAWER - PERFECTLY ALIGNED VERTICALLY IN ALL SIDEBAR MODES */}
      {activeMod && (
        <div
          className="flyout-popover-card absolute bg-white border border-[#cbd5e1] flex flex-col z-[99999] animate-in fade-in slide-in-from-left-2 duration-200 rounded-none" // Removed rounded-xl & shadow-lg
          style={{ 
            width: useThreeColumns ? '720px' : '260px',
            height: 'auto', // DYNAMIC ADAPTIVE HEIGHT (COLLAPSES BEAUTIFULLY ACCORDING TO ITEM ROWS)
            position: 'absolute', // Parallel to the clicked module row
            top: `${popoverTop}px`, // Aligns perfectly parallel to the clicked module button (Sammantorale/Soja!)
            left: isCollapsed ? '74px' : '266px', // Aligns precisely with a 10px geometric floating gap!
          }}
        >
          {/* Flyout Header */}
          <div className="bg-[#f8fafc] px-5 py-4 border-b border-[#cbd5e1] flex items-center justify-between flex-shrink-0 rounded-none">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {activeMod.title} Directory
            </span>
          </div>

          {/* Flyout Grid Content - 100% NO SCROLLBARS */}
          <div className="bg-white flex-1 overflow-y-auto flex flex-col divide-y divide-slate-100 scrollbar-none rounded-none">
            {useThreeColumns ? (
              // 3-COLUMN UNIFIED SYSTEM WITH VERTICAL SEPARATING LINES, COMPLETELY BLANK OF HEADER LABELS
              <div className="grid grid-cols-3 divide-x divide-slate-200 bg-white flex-1 scrollbar-none rounded-none">
                {columns.map((columnItems, colIdx) => (
                  <div key={colIdx} className={`flex flex-col gap-0 ${colIdx > 0 ? 'pl-4' : ''} pr-1`}>
                    {columnItems.map((sub) => {
                      const setupKeyRaw = sub.id.replace('setup-', '');
                      // Check if this is an HR module sub-item to resolve correct Pin key!
                      const isHrModule = sub.id.startsWith('hr-');
                      const pinKey = isHrModule ? sub.id : setupKeyRaw;
                      const isActive = currentActiveTabId === sub.id || currentActiveTabId === `tab-${pinKey}`;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => {
                            onOpenListTab && onOpenListTab(pinKey);
                            setActivePopoverId(null);
                          }}
                          /* ADDS DELICATE TABLE SEPARATOR LINES, FLUSHED CORNERS, ORANGE BORDER GLOW & ULTRA-COMPACT PADDING */
                          className={`group flex items-center justify-between px-2.5 py-1 rounded-none border-b border-slate-200 hover:border-[#ea580c] transition-colors cursor-pointer text-slate-700 ${
                            isActive 
                              ? 'bg-[#ffedd5] text-[#ea580c] border-[#ea580c]' 
                              : '' // No hover bg, only border glow!
                          }`}
                        >
                          <div className="flex items-center min-w-0">
                            {/* PIN ICON - HIDDEN BY DEFAULT, FADES IN ON HOVER; ALWAYS VISIBLE IN ORANGE IF PINNED */}
                            {showPinIcon && (
                              <span 
                                className={pinnedItems.includes(pinKey) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-150'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTogglePin && onTogglePin(pinKey, e); // Dynamic pin state synchronizer with exact key
                                }}
                              >
                                {Icons.thumbtack(pinnedItems.includes(pinKey))}
                              </span>
                            )}
                            <span className="text-sm font-semibold truncate ml-1">
                              {sub.title}
                            </span>
                          </div>
                          
                          {/* RELIABLE INLINE SVG CLICKABLE FILE-ADD TRIGGERS WITH ORANGE HOVER EFFECT */}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenFormTab && onOpenFormTab(pinKey, e); // Clicking plus icon opens form directly
                              setActivePopoverId(null);
                            }}
                            style={{ flexShrink: 0 }}
                            className="flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          >
                            {Icons.plus()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              // Standard single column layout for smaller modules (LIKE MY MENU / HR & PAYROLL MODULE!) with dynamic auto-height
              <div className="flex flex-col gap-0 p-1 bg-white">
                {activeSortedItems.map((sub) => {
                  const setupKeyRaw = sub.id.replace('setup-', '');
                  // Check if this is an HR module sub-item to open correctly!
                  const isHrModule = sub.id.startsWith('hr-');
                  const targetKey = isHrModule ? sub.id : setupKeyRaw;
                  const isActive = currentActiveTabId === sub.id || currentActiveTabId === `tab-${targetKey}`;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        onOpenListTab && onOpenListTab(targetKey);
                        setActivePopoverId(null);
                      }}
                      /* REPLACED HOVER WITH EXACT BORDER GLOW (border-b-slate-200 -> border-b-[#ea580c] on hover!) */
                      className={`group flex items-center justify-between px-2.5 py-1 rounded-none border-b border-slate-200 hover:border-[#ea580c] transition-colors cursor-pointer text-slate-700 ${
                        isActive 
                          ? 'bg-[#ffedd5] text-[#ea580c] border-[#ea580c]' 
                          : 'hover:bg-[#f1f5f9]'
                      }`}
                    >
                      <div className="flex items-center min-w-0">
                        {/* Render thumbtack only for master setup & HR params */}
                        {showPinIcon && (
                          <span 
                            className={pinnedItems.includes(targetKey) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-150'}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePin && onTogglePin(targetKey, e);
                            }}
                          >
                            {Icons.thumbtack(pinnedItems.includes(targetKey))}
                          </span>
                        )}
                        <span className="text-[12.5px] font-semibold truncate ml-1">
                          {sub.title}
                        </span>
                      </div>
                      
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFormTab && onOpenFormTab(targetKey, e);
                          setActivePopoverId(null);
                        }}
                        style={{ flexShrink: 0 }}
                        className="flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >
                        {Icons.plus()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}