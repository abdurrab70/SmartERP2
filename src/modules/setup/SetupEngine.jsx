import React, { useState, useEffect, useRef } from 'react';

// Custom SVG Icons with original brand vectors
const ActionIcon = ({ type, color, size = 12 }) => {
  const icons = {
    filter: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px', verticalAlign: 'middle' }}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
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

// Unified Master Config Resolver for ALL 32 setups (INCLUDING 7 NEW PARAMETERS)
const getEngineConfig = (setupKey) => {
  const configs = {
    department: { prefix: 'Dept-', labelCode: 'Dept Code', labelName: 'Department Name', title: 'Department Setup' },
    designation: { prefix: 'Desg-', labelCode: 'Designation Code', labelName: 'Designation Name', title: 'Designation Setup' },
    shift: { prefix: 'Shift-', labelCode: 'Shift Code', labelName: 'Shift Name', title: 'Shift Setup' },
    unit: { prefix: 'Unit-', labelCode: 'Unit Code', labelName: 'Unit Name', title: 'Unit Setup' },
    employee_type: { prefix: 'EmpType-', labelCode: 'Emp Type Code', labelName: 'Employee Type Name', title: 'Employee Type Setup' },
    leave_type: { prefix: 'Leave-', labelCode: 'Leave Type Code', labelName: 'Leave Type Name', title: 'Leave Type Setup' },
    buyer_department: { prefix: 'BuyerDept-', labelCode: 'Buyer Dept Code', labelName: 'Buyer Department Name', title: 'Buyer Department Setup' },
    style: { prefix: 'Style-', labelCode: 'Style Code', labelName: 'Style Name/Number', title: 'Style Setup' },
    color: { prefix: 'Color-', labelCode: 'Color Code', labelName: 'Color Name', title: 'Color Setup' },
    machine: { prefix: 'Machine-', labelCode: 'Machine Code', labelName: 'Machine Brand/Name', title: 'Machine Setup' },
    line: { prefix: 'Line-', labelCode: 'Line Code', labelName: 'Line Name', title: 'Line Setup' },
    team: { prefix: 'Team-', labelCode: 'Team Code', labelName: 'Team Name', title: 'Team Setup' },
    wash_type: { prefix: 'Wash-', labelCode: 'Wash Code', labelName: 'Wash Type Name', title: 'Wash Type Setup' },
    factory: { prefix: 'Fac-', labelCode: 'Factory Code', labelName: 'Factory Name', title: 'Factory Setup' },
    recipe_type: { prefix: 'RecType-', labelCode: 'Recipe Type Code', labelName: 'Recipe Type Name', title: 'Recipe Type Setup' },
    recipe_approved: { prefix: 'RecApp-', labelCode: 'Approval Code', labelName: 'Recipe Name', title: 'Recipe Approval Setup' },
    order_type: { prefix: 'Order-', labelCode: 'Order Type Code', labelName: 'Order Type Name', title: 'Order Type Setup' },
    chemical: { prefix: 'Chem-', labelCode: 'Chemical Code', labelName: 'Chemical Name', title: 'Chemical Setup' },
    company: { prefix: 'Comp-', labelCode: 'Company Code', labelName: 'Company Name', title: 'Company Setup' },
    buyer: { prefix: 'Buyer-', labelCode: 'Buyer Code', labelName: 'Buyer Name', title: 'Buyer Setup' },
    holiday: { prefix: 'Hol-', labelCode: 'Holiday Code', labelName: 'Holiday Name', title: 'Holiday Setup' },
    status: { prefix: 'Status-', labelCode: 'Status Code', labelName: 'Status Name', title: 'Status Parameter Setup' },
    dry_wash_type: { prefix: 'DryWash-', labelCode: 'Dry/Wash Code', labelName: 'Dry/Wash Type Name', title: 'Dry / Wash Type Setup' },
    root_sequence: { prefix: 'RootSeq-', labelCode: 'Seq Code', labelName: 'Sequence Description', title: 'Root Sequence Setup' },
    SpWash: { prefix: 'SpWash-', labelCode: 'Sp Wash Code', labelName: 'Special Wash Name', title: 'Special Wash Setup' },
    // NEW 7 CONFIGURATIONS PERFECTLY REGISTERED NATIVELY
    fabric_type: { prefix: 'Fabric-', labelCode: 'Fabric Code', labelName: 'Fabric Type Name', title: 'Fabric Type Setup' },
    garments_item: { prefix: 'Gmt-', labelCode: 'Garments Code', labelName: 'Garments Item Name', title: 'Garments Item Setup' },
    uom: { prefix: 'Uom-', labelCode: 'Uom Code', labelName: 'Unit of Measurement Name', title: 'Unit of Measurement Setup' },
    supplier_vendor: { prefix: 'Sup-', labelCode: 'Supplier Code', labelName: 'Supplier/Vendor Name', title: 'Supplier / Vendor Setup' },
    wash_shade: { prefix: 'Shade-', labelCode: 'Shade Code', labelName: 'Wash Shade Name', title: 'Wash Shade Setup' },
    buyer_brand: { prefix: 'Brand-', labelCode: 'Brand Code', labelName: 'Buyer Brand Name', title: 'Buyer Brand Setup' },
    destination_country: { prefix: 'Dest-', labelCode: 'Country Code', labelName: 'Destination Country Name', title: 'Destination Country Setup' },
  };
  return configs[setupKey] || { prefix: 'Code-', labelCode: 'Code', labelName: 'Name', title: 'Parameter Setup' };
};

export default function SetupEngine({
  setupKey,
  records = [],
  onSaveRecord,
  onDeleteRecord,
}) {
  const config = getEngineConfig(setupKey);
  const { prefix, labelCode, labelName, title } = config;

  const [editingId, setEditingId] = useState(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  const tableRef = useRef(null);
  const codeInputRef = useRef(null); // Ref pointing directly to the Code Input element

  // DYNAMIC GRADIENT PERCENTAGE WIDTHS FOR FLUID ENTITY COLUMN MATCHING
  const [colWidths, setColWidths] = useState({
    id: '8%',
    code: '20%',
    name: '42%',
    status: '12%',
    actions: '18%'
  });

  // MINIMUM WIDTHS FOR COLUMNS TO PREVENT COMPRESSION & DATA CLIPPING ON SMALL SCREENS
  const minColWidths = {
    id: '80px',
    code: '130px',
    name: '280px',
    status: '100px',
    actions: '150px'
  };

  const isFluid = typeof colWidths.id === 'string';
  const totalTableWidth = isFluid
    ? '100%'
    : `${colWidths.id + colWidths.code + colWidths.name + colWidths.status + colWidths.actions}px`;

  const [colSearchQueries, setColSearchQueries] = useState({
    id: '',
    code: '',
    name: '',
    status: ''
  });

  const [activeFilterCol, setActiveFilterCol] = useState(null); 
  const [selectedColFilters, setSelectedColFilters] = useState({
    id: [],
    code: [],
    name: [],
    status: []
  });

  // AUTOMATIC FOCUS DISPATCHER ON CODE INPUT
  useEffect(() => {
    if (codeInputRef.current) {
      setTimeout(() => {
        codeInputRef.current.focus();
      }, 50);
    }
  }, [setupKey, editingId]);

  useEffect(() => {
    setEditingId(null);
    setCode('');
    setName('');
    setStatus('Active');
    setColSearchQueries({ id: '', code: '', name: '', status: '' });
    setSelectedColFilters({ id: [], code: [], name: [], status: [] });
  }, [setupKey]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.header-popover-container')) {
        setActiveFilterCol(null);
      }
      if (!e.target.closest('.dropdown-container-export')) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const getUniqueColumnValues = (colKey) => {
    const vals = records.map(r => {
      if (colKey === 'id') return String(r.data.id);
      if (colKey === 'code') return String(r.data.code);
      if (colKey === 'name') return String(r.data.name);
      if (colKey === 'status') return String(r.data.status);
      return '';
    }).filter(Boolean);
    return [...new Set(vals)].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  };

  const handleHeaderFilterClick = (colName, e) => {
    e.stopPropagation();
    setActiveFilterCol(activeFilterCol === colName ? null : colName);
  };

  const applyColumnFilterToggle = (colName, value) => {
    setSelectedColFilters((prev) => {
      const current = prev[colName];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [colName]: updated };
    });
  };

  const clearSingleColumnFilter = (colName) => {
    setSelectedColFilters((prev) => ({ ...prev, [colName]: [] }));
  };

  const handleInlineSearchChange = (colName, value) => {
    setColSearchQueries((prev) => ({ ...prev, [colName]: value }));
  };

  const handleColResizeMouseDown = (e, colKey) => {
    e.preventDefault();
    e.stopPropagation();

    let currentPixelWidths = { ...colWidths };

    if (isFluid && tableRef.current) {
      const thElements = tableRef.current.querySelectorAll('thead tr:first-child th');
      const keys = ['id', 'code', 'name', 'status', 'actions'];
      
      thElements.forEach((th, index) => {
        const key = keys[index];
        if (key) {
          currentPixelWidths[key] = th.getBoundingClientRect().width;
        }
      });
      
      setColWidths(currentPixelWidths);
    }

    const startX = e.clientX;
    const startWidth = currentPixelWidths[colKey];

    const handleMouseMove = (moveEvent) => {
      const currentWidth = startWidth + (moveEvent.clientX - startX);
      setColWidths((prev) => {
        const baseWidths = typeof prev[colKey] === 'string' ? currentPixelWidths : prev;
        return {
          ...baseWidths,
          [colKey]: Math.max(currentWidth, 50)
        };
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const filteredRecords = records.filter((rec) => {
    const matchesInlineId = String(rec.data.id).toLowerCase().includes(colSearchQueries.id.toLowerCase());
    const matchesInlineCode = String(rec.data.code || '').toLowerCase().includes(colSearchQueries.code.toLowerCase());
    const matchesInlineName = String(rec.data.name || '').toLowerCase().includes(colSearchQueries.name.toLowerCase());
    const matchesInlineStatus = String(rec.data.status || '').toLowerCase().includes(colSearchQueries.status.toLowerCase());

    const matchesColId = selectedColFilters.id.length === 0 || selectedColFilters.id.includes(String(rec.data.id));
    const matchesColCode = selectedColFilters.code.length === 0 || selectedColFilters.code.includes(String(rec.data.code));
    const matchesColName = selectedColFilters.name.length === 0 || selectedColFilters.name.includes(String(rec.data.name));
    const matchesColStatus = selectedColFilters.status.length === 0 || selectedColFilters.status.includes(String(rec.data.status));

    return matchesInlineId && matchesInlineCode && matchesInlineName && matchesInlineStatus &&
           matchesColId && matchesColCode && matchesColName && matchesColStatus;
  });

  const getPaddedDisplayRows = () => {
    const displayList = [...filteredRecords];
    const paddingRequired = Math.max(0, 25 - displayList.length);
    for (let i = 0; i < paddingRequired; i++) {
      displayList.push({ isPlaceholder: true, tempId: `blank-row-${i}` });
    }
    return displayList;
  };

  const triggerDownload = (content, mimeType, fileName) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    if (filteredRecords.length === 0) {
      alert("No data available to export.");
      return;
    }
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body>
        <table border="1" style="border-collapse:collapse; border:1px solid #cbd5e1;">
          <tr style="background-color: #f1f5f9; color: #334155; font-weight: bold;">
            <th style="border:1px solid #cbd5e1; padding:6px;">ID</th>
            <th style="border:1px solid #cbd5e1; padding:6px;">${labelCode}</th>
            <th style="border:1px solid #cbd5e1; padding:6px;">${labelName}</th>
            <th style="border:1px solid #cbd5e1; padding:6px;">Status</th>
          </tr>
          ${filteredRecords.map(rec => `
            <tr>
              <td style="border:1px solid #cbd5e1; padding:6px;">${rec.data.id}</td>
              <td style="border:1px solid #cbd5e1; padding:6px;">${rec.data.code || ''}</td>
              <td style="border:1px solid #cbd5e1; padding:6px;">${rec.data.name || ''}</td>
              <td style="border:1px solid #cbd5e1; padding:6px;">${rec.data.status}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    triggerDownload(htmlContent, 'application/vnd.ms-excel', `${setupKey}_Report_${Date.now()}.xls`);
  };

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      alert("No data available to export.");
      return;
    }
    let csv = `\uFEFFID,${labelCode},${labelName},Status\n`;
    filteredRecords.forEach(rec => {
      csv += `"${rec.data.id}","${rec.data.code || ''}","${rec.data.name || ''}","${rec.data.status}"\n`;
    });
    triggerDownload(csv, 'text/csv;charset=utf-8;', `${setupKey}_Report_${Date.now()}.csv`);
  };

  const handleExportWord = () => {
    if (filteredRecords.length === 0) {
      alert("No data available to export.");
      return;
    }
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body>
        <h2>Smart ERP - ${title} Report</h2>
        <table border="1" style="width:100%; border-collapse:collapse; font-family: Arial, sans-serif; font-size: 12px; border:1px solid #cbd5e1;">
          <thead>
            <tr style="background-color: #f1f5f9; text-align: left; font-weight: bold;">
              <th style="padding: 8px; border:1px solid #cbd5e1;">ID</th>
              <th style="padding: 8px; border:1px solid #cbd5e1;">${labelCode}</th>
              <th style="padding: 8px; border:1px solid #cbd5e1;">${labelName}</th>
              <th style="padding: 8px; border:1px solid #cbd5e1;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredRecords.map(rec => `
              <tr>
                <td style="padding: 8px; border:1px solid #cbd5e1;">${rec.data.id}</td>
                <td style="padding: 8px; border:1px solid #cbd5e1;">${rec.data.code}</td>
                <td style="padding: 8px; border:1px solid #cbd5e1;">${rec.data.name}</td>
                <td style="padding: 8px; border:1px solid #cbd5e1;">${rec.data.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    triggerDownload(htmlContent, 'application/vnd.ms-excel', `${setupKey}_Report_${Date.now()}.doc`);
  };

  const handlePrintA4Report = () => {
    if (filteredRecords.length === 0) {
      alert("No data available to export.");
      return;
    }
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${title} Print Directory</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 12px; }
            th { background-color: #f1f5f9; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <h2>Smart ERP - ${title} Report</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>${labelCode}</th>
                <th>${labelName}</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRecords.map(rec => `
                <tr>
                  <td>${rec.data.id}</td>
                  <td>${rec.data.code}</td>
                  <td>${rec.data.name}</td>
                  <td>${rec.data.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleEditClick = (rec) => {
    setEditingId(rec.data.id);
    const cleanCode = String(rec.data.code || '').replace(new RegExp(`^${prefix}`), '');
    setCode(cleanCode);
    setName(rec.data.name);
    setStatus(rec.data.status || 'Active');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCode('');
    setName('');
    setStatus('Active');
  };

  const handleDeleteCurrent = () => {
    if (editingId) {
      if (window.confirm(`Confirm delete Id: ${editingId}?`)) {
        onDeleteRecord(editingId);
        handleCancelEdit();
      }
    }
  };

  const getNextId = () => {
    if (editingId) return editingId;
    if (!records || records.length === 0) return 1;

    const numericIds = records
      .map((rec) => {
        const idVal = String(rec.data.id || '');
        const cleanId = idVal.includes('-') ? idVal.split('-')[1] : idVal;
        return parseInt(cleanId, 10);
      })
      .filter((num) => !isNaN(num));

    const maxNum = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return maxNum + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalId = editingId ? editingId : getNextId();

    onSaveRecord({
      id: finalId,
      code: code ? `${prefix}${code}` : '',
      name: name,
      status: status,
    });

    setEditingId(null);
    setCode('');
    setName('');
    setStatus('Active');
  };

  return (
    <div style={styles.workspace}>
      <style>{`
        .table-row-hover { transition: background-color 0.1s ease; cursor: pointer; }
        .table-row-hover:hover { background-color: #f1f5f9 !important; }
        .header-filter-btn { background: none; border: none; color: #94a3b8; cursor: pointer; padding: 2px; border-radius: 3px; }
        .header-filter-btn:hover { color: #475569; background-color: #e2e8f0; }
        .filter-btn-active { color: #52525b !important; background-color: #f1f5f9 !important; }
        .resize-handle { position: absolute; right: 0; top: 0; width: 5px; height: 100%; cursor: col-resize; background-color: transparent; transition: background-color 0.15s ease; z-index: 10; }
        .resize-handle:hover { background-color: #3b82f6 !important; }
        .popover-item-label { display: flex; align-items: center; gap: 6px; padding: 4px 6px; font-size: 12px; color: #334155; cursor: pointer; border-radius: 2px; transition: background-color 0.1s; }
        .popover-item-label:hover { background-color: #f1f5f9; }
        .btn-soft-hover:hover { background-color: #e4e4e7 !important; border-color: #d4d4d8 !important; }
        .btn-delete-hover:hover { background-color: #fee2e2 !important; border-color: #fca5a5 !important; }
      `}</style>

      <div style={styles.unifiedCard}>
        
        {/* INPUT SETUP FORM PANEL */}
        <div style={styles.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', paddingRight: '16px' }}>
            <h4 style={styles.title}>{editingId ? `Edit ${title} ID: ${editingId}` : `${title}`}</h4>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {editingId && (
                <>
                  <button type="button" onClick={handleDeleteCurrent} style={styles.deleteFormBtn} className="btn-delete-hover">Delete Record</button>
                  <button onClick={handleCancelEdit} style={styles.cancelBtn} className="btn-soft-hover">Cancel Edit</button>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.horizontalRow}>
              {/* ID INPUT - FIXED 120PX */}
              <div style={{ ...styles.group, flex: '0 0 120px' }}>
                <label style={styles.label}>ID</label>
                <input type="text" disabled style={{ ...styles.input, backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed', fontWeight: 'bold' }} value={getNextId()} />
              </div>

              {/* CODE INPUT - FIXED 220PX */}
              <div style={{ ...styles.group, flex: '0 0 220px' }}>
                <label style={styles.label}>{labelCode}</label>
                <div style={styles.prefixInputContainer}>
                  <span style={styles.inputPrefix}>{prefix}</span>
                  <input type="text" ref={codeInputRef} placeholder="Code" style={styles.prefixedInput} value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
              </div>

              {/* NAME INPUT - FIXED 300PX */}
              <div style={{ ...styles.group, flex: '0 0 300px' }}>
                <label style={styles.label}>{labelName}</label>
                <input type="text" required placeholder="Name Description" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              {/* STATUS INPUT - FIXED 120PX */}
              <div style={{ ...styles.group, flex: '0 0 120px' }}>
                <label style={styles.label}>Status</label>
                <select style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">InActive</option>
                </select>
              </div>

              <button type="submit" style={{ ...styles.saveBtn, flex: '0 0 auto' }} className="btn-soft-hover">{editingId ? 'Update Data' : 'Save Data'}</button>
            </div>
          </form>
        </div>

        <div style={styles.dividerLine} />

        {/* DATA TABLE SECTION */}
        <div style={styles.tableSection}>
          <div style={{ ...styles.header, paddingRight: '16px' }}>
            <h4 style={styles.title}>{title} Data Directory</h4>
          </div>

          <div style={styles.tableWrapper}>
            <table ref={tableRef} style={{ ...styles.table, width: totalTableWidth, minWidth: isFluid ? '100%' : 'auto' }}>
              <thead>
                <tr style={styles.thRow}>
                  <th className="header-popover-container" style={{ ...styles.th, width: colWidths.id, minWidth: minColWidths.id }}>
                    <div style={styles.headerCellFlex}>
                      <span>ID</span>
                      <button className={`header-filter-btn ${selectedColFilters.id.length > 0 ? 'filter-btn-active' : ''}`} onClick={(e) => handleHeaderFilterClick('id', e)}><ActionIcon type="filter" /></button>
                      {activeFilterCol === 'id' && (
                        <div style={styles.headerPopover}>
                          <div style={styles.popoverList}>
                            {getUniqueColumnValues('id').map(v => (
                              <label key={v} className="popover-item-label">
                                <input type="checkbox" checked={selectedColFilters.id.includes(v)} onChange={() => applyColumnFilterToggle('id', v)} style={{ margin: 0 }} />
                                <span>{v}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="resize-handle" onMouseDown={(e) => handleColResizeMouseDown(e, 'id')} />
                  </th>

                  <th className="header-popover-container" style={{ ...styles.th, width: colWidths.code, minWidth: minColWidths.code }}>
                    <div style={styles.headerCellFlex}>
                      <span>{labelCode}</span>
                      <button className={`header-filter-btn ${selectedColFilters.code.length > 0 ? 'filter-btn-active' : ''}`} onClick={(e) => handleHeaderFilterClick('code', e)}><ActionIcon type="filter" /></button>
                      {activeFilterCol === 'code' && (
                        <div style={styles.headerPopover}>
                          <div style={styles.popoverList}>
                            {getUniqueColumnValues('code').map(v => (
                              <label key={v} className="popover-item-label">
                                <input type="checkbox" checked={selectedColFilters.code.includes(v)} onChange={() => applyColumnFilterToggle('code', v)} style={{ margin: 0 }} />
                                <span>{v}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="resize-handle" onMouseDown={(e) => handleColResizeMouseDown(e, 'code')} />
                  </th>

                  <th className="header-popover-container" style={{ ...styles.th, width: colWidths.name, minWidth: minColWidths.name }}>
                    <div style={styles.headerCellFlex}>
                      <span>{labelName}</span>
                      <button className={`header-filter-btn ${selectedColFilters.name.length > 0 ? 'filter-btn-active' : ''}`} onClick={(e) => handleHeaderFilterClick('name', e)}><ActionIcon type="filter" /></button>
                      {activeFilterCol === 'name' && (
                        <div style={styles.headerPopover}>
                          <div style={styles.popoverList}>
                            {getUniqueColumnValues('name').map(v => (
                              <label key={v} className="popover-item-label">
                                <input type="checkbox" checked={selectedColFilters.name.includes(v)} onChange={() => applyColumnFilterToggle('name', v)} style={{ margin: 0 }} />
                                <span>{v}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="resize-handle" onMouseDown={(e) => handleColResizeMouseDown(e, 'name')} />
                  </th>

                  <th className="header-popover-container" style={{ ...styles.th, width: colWidths.status, minWidth: minColWidths.status }}>
                    <div style={styles.headerCellFlex}>
                      <span>Status</span>
                      <button className={`header-filter-btn ${selectedColFilters.status.length > 0 ? 'filter-btn-active' : ''}`} onClick={(e) => handleHeaderFilterClick('status', e)}><ActionIcon type="filter" /></button>
                      {activeFilterCol === 'status' && (
                        <div style={styles.headerPopover}>
                          <div style={styles.popoverList}>
                            {getUniqueColumnValues('status').map(v => (
                              <label key={v} className="popover-item-label">
                                <input type="checkbox" checked={selectedColFilters.status.includes(v)} onChange={() => applyColumnFilterToggle('status', v)} style={{ margin: 0 }} />
                                <span>{v}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="resize-handle" onMouseDown={(e) => handleColResizeMouseDown(e, 'status')} />
                  </th>

                  <th style={{ ...styles.th, width: colWidths.actions, minWidth: minColWidths.actions, textAlign: 'center' }}>
                    Action Workspace
                    <div className="resize-handle" onMouseDown={(e) => handleColResizeMouseDown(e, 'actions')} />
                  </th>
                </tr>

                <tr style={styles.searchRow}>
                  <td style={{ ...styles.searchTd, left: 0, minWidth: minColWidths.id }}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.id} onChange={(e) => handleInlineSearchChange('id', e.target.value)} /></td>
                  <td style={{ ...styles.searchTd, minWidth: minColWidths.code }}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.code} onChange={(e) => handleInlineSearchChange('code', e.target.value)} /></td>
                  <td style={{ ...styles.searchTd, minWidth: minColWidths.name }}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.name} onChange={(e) => handleInlineSearchChange('name', e.target.value)} /></td>
                  <td style={{ ...styles.searchTd, minWidth: minColWidths.status }}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.status} onChange={(e) => handleInlineSearchChange('status', e.target.value)} /></td>
                  <td style={{ ...styles.searchTd, minWidth: minColWidths.actions }}></td>
                </tr>
              </thead>
              <tbody>
                {getPaddedDisplayRows().map((rec) => {
                  if (rec.isPlaceholder) {
                    return (
                      <tr key={rec.tempId} style={styles.tr}>
                        <td style={styles.td}>&nbsp;</td>
                        <td style={styles.td}>&nbsp;</td>
                        <td style={styles.td}>&nbsp;</td>
                        <td style={styles.td}>&nbsp;</td>
                        <td style={styles.td}>&nbsp;</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={rec.id} style={styles.tr} className="table-row-hover" onDoubleClick={() => handleEditClick(rec)} title="Double-click row to edit">
                      <td style={{ ...styles.td, minWidth: minColWidths.id }}>{rec.data.id}</td>
                      <td style={{ ...styles.td, minWidth: minColWidths.code }}>{rec.data.code}</td>
                      <td style={{ ...styles.td, minWidth: minColWidths.name }}>{rec.data.name}</td>
                      <td style={{ ...styles.td, minWidth: minColWidths.status }}>{rec.data.status}</td>
                      <td style={{ ...styles.td, minWidth: minColWidths.actions }}></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ ...styles.bottomBar, paddingRight: '16px' }}>
            <div className="dropdown-container-export" style={styles.dropdownContainer}>
              <button onClick={() => setIsExportOpen(!isExportOpen)} style={styles.exportBtn} className="btn-soft-hover" type="button">Export <span style={{ fontSize: '9px', marginLeft: '3px' }}>▼</span></button>
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

            {Object.entries(selectedColFilters).some(([_, val]) => val.length > 0) && (
              <div style={styles.activeFiltersContainer}>
                <span style={styles.activeFilterLabel}>Active Filters:</span>
                <div style={styles.activeFilterBadgesRow}>
                  {Object.entries(selectedColFilters).map(([colKey, colVal]) => {
                    if (colVal.length === 0) return null;
                    const friendlyNames = { id: 'ID', code: labelCode, name: labelName, status: 'Status' };
                    return (
                      <div key={colKey} style={styles.filterBadge}>
                        <span>{friendlyNames[colKey]}: <strong>{colVal.join(', ')}</strong></span>
                        <button onClick={() => clearSingleColumnFilter(colKey)} style={styles.removeBadgeBtn} title="Remove Filter">×</button>
                      </div>
                    );
                  })}
                  <button onClick={() => setSelectedColFilters({ id: [], code: [], name: [], status: [] })} style={styles.clearAllFiltersBtnText}>Clear All Filters</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  workspace: { display: 'flex', flexDirection: 'column', gap: '0px' },
  unifiedCard: {
    backgroundColor: 'transparent',
    padding: '0px 0px 0px 16px',
    borderRadius: '0px',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', 
    height: 'calc(100vh - 110px)', 
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  formSection: { display: 'flex', flexDirection: 'column', flexShrink: 0, paddingRight: '16px' },
  tableSection: { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' },
  title: { margin: 0, fontSize: '13px', color: '#0f172a', fontWeight: '600' },
  horizontalRow: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' },
  group: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '11.5px', fontWeight: '500', color: '#475569' },
  input: { padding: '6px 10px', fontSize: '12.5px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none', color: '#0f172a', backgroundColor: '#fbfbfb', width: '100%', boxSizing: 'border-box' },
  prefixInputContainer: { display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fbfbfb', overflow: 'hidden', width: '100%', boxSizing: 'border-box' },
  inputPrefix: { backgroundColor: '#f1f5f9', color: '#475569', fontSize: '12.5px', padding: '6px 8px', borderRight: '1px solid #cbd5e1', fontWeight: '600', userSelect: 'none' },
  prefixedInput: { border: 'none', outline: 'none', padding: '6px 10px', fontSize: '12.5px', color: '#0f172a', backgroundColor: 'transparent', flex: 1, width: '100%' },
  saveBtn: { backgroundColor: '#f4f4f5', color: '#3f3f46', border: '1px solid #cbd5e1', padding: '8px 14px', fontSize: '12px', fontWeight: '500', borderRadius: '4px', cursor: 'pointer', height: '32px', transition: 'all 0.15s ease' },
  cancelBtn: { backgroundColor: '#f4f4f5', border: '1px solid #cbd5e1', color: '#52525b', cursor: 'pointer', fontSize: '11px', fontWeight: '500', padding: '6px 12px', borderRadius: '4px', height: '28px', transition: 'all 0.15s ease' },
  deleteFormBtn: { backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', cursor: 'pointer', fontSize: '11px', fontWeight: '500', padding: '6px 12px', borderRadius: '4px', height: '28px', transition: 'all 0.15s ease' },
  dividerLine: { border: 'none', borderTop: '1px dashed #cbd5e1', margin: '2px 0' },
  header: { display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '12px', flexWrap: 'wrap' },
  tableWrapper: { overflowY: 'auto', overflowX: 'auto', flex: 1, border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '4px 0px 0px 4px', backgroundColor: '#ffffff' },
  table: { borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left', tableLayout: 'fixed' },
  thRow: { backgroundColor: '#f8fafc' },
  th: { padding: '6px 6px', color: '#475569', fontWeight: '600', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', position: 'sticky', top: 0, zIndex: 20, backgroundColor: '#f8fafc', boxShadow: 'inset 0 -1px 0 #cbd5e1' },
  tr: { borderBottom: '1px solid #cbd5e1' },
  td: { padding: '2px 6px', color: '#334155', fontSize: '13px', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', fontWeight: 'normal', height: '28px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  searchRow: { backgroundColor: '#ffffff' },
  searchTd: { padding: '3px 4px', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', backgroundColor: '#ffffff', position: 'sticky', top: '32px', zIndex: 19, boxShadow: 'inset 0 -1px 0 #cbd5e1' },
  inlineSearchInput: { width: '100%', padding: '2px 4px', fontSize: '13px', border: 'none', outline: 'none', boxSizing: 'border-box', color: '#334155', backgroundColor: 'transparent', height: '24px' },
  headerCellFlex: { display: 'flex', alignItems: 'center', justifycontent: 'space-between', gap: '4px' },
  headerPopover: { position: 'absolute', left: '6px', top: '30px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '6px', zIndex: 999, width: '170px', boxSizing: 'border-box' },
  popoverList: { maxHeight: '130px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' },
  dropdownContainer: { position: 'relative', display: 'inline-block' },
  exportBtn: { backgroundColor: '#f4f4f5', color: '#3f3f46', border: '1px solid #cbd5e1', padding: '5px 12px', fontSize: '12px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', height: '28px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.15s ease' },
  dropdownMenu: { position: 'absolute', left: 0, bottom: '32px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)', zIndex: 100, minWidth: '150px', padding: '4px 0' },
  dropdownItem: { display: 'block', width: '100%', padding: '6px 10px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', transition: 'background-color 0.1s', ':hover': { backgroundColor: '#f1f5f9' } },
  dropdownItemContent: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', fontWeight: '500' },
  bottomBar: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', paddingTop: '8px', paddingBottom: '4px', flexWrap: 'wrap', flexShrink: 0, paddingRight: '16px' },
  activeFiltersContainer: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' },
  activeFilterLabel: { fontSize: '11px', fontWeight: '600', color: '#64748b' },
  activeFilterBadgesRow: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' },
  filterBadge: { display: 'inline-flex', alignItems: 'center', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', color: '#334155', gap: '6px' },
  removeBadgeBtn: { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: '700', fontSize: '12px', padding: 0, display: 'flex', alignItems: 'center', justifycontent: 'center', ':hover': { color: '#ef4444' } },
  clearAllFiltersBtnText: { background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: '11px', fontWeight: '600', padding: '3px 6px', ':hover': { textDecoration: 'underline' } }
};