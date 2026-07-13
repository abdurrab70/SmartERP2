import React, { useState, useRef, useEffect } from 'react';

// Brand SVG Vectors for Export Menu
const ActionIcon = ({ type, size = 12 }) => {
  const icons = {
    excel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#107C41" />
        <path d="M7 6l4 3.5V14L7 18V6z" fill="#1B5E20" opacity="0.3" />
        <path d="M12.5 7.5L16 6.5l2 2-2.5 4 3 4.5-2.5 1-3.5-5.5-2.5 5.5H8l3.5-5.5L8.5 8h2.5l1.5 3.5z" fill="#FFFFFF" />
      </svg>
    ),
    csv: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#008080" />
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="system-ui">CSV</text>
      </svg>
    ),
    word: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#2B579A" />
        <path d="M7 6l4 3.5V14L7 18V6z" fill="#0D47A1" opacity="0.3" />
        <path d="M8 7h2.5l1.5 6 1.5-6h2.5l1.5 6 1.5-6H21l-3 10h-2.5l-1.5-6-1.5 6H10L8 7z" fill="#FFFFFF" />
      </svg>
    ),
    pdf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F40F02" />
        <path d="M6 18V6h5.5a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1-3.5 3.5H8v4H6zm2-6h3.5a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 11.5 8H8v4z" fill="#FFFFFF" />
      </svg>
    )
  };
  return icons[type] || null;
};

// MASTER DICTIONARY OF ALL AVAILABLE HR FORM FIELDS FOR DYNAMIC GRID CONFIGURATION
const ALL_COLUMNS_MAP = {
  photo: "Photo",
  empId: "Employee ID",
  name: "Employee Name",
  phone: "Primary Phone",
  department: "Department",
  designation: "Designation",
  shift: "Active Shift",
  joiningDate: "Joining Date",
  basicSalary: "Basic Salary",
  grossSalary: "Gross Salary",
  status: "Status",
  fatherName: "Father's Name",
  motherName: "Mother's Name",
  dob: "Date of Birth",
  gender: "Gender",
  maritalStatus: "Marital Status",
  religion: "Religion",
  bloodGroup: "Blood Group",
  nationality: "Nationality",
  nid: "National ID",
  passport: "Passport Number",
  factory: "Branch/Factory",
  unit: "Floor / Unit",
  line: "Section / Line",
  email: "Email Address"
};

