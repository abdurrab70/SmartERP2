import React, { useState } from 'react';

export default function EmployeeDirectory({
  records = [],
  onDeleteEmployee,
}) {
  const [colSearchQueries, setColSearchQueries] = useState({
    empId: '', firstName: '', lastName: '', department: '', designation: '', status: ''
  });

  const filteredRecords = records.filter((rec) => {
    const d = rec.data;
    return (
      String(d.empId).toLowerCase().includes(colSearchQueries.empId.toLowerCase()) &&
      String(d.firstName).toLowerCase().includes(colSearchQueries.firstName.toLowerCase()) &&
      String(d.lastName).toLowerCase().includes(colSearchQueries.lastName.toLowerCase()) &&
      String(d.department).toLowerCase().includes(colSearchQueries.department.toLowerCase()) &&
      String(d.designation).toLowerCase().includes(colSearchQueries.designation.toLowerCase()) &&
      String(d.status).toLowerCase().includes(colSearchQueries.status.toLowerCase())
    );
  });

  const getPaddedDisplayRows = () => {
    const displayList = [...filteredRecords];
    const paddingRequired = Math.max(0, 15 - displayList.length);
    for (let i = 0; i < paddingRequired; i++) {
      displayList.push({ isPlaceholder: true, tempId: `blank-row-${i}` });
    }
    return displayList;
  };

  return (
    <div style={styles.workspace}>
      <style>{`
        .table-row-hover { transition: background-color 0.1s ease; cursor: pointer; }
        .table-row-hover:hover { background-color: #f1f5f9 !important; }
      `}</style>

      <div style={styles.unifiedCard}>
        <div style={styles.tableSection}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={{ ...styles.th, width: '10%' }}>Employee ID</th>
                  <th style={{ ...styles.th, width: '15%' }}>First Name</th>
                  <th style={{ ...styles.th, width: '15%' }}>Last Name</th>
                  <th style={{ ...styles.th, width: '20%' }}>Department</th>
                  <th style={{ ...styles.th, width: '20%' }}>Designation</th>
                  <th style={{ ...styles.th, width: '10%' }}>Status</th>
                  <th style={{ ...styles.th, width: '10%', textAlign: 'center' }}>Action</th>
                </tr>
                {/* Search Inputs */}
                <tr style={styles.searchRow}>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.empId} onChange={(e) => setColSearchQueries({ ...colSearchQueries, empId: e.target.value })} /></td>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.firstName} onChange={(e) => setColSearchQueries({ ...colSearchQueries, firstName: e.target.value })} /></td>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.lastName} onChange={(e) => setColSearchQueries({ ...colSearchQueries, lastName: e.target.value })} /></td>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.department} onChange={(e) => setColSearchQueries({ ...colSearchQueries, department: e.target.value })} /></td>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.designation} onChange={(e) => setColSearchQueries({ ...colSearchQueries, designation: e.target.value })} /></td>
                  <td style={styles.searchTd}><input type="text" style={styles.inlineSearchInput} value={colSearchQueries.status} onChange={(e) => setColSearchQueries({ ...colSearchQueries, status: e.target.value })} /></td>
                  <td style={styles.searchTd}></td>
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
                        <td style={styles.td}>&nbsp;</td>
                        <td style={styles.td}>&nbsp;</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={rec.id} style={styles.tr} className="table-row-hover">
                      <td style={{ ...styles.td, fontWeight: 'bold' }}>{rec.data.empId}</td>
                      <td style={styles.td}>{rec.data.firstName}</td>
                      <td style={styles.td}>{rec.data.lastName}</td>
                      <td style={styles.td}>{rec.data.department}</td>
                      <td style={styles.td}>{rec.data.designation}</td>
                      <td style={styles.td}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          backgroundColor: rec.data.status === 'Active' ? '#dcfce7' : '#fee2e2',
                          color: rec.data.status === 'Active' ? '#166534' : '#991b1b'
                        }}>
                          {rec.data.status}
                        </span>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <button onClick={() => onDeleteEmployee(rec.id)} style={{ color: '#b91c1c', border: 'none', background: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  workspace: { display: 'flex', flexDirection: 'column', gap: '0px', height: '100%' },
  unifiedCard: {
    backgroundColor: 'transparent',
    padding: '0px 0px 0px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', 
    height: 'calc(100vh - 110px)', 
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  tableSection: { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', paddingRight: '16px' },
  tableWrapper: { overflowY: 'auto', flex: 1, border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#ffffff', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', tableLayout: 'fixed' },
  thRow: { backgroundColor: '#f8fafc' },
  th: { padding: '8px', color: '#475569', fontWeight: '600', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', position: 'sticky', top: 0, zIndex: 20, backgroundColor: '#f8fafc', boxShadow: 'inset 0 -1px 0 #cbd5e1' },
  tr: { borderBottom: '1px solid #cbd5e1' },
  td: { padding: '6px 8px', color: '#334155', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '28px' },
  searchRow: { backgroundColor: '#ffffff' },
  searchTd: { padding: '3px 4px', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', backgroundColor: '#ffffff', position: 'sticky', top: '33px', zIndex: 19, boxShadow: 'inset 0 -1px 0 #cbd5e1' },
  inlineSearchInput: { width: '100%', padding: '2px 4px', fontSize: '12px', border: 'none', outline: 'none', boxSizing: 'border-box', color: '#334155', backgroundColor: 'transparent', height: '24px' },
};