export default function EmployeeInformation({
  records = [],
  onEditEmployee,
  onDeleteEmployee,
}) {
  const [searchQueries, setSearchQueries] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null); // Single row selection state!

  // DYNAMIC PAGINATION CONTROLS (LOCKED TO EXACTLY 35 ROWS PER PAGE!)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 35;

  // EXCEL-LIKE SYNCED TEXT SIZE & ROW HEIGHT STATES
  const [rowHeight, setRowHeight] = useState(14); // Default 14px compact!
  const [textSize, setTextSize] = useState(12);   // Default 12px!

  // DYNAMIC COLUMN WIDTHS FOR ALL 24 COLUMNS
  const [colWidths, setColWidths] = useState({
    photo: 60, empId: 100, name: 180, phone: 120, department: 140, designation: 140, shift: 100, joiningDate: 110, basicSalary: 110, grossSalary: 110, status: 90,
    fatherName: 140, motherName: 140, dob: 110, gender: 90, maritalStatus: 100, religion: 100, bloodGroup: 90, nationality: 100, nid: 130, passport: 130, factory: 140, unit: 110, line: 110, email: 160
  });

  // Default active visible columns on start (including 'photo' as 1st col!)
  const [visibleCols, setVisibleCols] = useState([
    'photo', 'empId', 'name', 'phone', 'department', 'designation', 'status'
  ]);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isChooserOpen, setIsChooserOpen] = useState(false);
  const [previewModalUrl, setPreviewModalUrl] = useState(null); // Local photo modal viewer!
  const [draggedCol, setDraggedCol] = useState(null); // Drag Move state

  const tableRef = useRef(null);
  const tableContainerRef = useRef(null); // FIXED: Declared tableContainerRef fully!
  const chooserRef = useRef(null);

  // UNBLOCKABLE SCROLLBAR MOUSE ROW HEIGHT & TEXT SIZE ZOOM CONTROLLER (CTRL + WHEEL UP/DOWN)
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleCtrlWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Stops normal browser viewport zoom
        const delta = e.deltaY;
        
        // Synced Row Height scaling
        setRowHeight(prev => {
          const nextHeight = delta < 0 ? prev + 1.5 : prev - 1.5;
          return Math.min(60, Math.max(12, nextHeight)); // Range: 12px to 60px!
        });

        // Synced Font Size scaling
        setTextSize(prev => {
          const nextSize = delta < 0 ? prev + 0.5 : prev - 0.5;
          return Math.min(24, Math.max(8, nextSize)); // Range: 8px to 24px!
        });
      }
    };

    container.addEventListener('wheel', handleCtrlWheelZoom, { passive: false });
    return () => container.removeEventListener('wheel', handleCtrlWheelZoom);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-container-export')) setIsExportOpen(false);
      if (chooserRef.current && !chooserRef.current.contains(e.target) && !e.target.closest('.chooser-trigger-btn')) {
        setIsChooserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // AUTOMATIC LIVE SEARCH EVALUATION FOR ALL CHOSEN ACTIVE COLUMNS
  const filteredRecords = records.filter(rec => {
    const d = rec.data || {};
    return visibleCols.every(col => {
      const query = searchQueries[col];
      if (!query || col === 'photo') return true; // Skip empty searches or photo column!

      let val = '';
      if (col === 'name') {
        val = `${d.firstName || ''} ${d.lastName || ''}`;
      } else {
        val = d[col] || '';
      }
      return String(val).toLowerCase().includes(query.toLowerCase());
    });
  });

  // Reset page position to 1 when search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQueries]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const activeRecordsSlice = filteredRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getPaddedRows = () => {
    const list = [...activeRecordsSlice];
    const pad = Math.max(0, PAGE_SIZE - list.length);
    for (let i = 0; i < pad; i++) {
      list.push({ isPlaceholder: true, tempId: `blank-${i}` });
    }
    return list;
  };

  // MOUSE RESIZER EVENT DISPATCHER
  const handleColResizeMouseDown = (e, colKey) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX;
    const startWidth = colWidths[colKey];

    const handleMouseMove = (moveEvent) => {
      const currentWidth = startWidth + (moveEvent.clientX - startX);
      setColWidths((prev) => ({ ...prev, [colKey]: Math.max(currentWidth, 50) }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // DYNAMIC SPREADSHEET COLUMN WIDTH AUTO-FIT ON DOUBLE CLICK!
  const handleColResizeDoubleClick = (colKey) => {
    if (colKey === 'photo') return; // Static size for avatar
    let maxLen = (ALL_COLUMNS_MAP[colKey] || '').length; // Start with header length

    filteredRecords.forEach(rec => {
      const d = rec.data || {};
      let text = '';
      if (colKey === 'name') {
        text = `${d.firstName || ''} ${d.lastName || ''}`;
      } else {
        text = String(d[colKey] || '');
      }
      if (text.length > maxLen) maxLen = text.length;
    });

    const computedWidth = Math.max(maxLen * 7.5 + 24, 60); // Auto-fit width calculation
    setColWidths(prev => ({ ...prev, [colKey]: computedWidth }));
  };

  // HTML5 DRAG & DROP COLUMN REORDERING LOGIC
  const handleColumnDrop = (targetCol) => {
    if (!draggedCol || draggedCol === targetCol) return;

    const draggedIdx = visibleCols.indexOf(draggedCol);
    const targetIdx = visibleCols.indexOf(targetCol);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const updatedCols = [...visibleCols];
    updatedCols.splice(draggedIdx, 1); // Remove from old position
    updatedCols.splice(targetIdx, 0, draggedCol); // Insert at new target position

    setVisibleCols(updatedCols);
    setDraggedCol(null);
  };

  const handleHeaderDragStart = (e, colKey) => {
    if (e.target.closest('.resize-handle')) return;
    setDraggedCol(colKey);
  };

  const handleResetColumns = () => {
    setVisibleCols(['empId', 'photo', 'name', 'phone', 'department', 'designation', 'status']);
  };

  const toggleColumnSelection = (colKey) => {
    setVisibleCols(prev => {
      if (prev.includes(colKey)) {
        if (prev.length <= 1) return prev; // Keep at least one column
        return prev.filter(k => k !== colKey);
      } else {
        return [...prev, colKey];
      }
    });
  };

  // MASTER DATA EXPORT UTILS
  const triggerDownload = (content, mimeType, fileName) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = fileName;
    document.body.appendChild(link); link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    if (filteredRecords.length === 0) return alert("No data available to export.");
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="utf-8" /></head>
      <body>
        <table border="1" style="border-collapse:collapse; border:1px solid #cbd5e1;">
          <tr style="background-color: #f1f5f9; color: #334155; font-weight: bold;">
            ${visibleCols.map(col => `<th>${ALL_COLUMNS_MAP[col] || col}</th>`).join('')}
          </tr>
          ${filteredRecords.map(rec => `
            <tr>
              ${visibleCols.map(col => {
                if (col === 'photo') return `<td>[Binary File]</td>`;
                if (col === 'name') return `<td>${rec.data.firstName || ''} ${rec.data.lastName || ''}</td>`;
                return `<td>${rec.data[col] || '-'}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    triggerDownload(htmlContent, 'application/vnd.ms-excel', `Employee_Report_${Date.now()}.xls`);
  };

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) return alert("No data available to export.");
    let csv = `\uFEFF` + visibleCols.map(col => `"${ALL_COLUMNS_MAP[col] || col}"`).join(',') + '\n';
    filteredRecords.forEach(rec => {
      csv += visibleCols.map(col => {
        if (col === 'photo') return `"Attachment"`;
        if (col === 'name') return `"${rec.data.firstName || ''} ${rec.data.lastName || ''}"`;
        return `"${rec.data[col] || ''}"`;
      }).join(',') + '\n';
    });
    triggerDownload(csv, 'text/csv;charset=utf-8;', `Employee_Report_${Date.now()}.csv`);
  };

  const handleExportWord = () => {
    if (filteredRecords.length === 0) return alert("No data available to export.");
    const htmlContent = `
      <html>
      <head><meta charset="utf-8" /></head>
      <body>
        <h2>SmartTex - Employee Directory</h2>
        <table border="1" style="width:100%; border-collapse:collapse;">
          <tr style="background-color: #f1f5f9;">
            ${visibleCols.map(col => `<th>${ALL_COLUMNS_MAP[col] || col}</th>`).join('')}
          </tr>
          ${filteredRecords.map(rec => `
            <tr>
              ${visibleCols.map(col => {
                if (col === 'photo') return `<td>[Attached Photo]</td>`;
                if (col === 'name') return `<td>${rec.data.firstName || ''} ${rec.data.lastName || ''}</td>`;
                return `<td>${rec.data[col] || '-'}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    triggerDownload(htmlContent, 'application/msword', `Employee_Report_${Date.now()}.doc`);
  };

  const handlePrintA4Report = () => {
    if (filteredRecords.length === 0) return alert("No data available to print.");
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Employee Directory Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #334155; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 10px; }
            th { background-color: #f1f5f9; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <h2>SmartTex - Registered Employees Directory</h2>
          <table>
            <thead>
              <tr>
                ${visibleCols.map(col => `<th>${ALL_COLUMNS_MAP[col] || col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${filteredRecords.map(rec => `
                <tr>
                  ${visibleCols.map(col => {
                    if (col === 'photo') return `<td>[Photo Attached]</td>`;
                    if (col === 'name') return `<td>${rec.data.firstName || ''} ${rec.data.lastName || ''}</td>`;
                    return `<td>${rec.data[col] || '-'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Sticky Column Chooser Cell width (40px)
  const totalTableWidth = visibleCols.reduce((acc, colKey) => acc + colWidths[colKey], 0) + 40;

  return (
    <div className="flex flex-col h-full bg-transparent box-sizing-border-box overflow-hidden">
      
      {/* SOLID GRID LINES & PERFECT COMPACT FOCUS SCALERS (0% ROUNDED CORNERS!) */}
      <style>{`
        .table-row-hover { transition: background-color 0.1s ease; cursor: pointer; }
        .resize-handle { position: absolute; right: 0; top: 0; width: 5px; height: 100%; cursor: col-resize; background-color: transparent; transition: background-color 0.15s ease; z-index: 10; }
        .resize-handle:hover { background-color: #ea580c !important; }
        .btn-soft-hover:hover { background-color: #e4e4e7 !important; border-color: #d4d4d8 !important; }
        .chooser-menu-scrollbar::-webkit-scrollbar { width: 5px; }
        .chooser-menu-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        
        /* Enforces full grid borders spanning from header to bottom */
        .solid-grid-cell { border-right: 1.5px solid #cbd5e1 !important; border-bottom: 1.5px solid #cbd5e1 !important; }
        .solid-grid-header { border-right: 1.5px solid #cbd5e1 !important; border-bottom: 1.5px solid #cbd5e1 !important; }

        /* Double Sticky Fixed Top Headers (Locked during vertical scrolling!) */
        .sticky-header-row-1 {
          position: sticky !important;
          top: 0px !important;
          z-index: 30 !important;
          background-color: #d1d5db !important; /* Contrasted slate-300 header */
        }
        .sticky-header-row-2 {
          position: sticky !important;
          top: 29px !important; /* 29px exactly matches height of header row */
          z-index: 30 !important;
          background-color: #e0e0e0 !important;
        }

        /* 100% flat focused search inputs - NO SHADOWS, NO ROUNDED CORNERS, SHARP SOLID ORANGE BORDERS! */
        .grid-search-input {
          border: 1.5px solid transparent !important;
          border-radius: 0px !important; /* Sharp square corners! */
          padding: 0px !important;
          margin: 0px !important;
          text-align: center !important;
          background-color: transparent !important;
          outline: none !important;
          height: 100% !important;
          width: 100% !important;
        }
        .grid-search-input:focus {
          border: 1.5px solid #ea580c !important;
          outline: none !important;
          box-shadow: none !important;
          background-color: #ffffff !important;
        }

        /* Centered Compact Column Cells */
        .grid-cell-strict {
          padding: 0px !important;
          margin: 0px !important;
          text-align: center !important;
          background-color: #e0e0e0 !important; /* Unified background! */
          border-right: 1.5px solid #cbd5e1 !important;
          border-bottom: 1.5px solid #cbd5e1 !important;
          display: table-cell !important;
          vertical-align: middle !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
      `}</style>

      {/* FULL FLUSH GRID CONTAINER - CONFIGURED WITH 6PX SPACE AT TOP & LEFT SIDEWAYS */}
      <div 
        ref={tableContainerRef} 
        className="flex-1 overflow-auto bg-[#e0e0e0] scrollbar-none pt-[6px] pl-[6px]"
      >
        <table ref={tableRef} style={{ width: `${totalTableWidth}px` }} className="border-collapse text-[12px] text-slate-700 table-layout-fixed border border-[#cbd5e1] bg-[#e0e0e0]">
          <thead>
            {/* Header Row — STATIC SIZE, NOT ZOOMABLE (DOUBLE CLICK RESET BUG IN RESIZE EVENT REMOVED!) */}
            <tr className="sticky-header-row-1 cursor-pointer select-none relative h-[29px]" title="Drag header left/right to move column.">
              {visibleCols.map(col => (
                <th
                  key={col}
                  draggable={true} // HTML5 drag-and-drop
                  onDragStart={(e) => handleHeaderDragStart(e, col)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleColumnDrop(col)}
                  style={{ width: `${colWidths[col]}px` }}
                  className="p-1 solid-grid-header text-center font-bold relative cursor-move select-none"
                >
                  <span className="truncate pr-2 block">{ALL_COLUMNS_MAP[col]}</span>
                  <div 
                    className="resize-handle" 
                    onMouseDown={(e) => handleColResizeMouseDown(e, col)} 
                    onDoubleClick={(e) => { e.stopPropagation(); handleColResizeDoubleClick(col); }}
                    title="Double click to auto-fit width"
                  />
                </th>
              ))}
              
              {/* STICKY RIGHT COLUMN CHOOSER GATE CELL `(+)` */}
              <th style={{ width: '40px' }} className="p-1 border-b border-[#cbd5e1] text-center font-bold sticky right-0 bg-[#d1d5db] border-l border-[#cbd5e1] z-20">
                <button
                  type="button"
                  onClick={() => setIsChooserOpen(!isChooserOpen)}
                  className="chooser-trigger-btn bg-slate-300 hover:bg-[#ea580c] hover:text-white border-none rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs cursor-pointer transition-all mx-auto"
                  title="Add/Remove Form Columns"
                >
                  +
                </button>

                {/* ADVANCED COLUMN GRID CHOOSER DICTIONARY DROP PANEL */}
                {isChooserOpen && (
                  <div ref={chooserRef} style={{ right: '4px', top: '34px' }} className="absolute bg-white border border-slate-300 shadow-2xl rounded-lg py-2.5 px-3 z-50 text-left w-64 chooser-menu-scrollbar flex flex-col gap-1.5 font-medium" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 mb-1.5 block">Select Form Columns</span>
                    <div className="max-h-60 overflow-y-auto chooser-menu-scrollbar flex flex-col gap-1">
                      {Object.keys(ALL_COLUMNS_MAP).map(key => {
                        const isChecked = visibleCols.includes(key);
                        return (
                          <label key={key} className="flex items-center gap-2 py-1 px-1.5 hover:bg-slate-50 rounded cursor-pointer select-none text-[11.5px] font-medium text-slate-700">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleColumnSelection(key)}
                              className="cursor-pointer accent-[#ea580c] w-3.5 h-3.5"
                            />
                            <span>{ALL_COLUMNS_MAP[key]}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </th>
            </tr>

            {/* Dynamic Search Filters Input Row — STATIC SIZE, NOT ZOOMABLE */}
            <tr className="sticky-header-row-2 h-8 text-[12px]">
              {visibleCols.map(col => (
                <td key={col} className="p-0 solid-grid-cell h-8">
                  {col !== 'photo' ? (
                    <input
                      type="text"
                      className="grid-search-input"
                      value={searchQueries[col] || ''}
                      onChange={(e) => setSearchQueries({ ...searchQueries, [col]: e.target.value })}
                    />
                  ) : null}
                </td>
              ))}
              <td className="p-0 border-b border-[#cbd5e1] sticky right-0 bg-[#e0e0e0] border-l border-[#cbd5e1] z-10 h-8"></td>
            </tr>
          </thead>
          <tbody>
            {getPaddedRows().map((rec, index) => {
              if (rec.isPlaceholder) {
                return (
                  <tr key={rec.tempId} style={{ height: `${rowHeight}px` }}>
                    {visibleCols.map(col => (
                      <td key={col} className="grid-cell-strict">&nbsp;</td>
                    ))}
                    <td className="grid-cell-strict sticky right-0 bg-[#e0e0e0] border-l border-[#cbd5e1] z-10">&nbsp;</td>
                  </tr>
                );
              }
              const d = rec.data || {};
              const isSelected = selectedRowId === rec.id;

              return (
                <tr
                  key={rec.id}
                  onClick={() => setSelectedRowId(rec.id)} // Single click soft orange select highlight!
                  onDoubleClick={() => onEditEmployee && onEditEmployee(rec)} // Double click edit tab trigger!
                  style={{ height: `${rowHeight}px`, fontSize: `${textSize}px` }} // Zoom only applied to middle tbody rows!
                  className={`select-none transition-all ${
                    isSelected 
                      ? 'bg-[#ffedd5] text-[#ea580c]' // Soft orange selection background!
                      : 'hover:bg-slate-300/40 bg-[#e0e0e0]' // Matches unified #e0e0e0 background!
                  }`}
                  title="Single click to select. Double-click to open edit profile tab."
                >
                  {visibleCols.map(col => {
                    // DEDICATED PRE-COLLECTED AVATAR COLUMN PREVIEWER ENGINE (PROPOSAL 2)
                    if (col === 'photo') {
                      const photoUrl = d.photo || '';
                      return (
                        <td key={col} className="grid-cell-strict text-center p-0">
                          {photoUrl ? (
                            <img 
                              src={photoUrl} 
                              alt="Emp" 
                              className="w-5 h-5 rounded-full object-cover border border-slate-400 cursor-zoom-in hover:scale-110 transition-transform inline-block"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents row selection
                                setPreviewModalUrl({ url: photoUrl, name: `${d.firstName || 'Employee'}_photo.jpg` }); // Opens large HD previewer!
                              }}
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center font-bold text-[8px] text-slate-600 inline-block">
                              {d.firstName ? d.firstName[0].toUpperCase() : 'E'}
                            </div>
                          )}
                        </td>
                      );
                    }

                    let content = '';
                    if (col === 'name') {
                      content = `${d.firstName || ''} ${d.lastName || ''}`;
                    } else if (col === 'basicSalary' || col === 'grossSalary') {
                      content = d[col] ? `${d[col]} BDT` : '0 BDT';
                    } else {
                      content = d[col] || '-';
                    }

                    if (col === 'empId') {
                      return <td key={col} className="grid-cell-strict font-bold text-slate-800">{content}</td>;
                    }
                    if (col === 'status') {
                      return (
                        <td key={col} className="grid-cell-strict text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${d.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'}`}>{content}</span>
                        </td>
                      );
                    }
                    return <td key={col} className="grid-cell-strict truncate">{content}</td>;
                  })}
                  <td className="grid-cell-strict sticky right-0 bg-[#e0e0e0] border-l border-[#cbd5e1] z-10">&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* COMPACT BOTTOM ACTION BAR — STATIC SIZE, NOT ZOOMABLE */}
      <div style={styles.bottomBar} className="mt-4 mb-4 px-4 flex items-center justify-between shrink-0 text-[12px] font-bold">
        
        {/* Left Side: Export & Print Actions */}
        <div className="flex items-center gap-3">
          <div className="dropdown-container-export" style={styles.dropdownContainer}>
            <button onClick={() => setIsExportOpen(!isExportOpen)} style={styles.exportBtn} type="button">
              Export Directories <span style={{ fontSize: '9px', marginLeft: '3px' }}>▼</span>
            </button>
            {isExportOpen && (
              <div style={styles.dropdownMenu}>
                <button onClick={() => { handleExportExcel(); setIsExportOpen(false); }} style={styles.dropdownItem}>
                  <div style={styles.dropdownItemContent}><ActionIcon type="excel" size={14} /><span>Excel (.xls)</span></div>
                </button>
                <button onClick={() => { handleExportCSV(); setIsExportOpen(false); }} style={styles.dropdownItem}>
                  <div style={styles.dropdownItemContent}><ActionIcon type="csv" size={14} /><span>CSV (.csv)</span></div>
                </button>
                <button onClick={() => { handleExportWord(); setIsExportOpen(false); }} style={styles.dropdownItem}>
                  <div style={styles.dropdownItemContent}><ActionIcon type="word" size={14} /><span>Word (.doc)</span></div>
                </button>
                <button onClick={() => { handlePrintA4Report(); setIsExportOpen(false); }} style={styles.dropdownItem}>
                  <div style={styles.dropdownItemContent}><ActionIcon type="pdf" size={14} /><span>PDF / Print</span></div>
                </button>
              </div>
            )}
          </div>

          <button onClick={handlePrintA4Report} style={styles.printBtn} type="button">
            Print Directory
          </button>
        </div>

        {/* Right Side: Professional Database Pagination with bold Arrow Icons */}
        <div className="flex items-center gap-1.5 select-none font-bold">
          <button 
            type="button"
            title="First Page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="w-7 h-7 flex items-center justify-center text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            «
          </button>
          <button 
            type="button"
            title="Prev Page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="w-7 h-7 flex items-center justify-center text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ‹
          </button>
          <span className="text-[11px] font-bold text-slate-600 px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            type="button"
            title="Next Page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="w-7 h-7 flex items-center justify-center text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ›
          </button>
          <button 
            type="button"
            title="Last Page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="w-7 h-7 flex items-center justify-center text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            »
          </button>
        </div>
      </div>

      {/* DYNAMIC HIGH-FIDELITY LIVE PREVIEW MODAL OVERLAY */}
      {previewModalUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center shrink-0">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Document Live Preview: {previewModalUrl.name}</span>
              <button type="button" onClick={() => setPreviewModalUrl(null)} className="text-slate-600 hover:text-rose-600 text-2xl font-bold border-none bg-none cursor-pointer">×</button>
            </div>
            <div className="flex-1 bg-slate-100 p-2 flex items-center justify-center overflow-auto">
              <img src={previewModalUrl.url} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  dropdownContainer: { position: 'relative', display: 'inline-block' },
  exportBtn: { backgroundColor: '#1e293b', color: '#ffffff', border: 'none', padding: '6px 14px', fontSize: '12px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', height: '28px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.15s ease' },
  printBtn: { backgroundColor: '#475569', color: '#ffffff', border: 'none', padding: '6px 14px', fontSize: '12px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', height: '28px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.15s ease' },
  dropdownMenu: { position: 'absolute', left: 0, bottom: '32px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 100, minWidth: '150px', padding: '4px 0' },
  dropdownItem: { display: 'block', width: '100%', padding: '6px 10px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', transition: 'background-color 0.1s' },
  dropdownItemContent: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', fontWeight: '500' },
  bottomBar: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', paddingTop: '4px', paddingBottom: '4px', flexShrink: 0 },
};