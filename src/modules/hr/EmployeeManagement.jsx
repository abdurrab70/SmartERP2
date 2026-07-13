import React, { useState, useEffect, useRef } from 'react';

export default function EmployeeManagement({
  records = [],
  setupRecords = {}, // Dynamic lookup sources!
  activeEditingEmployee = null, // Received editing target profile!
  onSaveEmployee,
  onDeleteEmployee, // Received in-form delete action!
}) {
  const [activeTab, setActiveTab] = useState('general');

  // DOCUMENT PREVIEW MODAL STATE
  const [previewModalUrl, setPreviewModalUrl] = useState(null);

  // TAB 1: BASIC GENERAL & IDENTITY INFORMATION STATES
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameBangla, setNameBangla] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(''); // Initial blank
  const [maritalStatus, setMaritalStatus] = useState(''); // Initial blank
  const [religion, setReligion] = useState(''); // Initial blank
  const [bloodGroup, setBloodGroup] = useState(''); // Initial blank
  const [nationality, setNationality] = useState('Bangladeshi');
  
  // Tab 1 New Additions (Medical & Physical)
  const [vaccineStatus, setVaccineStatus] = useState(''); // Initial blank
  const [chronicIllness, setChronicIllness] = useState('');

  // TAB 2: CONTACTS STATES
  const [phone, setPhone] = useState('');
  const [phoneSec, setPhoneSec] = useState('');
  const [email, setEmail] = useState('');
  const [presAddress1, setPresAddress1] = useState('');
  const [presAddress2, setPresAddress2] = useState('');
  const [presCity, setPresCity] = useState('');
  const [presDistrict, setPresDistrict] = useState('');
  const [permAddress, setPermAddress] = useState('');
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState(''); // Initial blank
  const [emergencyPhone, setEmergencyPhone] = useState('');
  
  // Tab 2 New Additions (Nominee & Family)
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState(''); // Initial blank
  const [nomineeNid, setNomineeNid] = useState('');
  const [childrenCount, setChildrenCount] = useState('0');

  // TAB 3: IDENTITY DOCUMENTS STATES
  const [nid, setNid] = useState('');
  const [nidIssueDate, setNidIssueDate] = useState('');
  const [birthReg, setBirthReg] = useState('');
  const [passport, setPassport] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [bgmeaCard, setBgmeaCard] = useState('');
  const [tin, setTin] = useState('');
  
  // Tab 3 New Additions (Security Credentials)
  const [rfidCard, setRfidCard] = useState('');
  const [policeVerification, setPoliceVerification] = useState(''); // Initial blank

  // TAB 4: JOB INFORMATION STATES
  const [factory, setFactory] = useState(''); // Initial blank
  const [department, setDepartment] = useState(''); // Initial blank
  const [designation, setDesignation] = useState(''); // Initial blank
  const [empType, setEmpType] = useState(''); // Initial blank
  const [category, setCategory] = useState(''); // Initial blank
  const [jobGrade, setJobGrade] = useState('');
  const [unit, setUnit] = useState(''); // Initial blank
  const [line, setLine] = useState(''); // Initial blank
  const [shift, setShift] = useState(''); // Initial blank
  const [reportingManager, setReportingManager] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [probation, setProbation] = useState('3');
  const [confirmationDate, setConfirmationDate] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  
  // Tab 4 New Additions (Maternity & Service Period)
  const [servicePeriod, setServicePeriod] = useState('0 Days'); // Auto calculated!
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [maternityLeaveStart, setMaternityLeaveStart] = useState('');
  const [maternityLeaveEnd, setMaternityLeaveEnd] = useState('');
  const [maternityBenefits, setMaternityBenefits] = useState(''); // Initial blank

  // TAB 5: SALARY & PAYROLL STATES
  const [basicSalary, setBasicSalary] = useState('');
  const [houseRent, setHouseRent] = useState('');
  const [medical, setMedical] = useState('');
  const [transport, setTransport] = useState('');
  const [food, setFood] = useState('');
  const [otherAllowance, setOtherAllowance] = useState('');
  const [grossSalary, setGrossSalary] = useState(0);
  const [paymentMode, setPaymentMode] = useState(''); // Initial blank
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [mfsNumber, setMfsNumber] = useState('');
  const [providentFund, setProvidentFund] = useState(''); // Initial blank
  const [pfContribution, setPfContribution] = useState('0');
  const [incomeTax, setIncomeTax] = useState(''); // Initial blank
  const [overtime, setOvertime] = useState(''); // Initial blank

  // Financial Security
  const [groupInsurance, setGroupInsurance] = useState('');
  const [gratuityEligible, setGratuityEligible] = useState(''); // Initial blank
  const [wppfStatus, setWppfStatus] = useState(''); // Initial blank

  // TAB 6: MULTIPLE ACADEMIC EDUCATION STATES
  const [educationList, setEducationList] = useState([]);
  const [tmpEduLevel, setTmpEduLevel] = useState('SSC');
  const [tmpExamName, setTmpExamName] = useState('');
  const [tmpSchoolName, setTmpSchoolName] = useState('');
  const [tmpSchoolBoard, setTmpSchoolBoard] = useState('');
  const [tmpPassYear, setTmpPassingYear] = useState('');
  const [tmpSchoolResult, setTmpSchoolResult] = useState('');
  const [tmpSchoolSubject, setTmpSchoolSubject] = useState('Science');

  // TAB 7: MULTIPLE WORK EXPERIENCE STATES
  const [experienceList, setExperienceList] = useState([]);
  const [tmpPrevCompany, setTmpPrevCompany] = useState('');
  const [tmpPrevDesignation, setTmpPrevDesignation] = useState('');
  const [tmpWorkFrom, setTmpWorkFrom] = useState('');
  const [tmpWorkTo, setTmpWorkTo] = useState('');
  const [totalExp, setTotalExp] = useState('0');
  const [tmpLeftReason, setTmpLeftReason] = useState('');
  const [tmpRefName, setTmpRefName] = useState('');
  const [tmpRefContact, setTmpRefContact] = useState('');

  // TAB 8: MULTIPLE SKILLS & TRAININGS STATES
  const [skillsList, setSkillsList] = useState([]);
  const [tmpSewingOp, setTmpSewingOp] = useState('');
  const [tmpMachineType, setTmpMachineType] = useState('Single Needle');
  const [tmpTrainName, setTmpTrainName] = useState('');
  const [tmpTrainInst, setTmpTrainInst] = useState('');
  const [tmpTrainDur, setTmpTrainDuration] = useState('');
  const [tmpTrainDate, setTmpTrainDate] = useState('');
  const [tmpTrainCert, setTmpTrainCert] = useState('No');
  const [tmpEfficiency, setTmpEfficiency] = useState('');

  // TAB 9: FILE OBJECTS STORAGE METADATA STATE
  const [fileMetadata, setFileMetadata] = useState({
    nidFront: { url: '', name: '', size: '' }, 
    nidBack: { url: '', name: '', size: '' }, 
    nidCombined: { url: '', name: '', size: '' }, 
    photo: { url: '', name: '', size: '' }, 
    birthCert: { url: '', name: '', size: '' },
    academicCert: { url: '', name: '', size: '' }, 
    experienceLetter: { url: '', name: '', size: '' }, 
    medicalCert: { url: '', name: '', size: '' },
    bankDoc: { url: '', name: '', size: '' }, 
    policeClearance: { url: '', name: '', size: '' }
  });
  const [photoUrl, setPhotoUrl] = useState(''); // Dynamic photo image sync!

  // TAB 10: SYSTEM SETTINGS & AUDIT STATES
  const [status, setStatus] = useState('Active');
  const [deviceID, setDeviceID] = useState('');
  const [leaveGroup, setLeaveGroup] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // Tab 10 New Additions (Disciplinary & Compliance)
  const [warningLetters, setWarningLetters] = useState('0');
  const [suspensionHistory, setSuspensionHistory] = useState('');
  const [unionMember, setUnionMember] = useState('No');

  const firstInputRef = useRef(null);

  // DEFENSIVE OPTIONAL CHAINING TO STOP THE WHITE PAGE ERROR AND DATA CRASHES
  const factoryDropdown = (setupRecords?.factory || []).map(r => r?.data?.name || '');
  const departmentDropdown = (setupRecords?.department || []).map(r => r?.data?.name || '');
  const designationDropdown = (setupRecords?.designation || []).map(r => r?.data?.name || '');
  const shiftDropdown = (setupRecords?.shift || []).map(r => r?.data?.name || '');
  const unitDropdown = (setupRecords?.unit || []).map(r => r?.data?.name || '');
  const lineDropdown = (setupRecords?.line || []).map(r => r?.data?.name || '');
  const empTypesDropdown = (setupRecords?.employee_type || []).map(r => r?.data?.name || '');

  // AUTO-GENERATE CODES & DEFAULTS
  const generateEmpId = () => `EMP-${String(records.length + 1).padStart(4, '0')}`;

  // AUTOMATIC CONFIRMATION DATE GENERATION (Joining Date + Probation Months)
  useEffect(() => {
    if (joiningDate) {
      const join = new Date(joiningDate);
      join.setMonth(join.getMonth() + parseInt(probation || 0, 10));
      setConfirmationDate(join.toISOString().split('T')[0]);
    }
  }, [joiningDate, probation]);

  // AUTOMATIC GROSS SALARY GENERATION (Basic + HouseRent + Medical + Transport + Food + Other)
  useEffect(() => {
    const total = 
      parseFloat(basicSalary || 0) + 
      parseFloat(houseRent || 0) + 
      parseFloat(medical || 0) + 
      parseFloat(transport || 0) + 
      parseFloat(food || 0) + 
      parseFloat(otherAllowance || 0);
    setGrossSalary(total);
  }, [basicSalary, houseRent, medical, transport, food, otherAllowance]);

  // totalExp Experience Year Calculator (Work From To Work To)
  useEffect(() => {
    if (tmpWorkFrom && tmpWorkTo) {
      const start = new Date(tmpWorkFrom);
      const end = new Date(tmpWorkTo);
      const diffTime = Math.abs(end - start);
      const diffYears = (diffTime / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
      setTotalExp(diffYears);
    }
  }, [tmpWorkFrom, tmpWorkTo]);

  // DYNAMIC SERVICE PERIOD CALCULATOR ENGINE
  useEffect(() => {
    if (joiningDate) {
      const joinDate = new Date(joiningDate);
      const today = new Date();
      
      if (joinDate > today) {
        setServicePeriod('Not Joined Yet');
        return;
      }

      let years = today.getFullYear() - joinDate.getFullYear();
      let months = today.getMonth() - joinDate.getMonth();
      let days = today.getDate() - joinDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      let duration = [];
      if (years > 0) duration.push(`${years} Year${years > 1 ? 's' : ''}`);
      if (months > 0) duration.push(`${months} Month${months > 1 ? 's' : ''}`);
      if (days > 0) duration.push(`${days} Day${days > 1 ? 's' : ''}`);

      setServicePeriod(duration.length > 0 ? duration.join(', ') : '0 Days');
    } else {
      setServicePeriod('0 Days');
    }
  }, [joiningDate]);

  // sameAsPresent Address Synchronizer
  useEffect(() => {
    if (sameAsPresent) {
      setPermAddress(`${presAddress1} ${presAddress2 || ''}, ${presCity}, ${presDistrict}`);
    } else {
      setPermAddress('');
    }
  }, [sameAsPresent, presAddress1, presAddress2, presCity, presDistrict]);

  // DYNAMIC PROFILE STATE PRE-FILLER ON EDIT MODE
  useEffect(() => {
    if (activeEditingEmployee) {
      const d = activeEditingEmployee.data || {};
      setFirstName(d.firstName || '');
      setLastName(d.lastName || '');
      setNameBangla(d.nameBangla || '');
      setFatherName(d.fatherName || '');
      setMotherName(d.motherName || '');
      setDob(d.dob || '');
      setGender(d.gender || '');
      setMaritalStatus(d.maritalStatus || '');
      setReligion(d.religion || '');
      setBloodGroup(d.bloodGroup || '');
      setNationality(d.nationality || 'Bangladeshi');
      setVaccineStatus(d.vaccineStatus || '');
      setChronicIllness(d.chronicIllness || '');
      setPhone(d.phone || '');
      setPhoneSec(d.phoneSec || '');
      setEmail(d.email || '');
      setPresAddress1(d.presAddress1 || '');
      setPresAddress2(d.presAddress2 || '');
      setPresCity(d.presCity || '');
      setPresDistrict(d.presDistrict || '');
      setPermAddress(d.permAddress || '');
      setSameAsPresent(false);
      setEmergencyName(d.emergencyName || '');
      setEmergencyRelation(d.emergencyRelation || '');
      setEmergencyPhone(d.emergencyPhone || '');
      setNomineeName(d.nomineeName || '');
      setNomineeRelation(d.nomineeRelation || '');
      setNomineeNid(d.nomineeNid || '');
      setChildrenCount(d.childrenCount || '0');
      setNid(d.nid || '');
      setNidIssueDate(d.nidIssueDate || '');
      setBirthReg(d.birthReg || '');
      setPassport(d.passport || '');
      setPassportExpiry(d.passportExpiry || '');
      setBgmeaCard(d.bgmeaCard || '');
      setTin(d.tin || '');
      setRfidCard(d.rfidCard || '');
      setPoliceVerification(d.policeVerification || '');
      setFactory(d.factory || '');
      setDepartment(d.department || '');
      setDesignation(d.designation || '');
      setEmpType(d.empType || '');
      setCategory(d.category || '');
      setJobGrade(d.jobGrade || '');
      setUnit(d.unit || '');
      setLine(d.line || '');
      setShift(d.shift || '');
      setReportingManager(d.reportingManager || '');
      setJoiningDate(d.joiningDate || '');
      setProbation(d.probation || '3');
      setConfirmationDate(d.confirmationDate || '');
      setJobLocation(d.jobLocation || '');
      setExpectedDeliveryDate(d.expectedDeliveryDate || '');
      setMaternityLeaveStart(d.maternityLeaveStart || '');
      setMaternityLeaveEnd(d.maternityLeaveEnd || '');
      setMaternityBenefits(d.maternityBenefits || '');
      setBasicSalary(d.basicSalary || '');
      setHouseRent(d.houseRent || '');
      setMedical(d.medical || '');
      setTransport(d.transport || '');
      setFood(d.food || '');
      setOtherAllowance(d.otherAllowance || '');
      setPaymentMode(d.paymentMode || '');
      setBankName(d.bankName || '');
      setBankAccount(d.bankAccount || '');
      setBankBranch(d.bankBranch || '');
      setMfsNumber(d.mfsNumber || '');
      setProvidentFund(d.providentFund || '');
      setPfContribution(d.pfContribution || '0');
      setIncomeTax(d.incomeTax || '');
      setOvertime(d.overtime || '');
      setGroupInsurance(d.groupInsurance || '');
      setGratuityEligible(d.gratuityEligible || '');
      setWppfStatus(d.wppfStatus || '');
      setPhotoUrl(d.photo || ''); // Loads saved photo Blob URL!
      
      // Load Multiple Arrays directly
      setEducationList(d.educationList || []);
      setExperienceList(d.experienceList || []);
      setSkillsList(d.skillsList || []);

      // Load Document attachments previews directly! (SOLVES MULTI-SESSION FILE PREVIEWING!)
      setFileMetadata(d.fileMetadata || {
        nidFront: { url: '', name: '', size: '' }, nidBack: { url: '', name: '', size: '' }, nidCombined: { url: '', name: '', size: '' }, photo: { url: '', name: '', size: '' }, birthCert: { url: '', name: '', size: '' },
        academicCert: { url: '', name: '', size: '' }, experienceLetter: { url: '', name: '', size: '' }, medicalCert: { url: '', name: '', size: '' },
        bankDoc: { url: '', name: '', size: '' }, policeClearance: { url: '', name: '', size: '' }
      });
    } else {
      // Clear Form on Normal fresh register mode
      setFirstName(''); setLastName(''); setNameBangla(''); setFatherName(''); setMotherName(''); setDob('');
      setPhone(''); setNid(''); setBasicSalary(''); setHouseRent(''); setMedical(''); setTransport('');
      setFood(''); setOtherAllowance(''); setJoiningDate(''); setPhotoUrl('');
      setGender(''); setMaritalStatus(''); setReligion(''); setBloodGroup(''); setVaccineStatus('');
      setEmergencyRelation(''); setNomineeRelation(''); setPoliceVerification(''); setFactory('');
      setDepartment(''); setDesignation(''); setEmpType(''); setCategory(''); setShift(''); setPaymentMode('');
      setProvidentFund(''); setIncomeTax(''); setOvertime(''); setGratuityEligible(''); setWppfStatus(''); setMaternityBenefits('');
      setEducationList([]); setExperienceList([]); setSkillsList([]);
      setFileMetadata({
        nidFront: { url: '', name: '', size: '' }, nidBack: { url: '', name: '', size: '' }, nidCombined: { url: '', name: '', size: '' }, photo: { url: '', name: '', size: '' }, birthCert: { url: '', name: '', size: '' },
        academicCert: { url: '', name: '', size: '' }, experienceLetter: { url: '', name: '', size: '' }, medicalCert: { url: '', name: '', size: '' },
        bankDoc: { url: '', name: '', size: '' }, policeClearance: { url: '', name: '', size: '' }
      });
    }
  }, [activeEditingEmployee]);

  // STORAGE-SAVING FILE METADATA CONVERTER (STORES FILES SIZE & NAME IN BYTES TO SHIELD DATABASE FROM EXCEEDING QUOTA)
  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0];
    if (file) {
      // Format file size nicely
      const sizeInKb = file.size / 1024;
      const sizeStr = sizeInKb > 1024 
        ? (sizeInKb / 1024).toFixed(1) + ' MB' 
        : sizeInKb.toFixed(0) + ' KB';

      // Store a lightweight temporary object URL for current browser session preview
      const previewUrl = URL.createObjectURL(file);
      
      setFileMetadata(prev => ({
        ...prev,
        [fileKey]: { url: previewUrl, name: file.name, size: sizeStr }
      }));

      if (fileKey === 'photo') {
        setPhotoUrl(previewUrl); // Sync photo URL state!
      }
    }
  };

  const handleOpenPreview = (fileKey) => {
    const url = fileMetadata[fileKey]?.url;
    if (url) {
      setPreviewModalUrl({ url, name: fileMetadata[fileKey]?.name || 'Document.pdf' });
    } else {
      alert("No active attachment detected in this browser session. To protect database quota, actual binaries are not saved permanently. Please re-attach the file to view.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalId = activeEditingEmployee ? activeEditingEmployee.id : Date.now();
    const finalEmpId = activeEditingEmployee ? activeEditingEmployee.data.empId : generateEmpId();

    // Strips out any heavy local session URL pointers before committing to database!
    const strippedMetadata = {};
    Object.keys(fileMetadata).forEach(key => {
      strippedMetadata[key] = {
        name: fileMetadata[key]?.name || '',
        size: fileMetadata[key]?.size || ''
      };
    });

    onSaveEmployee({
      id: finalId,
      empId: finalEmpId,
      firstName, lastName, nameBangla, fatherName, motherName, dob, gender, maritalStatus, religion, bloodGroup, nationality,
      vaccineStatus, chronicIllness,
      photo: photoUrl || (activeEditingEmployee ? activeEditingEmployee.data.photo : null), 
      phone, phoneSec, email, presAddress1, presAddress2, presCity, presDistrict, permAddress, emergencyName, emergencyRelation, emergencyPhone,
      nomineeName, nomineeRelation, nomineeNid, childrenCount,
      nid, nidIssueDate, birthReg, passport, passportExpiry, bgmeaCard, tin, rfidCard, policeVerification,
      factory, department, designation, empType, category, jobGrade, unit, line, shift, reportingManager, joiningDate, probation, confirmationDate, jobLocation,
      servicePeriod, expectedDeliveryDate, maternityLeaveStart, maternityLeaveEnd, maternityBenefits,
      basicSalary, houseRent, medical, transport, food, otherAllowance, grossSalary, paymentMode, bankName, bankAccount, bankBranch, mfsNumber, providentFund, pfContribution, incomeTax,
      overtime, groupInsurance, gratuityEligible, wppfStatus,
      educationList, experienceList, skillsList, // Arrays appended perfectly!
      fileMetadata: strippedMetadata, // Only the name & size metadata is saved, keeping the database extremely light!
      status, deviceID, leaveGroup, remarks, warningLetters, suspensionHistory, unionMember
    });

    if (!activeEditingEmployee) {
      setFirstName(''); setLastName(''); setNameBangla(''); setFatherName(''); setMotherName(''); setDob('');
      setPhone(''); setNid(''); setBasicSalary(''); setHouseRent(''); setMedical(''); setTransport('');
      setFood(''); setOtherAllowance(''); setJoiningDate(''); setPhotoUrl('');
      setGender(''); setMaritalStatus(''); setReligion(''); setBloodGroup(''); setVaccineStatus('');
      setEmergencyRelation(''); setNomineeRelation(''); setPoliceVerification(''); setFactory('');
      setDepartment(''); setDesignation(''); setEmpType(''); setCategory(''); setShift(''); setPaymentMode('');
      setProvidentFund(''); setIncomeTax(''); setOvertime(''); setGratuityEligible(''); setWppfStatus(''); setMaternityBenefits('');
      setEducationList([]); setExperienceList([]); setSkillsList([]);
      setFileMetadata({
        nidFront: { url: '', name: '', size: '' }, nidBack: { url: '', name: '', size: '' }, nidCombined: { url: '', name: '', size: '' }, photo: { url: '', name: '', size: '' }, birthCert: { url: '', name: '', size: '' },
        academicCert: { url: '', name: '', size: '' }, experienceLetter: { url: '', name: '', size: '' }, medicalCert: { url: '', name: '', size: '' },
        bankDoc: { url: '', name: '', size: '' }, policeClearance: { url: '', name: '', size: '' }
      });
      setActiveTab('general');
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent px-4 box-sizing-border-box overflow-hidden">
      
      {/* NATIVE BRAND ORANGE BORDER GLOW FOCUS AND 10PX COMPACT SPACING STYLES (STRICTLY NO BOX SHADOWS!) */}
      <style>{`
        .input-glow-focus:focus { border-color: #ea580c !important; outline: none !important; box-shadow: none !important; }
        .tab-bar-container::-webkit-scrollbar { display: none !important; }
        .tab-bar-container { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      {/* INNER WRAPPER CONFIGURED WITH 0PX PADDING & MARGIN AT THE BORDERS */}
      <div className="bg-[#f8fafc] border border-slate-200 p-0 m-0 flex flex-col flex-1 overflow-hidden">
        
        {/* SUB-TABS SELECTOR BAR (FLAT EDGE TABS TOUCHING THE CELL TOP) */}
        <div className="flex border-b border-slate-200 shrink-0 overflow-x-auto scrollbar-none bg-slate-50">
          {['general', 'contacts', 'job', 'salary', 'education', 'experience', 'skills', 'uploads', 'system'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`py-2.5 px-4 text-[11px] font-bold border-r border-slate-200 border-b-2 cursor-pointer transition-all ${
                activeTab === t 
                  ? 'bg-white border-b-[#ea580c] text-[#ea580c]' 
                  : 'border-b-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* INPUT FORM CONTENT PANEL */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden p-4">
          <div className="flex-1 overflow-y-auto pr-2 gap-y-4 flex flex-col scrollbar-none">
            
            {/* TAB 1: BASIC GENERAL & IDENTITY INFORMATION (MERGED!) */}
            {activeTab === 'general' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-[11px] font-semibold text-slate-600">Employee ID</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs font-bold bg-slate-100 cursor-not-allowed text-slate-700" value={activeEditingEmployee ? activeEditingEmployee.data.empId : generateEmpId()} />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-[11px] font-semibold text-slate-600">English First Name <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Mohammad" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-[11px] font-semibold text-slate-600">English Last Name <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Rahman" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-[11px] font-semibold text-slate-600">বাংলা নাম (ঐচ্ছিক)</label>
                  <input type="text" placeholder="মোহাম্মদ রহমান" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={nameBangla} onChange={(e) => setNameBangla(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Father's Name <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Father Name" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Mother's Name <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Mother Name" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Date of Birth <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="date" required className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600 font-medium">Gender <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">_</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Marital Status <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                    <option value="">_</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Religion</label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={religion} onChange={(e) => setReligion(e.target.value)}>
                    <option value="">_</option><option value="Islam">Islam</option><option value="Hindu">Hindu</option><option value="Christian">Christian</option><option value="Buddhist">Buddhist</option><option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Blood Group</label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                    <option value="">_</option><option value="O+">O+</option><option value="O-">O-</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Nationality <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                </div>
                
                {/* Advanced Tab 1 Additions (Vaccination & Illnesses) */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Vaccination Status</label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={vaccineStatus} onChange={(e) => setVaccineStatus(e.target.value)}>
                    <option value="">_</option><option value="Not Vaccinated">Not Vaccinated</option><option value="1st Dose Completed">1st Dose Completed</option><option value="2nd Dose Completed">2nd Dose Completed</option><option value="Booster Dose Completed">Booster Dose Completed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 col-span-3">
                  <label className="text-[11px] font-semibold text-slate-600">Chronic Illnesses & Allergies</label>
                  <input type="text" placeholder="e.g. Asthma, Dust Allergy" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={chronicIllness} onChange={(e) => setChronicIllness(e.target.value)} />
                </div>

                {/* TAB 3 IDENTITY FIELDS INCORPORATED DIRECTLY INTO GENERAL TAB */}
                <div className="flex flex-col gap-1 col-span-4 mt-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700">Official Identity Details (জাতীয় পরিচয়পত্র ও কার্ড বিবরণী)</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">National ID (NID) <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="NID Number" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={nid} onChange={(e) => setNid(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">NID Issue Date</label>
                  <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={nidIssueDate} onChange={(e) => setNidIssueDate(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Birth Registration Number</label>
                  <input type="text" placeholder="Birth Registration" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={birthReg} onChange={(e) => setBirthReg(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Passport Number</label>
                  <input type="text" placeholder="Passport No" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={passport} onChange={(e) => setPassport(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Passport Expiry Date</label>
                  <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">BGMEA / BKMEA Card No</label>
                  <input type="text" placeholder="Card No" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={bgmeaCard} onChange={(e) => setBgmeaCard(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">TIN Number (Taxpayer ID)</label>
                  <input type="text" placeholder="TIN Number" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={tin} onChange={(e) => setTin(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">RFID Card / Proximity ID</label>
                  <input type="text" placeholder="RFID Chip Number" className="p-2 border border-[#cbd5e1] text-xs bg-slate-100 cursor-not-allowed outline-none input-glow-focus transition-all" value={rfidCard} onChange={(e) => setRfidCard(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Police Verification Background Check</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={policeVerification} onChange={(e) => setPoliceVerification(e.target.value)}>
                    <option value="">_</option><option value="Not Checked">Not Checked</option><option value="Pending">Pending</option><option value="Passed">Verified & Passed</option><option value="Failed">Failed / Discrepancy</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 2: CONTACTS INFORMATION & NOMINEE */}
            {activeTab === 'contacts' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Mobile Number (Primary) <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="tel" required placeholder="017xxxxxxxx" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Mobile Number (Secondary)</label>
                  <input type="tel" placeholder="018xxxxxxxx" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={phoneSec} onChange={(e) => setPhoneSec(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-[11px] font-semibold text-slate-600">Email Address (Optional)</label>
                  <input type="email" placeholder="example@smartex.com" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Present Address Line 1 <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="House / Village, Street" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={presAddress1} onChange={(e) => setPresAddress1(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Present Address Line 2</label>
                  <input type="text" placeholder="Post Office / Sector" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={presAddress2} onChange={(e) => setPresAddress2(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Present City / Thana <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Thana" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={presCity} onChange={(e) => setPresCity(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Present District <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="District" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={presDistrict} onChange={(e) => setPresDistrict(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 col-span-2 pt-5">
                  <input type="checkbox" id="sameAsPresent" checked={sameAsPresent} onChange={(e) => setSameAsPresent(e.target.checked)} className="cursor-pointer" />
                  <label htmlFor="sameAsPresent" className="text-xs text-slate-600 cursor-pointer select-none">Permanent Address is same as present</label>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-[11px] font-semibold text-slate-600">Permanent Address <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required disabled={sameAsPresent} placeholder="Permanent Complete Address" className={`p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all ${sameAsPresent ? 'bg-slate-100 cursor-not-allowed' : ''}`} value={permAddress} onChange={(e) => setPermAddress(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Emergency Contact Name <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" required placeholder="Contact Name" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Relation <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={emergencyRelation} onChange={(e) => setEmergencyRelation(e.target.value)}>
                    <option value="">_</option><option value="Father">Father</option><option value="Mother">Mother</option><option value="Spouse">Spouse</option><option value="Brother">Brother</option><option value="Sister">Sister</option><option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Emergency Phone <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="tel" required placeholder="01xxxxxxxxx" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
                </div>
                {/* Nominee Details & Children Count Consolidated */}
                <div className="flex flex-col gap-1 col-span-4 mt-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700">Nominee & Family Welfare (মনোনীত ব্যক্তি ও পারিবারিক বিবরণী)</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Nominee Full Name</label>
                  <input type="text" placeholder="Nominee Name" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 font-medium">
                  <label className="text-[11px] font-semibold text-slate-600">Nominee Relation</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={nomineeRelation} onChange={(e) => setNomineeRelation(e.target.value)}>
                    <option value="">_</option><option value="Spouse">Spouse</option><option value="Father">Father</option><option value="Mother">Mother</option><option value="Child">Child</option><option value="Sibling">Sibling</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Nominee National ID (NID)</label>
                  <input type="text" placeholder="Nominee NID Number" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={nomineeNid} onChange={(e) => setNomineeNid(e.target.value)} />
                </div>
                {/* CONDITIONAL "NUMBER OF CHILDREN" VISIBILITY BASED ON MARITAL STATUS */}
                {['Married', 'Divorced', 'Widowed'].includes(maritalStatus) && (
                  <div className="flex flex-col gap-1 col-span-2 animate-in fade-in duration-150">
                    <label className="text-[11px] font-semibold text-slate-600">Number of Children (daycare assistance tracking)</label>
                    <input type="number" min="0" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={childrenCount} onChange={(e) => setChildrenCount(e.target.value)} />
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: JOB INFORMATION & MATERNITY */}
            {activeTab === 'job' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Active Factory Lookup <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={factory} onChange={(e) => setFactory(e.target.value)}>
                    <option value="">_</option>
                    {factoryDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Department Lookup <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">_</option>
                    {departmentDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Designation Lookup <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                    <option value="">_</option>
                    {designationDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Employment Type <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={empType} onChange={(e) => setEmpType(e.target.value)}>
                    <option value="">_</option><option value="Permanent">Permanent</option><option value="Temporary">Temporary</option><option value="Casual">Casual</option><option value="Contractual">Contractual</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Worker Category <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">_</option><option value="Operator">Operator</option><option value="Helper">Helper</option><option value="Staff">Staff</option><option value="Officer">Officer</option><option value="Management">Management</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Job/Pay Grade Lookup <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="text" placeholder="e.g. Grade 5" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={jobGrade} onChange={(e) => setJobGrade(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Floor / Unit</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="">_</option>
                    {unitDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Section / Line</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={line} onChange={(e) => setLine(e.target.value)}>
                    <option value="">_</option>
                    {lineDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Shift <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={shift} onChange={(e) => setShift(e.target.value)}>
                    <option value="">_</option>
                    {shiftDropdown.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Reporting Manager</label>
                  <input type="text" placeholder="Line Manager Name" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={reportingManager} onChange={(e) => setReportingManager(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Joining Date <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="date" required className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Probation (Months)</label>
                  <input type="number" min="0" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={probation} onChange={(e) => setProbation(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Auto Confirmation Date</label>
                  <input type="text" disabled className="p-2 border border-[#cbd5e1] text-xs bg-slate-100 cursor-not-allowed font-semibold text-slate-700" value={confirmationDate} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Job Location</label>
                  <input type="text" placeholder="Desk Location" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
                </div>

                {/* ADVANCED SERVICE PERIOD DISPLAY */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 font-bold">Total Service Period (চাকরির সময়কাল)</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs bg-slate-100 font-bold cursor-not-allowed text-orange-600" value={servicePeriod} />
                </div>

                {/* Maternity Benefits Tracker Consolidated here */}
                <div className="flex flex-col gap-1 col-span-4 mt-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700">Maternity Benefit & Leave Tracker (মাতৃত্বকালীন সুবিধা ট্র্যাকিং)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Expected Delivery Date (EDD)</label>
                  <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={expectedDeliveryDate} onChange={(e) => setExpectedDeliveryDate(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Maternity Leave Start</label>
                  <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={maternityLeaveStart} onChange={(e) => setMaternityLeaveStart(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Maternity Leave End</label>
                  <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={maternityLeaveEnd} onChange={(e) => setMaternityLeaveEnd(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Maternity Benefit Instalment</label>
                  <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={maternityBenefits} onChange={(e) => setMaternityBenefits(e.target.value)}>
                    <option value="">_</option>
                    <option value="Not Applicable">Not Applicable</option>
                    <option value="1st Payment Completed">1st Payment Completed</option>
                    <option value="Both Payments Completed">1st & 2nd Payments Completed</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 4: SALARY & PAYROLL BENEFITS + OVERTIME ELIGIBLE */}
            {activeTab === 'salary' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Basic Salary (BDT) <span className="text-[#ea580c] font-bold">*</span></label>
                  <input type="number" required placeholder="Basic Amount" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">House Rent Allowance</label>
                  <input type="number" placeholder="Rent Amount" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={houseRent} onChange={(e) => setHouseRent(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Medical Allowance</label>
                  <input type="number" placeholder="Medical Amount" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={medical} onChange={(e) => setMedical(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Transport Allowance</label>
                  <input type="number" placeholder="Transport Amount" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={transport} onChange={(e) => setTransport(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Food Allowance</label>
                  <input type="number" placeholder="Food Amount" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={food} onChange={(e) => setFood(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Other Allowances</label>
                  <input type="number" placeholder="Other Allowances" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={otherAllowance} onChange={(e) => setOtherAllowance(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600 font-bold">Auto Gross Salary (BDT)</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs font-bold bg-slate-100 cursor-not-allowed" value={`${grossSalary} BDT`} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Payment Mode <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="">_</option><option value="Cash">Cash</option><option value="Bank">Bank</option><option value="bKash">bKash</option><option value="Nagad">Nagad</option>
                  </select>
                </div>
                {paymentMode === 'Bank' && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Bank Name <span className="text-[#ea580c] font-bold">*</span></label>
                      <input type="text" required placeholder="Bank Brand Name" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Bank Account Number <span className="text-[#ea580c] font-bold">*</span></label>
                      <input type="text" required placeholder="Account Number" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Bank Branch Name <span className="text-[#ea580c] font-bold">*</span></label>
                      <input type="text" required placeholder="Branch Location" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={bankBranch} onChange={(e) => setBankBranch(e.target.value)} />
                    </div>
                  </>
                )}
                {(paymentMode === 'bKash' || paymentMode === 'Nagad') && (
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">MFS Wallet Mobile No <span className="text-[#ea580c] font-bold">*</span></label>
                    <input type="tel" required placeholder="017xxxxxxxx" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={mfsNumber} onChange={(e) => setMfsNumber(e.target.value)} />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Provident Fund Member</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={providentFund} onChange={(e) => setProvidentFund(e.target.value)}>
                    <option value="">_</option><option value="No">No</option><option value="Yes">Yes</option>
                  </select>
                </div>
                {providentFund === 'Yes' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">PF Contribution (%) <span className="text-[#ea580c] font-bold">*</span></label>
                    <input type="number" required min="0" max="100" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={pfContribution} onChange={(e) => setPfContribution(e.target.value)} />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Income Tax Applicable</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={incomeTax} onChange={(e) => setIncomeTax(e.target.value)}>
                    <option value="">_</option><option value="No">No</option><option value="Yes">Yes</option>
                  </select>
                </div>
                
                {/* OVERTIME ELIGIBLE CONFIGURED WITH ORANGE BORDER AND BLANK STATE */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Overtime Eligible <span className="text-[#ea580c] font-bold">*</span></label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={overtime} onChange={(e) => setOvertime(e.target.value)}>
                    <option value="">_</option><option value="Yes">Yes</option><option value="No">No</option>
                  </select>
                </div>

                {/* Advanced Tab 5 Additions (Financial Security) */}
                <div className="flex flex-col gap-1 col-span-4 mt-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700">Financial Security & Welfare Benefits (আর্থিক কল্যাণ তহবিল)</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Group Insurance Policy Number</label>
                  <input type="text" placeholder="Insurance Policy No" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={groupInsurance} onChange={(e) => setGroupInsurance(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Gratuity Eligibility Year</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={gratuityEligible} onChange={(e) => setGratuityEligible(e.target.value)}>
                    <option value="">_</option><option value="No">No</option><option value="Yes">Yes (Eligible)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">WPPF Share Status</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={wppfStatus} onChange={(e) => setWppfStatus(e.target.value)}>
                    <option value="">_</option><option value="No">No</option><option value="Yes (Active Member)">Yes (Active Member)</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 5: MULTIPLE ACADEMIC EDUCATION LIST BUILDER */}
            {activeTab === 'education' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <span className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-1">Education Qualifications Directory</span>
                
                {/* Render added degrees in an elegant mini-grid */}
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 font-bold">
                        <th className="p-1.5">Level</th>
                        <th className="p-1.5">Degree</th>
                        <th className="p-1.5">Institution</th>
                        <th className="p-1.5">Board</th>
                        <th className="p-1.5">Year</th>
                        <th className="p-1.5">Result</th>
                        <th className="p-1.5">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educationList.length === 0 ? (
                        <tr><td colSpan="7" className="p-3 text-slate-400 text-center font-medium italic">No academic qualifications added yet. Use form below to add.</td></tr>
                      ) : (
                        educationList.map((item, idx) => (
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 font-medium">
                            <td className="p-1.5">{item.level}</td>
                            <td className="p-1.5">{item.examName}</td>
                            <td className="p-1.5">{item.schoolName}</td>
                            <td className="p-1.5">{item.board}</td>
                            <td className="p-1.5">{item.year}</td>
                            <td className="p-1.5">{item.result}</td>
                            <td className="p-1.5">
                              <button type="button" onClick={() => setEducationList(educationList.filter((_, i) => i !== idx))} className="text-rose-600 hover:underline border-none bg-none cursor-pointer">Remove</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Entry fields for next qualification */}
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Education Level</label>
                    <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus transition-all" value={tmpEduLevel} onChange={(e) => setTmpEduLevel(e.target.value)}>
                      <option value="No Education">No Education</option><option value="PSC">PSC</option><option value="JSC">JSC</option><option value="SSC">SSC</option><option value="HSC">HSC</option><option value="Graduate">Graduate</option><option value="Post-Graduate">Post-Graduate</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Degree Name</label>
                    <input type="text" placeholder="e.g. SSC / Dakhil" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpExamName} onChange={(e) => setTmpExamName(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Institution Name</label>
                    <input type="text" placeholder="School/College Name" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpSchoolName} onChange={(e) => setTmpSchoolName(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Board / University</label>
                    <input type="text" placeholder="e.g. Dhaka Board" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpSchoolBoard} onChange={(e) => setTmpSchoolBoard(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Passing Year</label>
                    <input type="number" placeholder="2020" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpPassYear} onChange={(e) => setTmpPassingYear(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">GPA / CGPA</label>
                    <input type="text" placeholder="e.g. 5.00" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpSchoolResult} onChange={(e) => setTmpSchoolResult(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Subject Group</label>
                    <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpSchoolSubject} onChange={(e) => setTmpSchoolSubject(e.target.value)}>
                      <option value="Science">Science</option><option value="Commerce">Commerce</option><option value="Arts">Arts</option><option value="Vocational">Vocational</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={handleAddEducation} className="bg-slate-800 text-white self-end border-none px-4 py-2 rounded text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-all w-32 mt-2">
                  + Add Degree
                </button>
              </div>
            )}

            {/* TAB 6: MULTIPLE WORK EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <h5 className="text-xs font-bold text-slate-700 m-0 border-b border-slate-100 pb-1">Previous Employment Registry</h5>
                
                {experienceList.length > 0 && (
                  <table className="w-full border border-slate-200 text-[11px] text-slate-700 border-collapse mb-2 table-layout-fixed">
                    <thead>
                      <tr className="bg-slate-50 font-bold">
                        <th className="p-1.5 border-r border-b border-slate-200 text-left">Company</th>
                        <th className="p-2.5 border-r border-b border-slate-200 text-left">Designation</th>
                        <th className="p-2 border-r border-b border-slate-200 text-left">Period</th>
                        <th className="p-2 border-r border-b border-slate-200 text-left w-[10%]">Years</th>
                        <th className="p-2 border-b border-slate-200 text-center w-[12%]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experienceList.map((exp, idx) => (
                        <tr key={idx} className="border-b border-slate-200 h-7 hover:bg-slate-50 transition-colors">
                          <td className="p-2 border-r border-slate-200 truncate font-semibold">{exp.company}</td>
                          <td className="p-2 border-r border-slate-200">{exp.designation}</td>
                          <td className="p-2 border-r border-slate-200 truncate">{exp.from} to {exp.to}</td>
                          <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-800">{exp.total}</td>
                          <td className="p-2 text-center">
                            <button type="button" onClick={() => setExperienceList(experienceList.filter((_, i) => i !== idx))} className="text-rose-600 hover:underline border-none bg-none cursor-pointer">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Previous Company</label>
                    <input type="text" placeholder="Apex Textiles Ltd" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpPrevCompany} onChange={(e) => setTmpPrevCompany(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Previous Designation</label>
                    <input type="text" placeholder="e.g. Assistant Operator" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus font-medium" value={tmpPrevDesignation} onChange={(e) => setTmpPrevDesignation(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Work From</label>
                    <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpWorkFrom} onChange={(e) => setTmpWorkFrom(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Work To</label>
                    <input type="date" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpWorkTo} onChange={(e) => setTmpWorkTo(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Reason for Leaving</label>
                    <input type="text" placeholder="Reason for leaving" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpLeftReason} onChange={(e) => setTmpLeftReason(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Reference Name</label>
                    <input type="text" placeholder="Reference Person Name" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpRefName} onChange={(e) => setTmpRefName(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Reference Contact Mobile/Email</label>
                    <input type="text" placeholder="Reference Contact Detail" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpRefContact} onChange={(e) => setTmpRefContact(e.target.value)} />
                  </div>
                </div>
                <button type="button" onClick={handleAddExperience} className="bg-slate-800 text-white self-end border-none px-4 py-2 rounded text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-all w-32 mt-2">
                  + Add History
                </button>
              </div>
            )}

            {/* TAB 7: SKILLS & TRAINING */}
            {activeTab === 'skills' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <span className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-1">Sewing & Machine Trainings History</span>
                
                {skillsList.length > 0 && (
                  <table className="w-full border border-slate-200 text-[11px] text-slate-700 border-collapse mb-2 table-layout-fixed">
                    <thead>
                      <tr className="bg-slate-50 font-bold">
                        <th className="p-1.5 border-r border-b border-slate-200 text-left">Operation</th>
                        <th className="p-2.5 border-r border-b border-slate-200 text-left">Machine</th>
                        <th className="p-2 border-r border-b border-slate-200 text-left">Training Name</th>
                        <th className="p-2 border-r border-b border-slate-200 text-left w-[10%]">SMV</th>
                        <th className="p-2 border-b border-slate-200 text-center w-[12%]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skillsList.map((sk, idx) => (
                        <tr key={idx} className="border-b border-slate-200 h-7 hover:bg-slate-50 transition-colors">
                          <td className="p-2 border-r border-slate-200 truncate font-semibold">{sk.operation}</td>
                          <td className="p-2 border-r border-slate-200">{sk.machine}</td>
                          <td className="p-2 border-r border-slate-200 truncate">{sk.trainName}</td>
                          <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-800">{sk.efficiency}</td>
                          <td className="p-2 text-center">
                            <button type="button" onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))} className="text-rose-600 hover:underline border-none bg-none cursor-pointer">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Sewing Operation</label>
                    <input type="text" placeholder="e.g. Bottom Hemming, Side Seaming" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpSewingOp} onChange={(e) => setTmpSewingOp(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Machine Type</label>
                    <select className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpMachineType} onChange={(e) => setTmpMachineType(e.target.value)}>
                      <option value="Single Needle">Single Needle</option><option value="Double Needle">Double Needle</option><option value="Overlock">Overlock</option><option value="Flatlock">Flatlock</option><option value="Button Hole">Button Hole</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Training Program Name</label>
                    <input type="text" placeholder="e.g. Industrial Sewing Training" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpTrainName} onChange={(e) => setTmpTrainName(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600">Training Institute</label>
                    <input type="text" placeholder="Institute Name" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpTrainInst} onChange={(e) => setTmpTrainInst(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Duration (Days/Weeks)</label>
                    <input type="text" placeholder="e.g. 15 Days" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpTrainDur} onChange={(e) => setTmpTrainDuration(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Training Date</label>
                    <input type="date" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpTrainDate} onChange={(e) => setTmpTrainDate(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Certificate Received</label>
                    <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus" value={tmpTrainCert} onChange={(e) => setTmpTrainCert(e.target.value)}>
                      <option value="No">No</option><option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600 font-bold">Efficiency level Target (Pcs/Hr)</label>
                    <input type="text" placeholder="e.g. 60" className="p-2 border border-slate-200 text-xs outline-none input-glow-focus" value={tmpEfficiency} onChange={(e) => setTmpEfficiency(e.target.value)} />
                  </div>
                </div>
                <button type="button" onClick={handleAddSkill} className="bg-slate-800 text-white self-end border-none px-4 py-2 rounded text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-all w-32 mt-2">
                  + Add Skill
                </button>
              </div>
            )}

            {/* TAB 8: FILE ATTACHMENTS WITH NATIVE [VIEW LIVE] MODAL OVERLAYS! */}
            {activeTab === 'uploads' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                
                {/* NID COPY (FRONT SIDE) */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">NID Copy (Front Side) - JPG/PDF <span className="text-[#ea580c] font-bold">*</span></label>
                  <div className="flex gap-2">
                    <input id="file-input-nidFront" type="file" required className="p-1.5 border border-slate-200 text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'nidFront')} />
                    <button type="button" onClick={() => handleOpenPreview('nidFront')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.nidFront.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.nidFront.name} (Saved successfully)</span>}
                </div>

                {/* NID COPY (BACK SIDE) */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">NID Copy (Back Side) - JPG/PDF</label>
                  <div className="flex gap-2">
                    <input id="file-input-nidBack" type="file" className="p-1.5 border border-slate-200 text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'nidBack')} />
                    <button type="button" onClick={() => handleOpenPreview('nidBack')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.nidBack.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.nidBack.name} (Saved successfully)</span>}
                </div>

                {/* NEW COMPONENT ADDED: NID COMBINED (FRONT & BACK SIDE TOGETHER) */}
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-[11px] font-semibold text-slate-600">NID Combined (Front & Back Side together) - JPG/PDF</label>
                  <div className="flex gap-2">
                    <input id="file-input-nidCombined" type="file" className="p-1.5 border border-slate-200 text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'nidCombined')} />
                    <button type="button" onClick={() => handleOpenPreview('nidCombined')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.nidCombined?.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.nidCombined.name} (Saved successfully)</span>}
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Employee Photo - JPG/PNG <span className="text-[#ea580c] font-bold">*</span></label>
                  <div className="flex gap-2">
                    <input id="file-input-photo" type="file" required className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'photo')} />
                    <button type="button" onClick={() => handleOpenPreview('photo')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.photo.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.photo.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Birth Certificate Document</label>
                  <div className="flex gap-2">
                    <input id="file-input-birthCert" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'birthCert')} />
                    <button type="button" onClick={() => handleOpenPreview('birthCert')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.birthCert.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.birthCert.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Academic Certificate (SSC/HSC)</label>
                  <div className="flex gap-2">
                    <input id="file-input-academicCert" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'academicCert')} />
                    <button type="button" onClick={() => handleOpenPreview('academicCert')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.academicCert.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.academicCert.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Experience Letter / Release Slip</label>
                  <div className="flex gap-2">
                    <input id="file-input-experienceLetter" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'experienceLetter')} />
                    <button type="button" onClick={() => handleOpenPreview('experienceLetter')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.experienceLetter.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.experienceLetter.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Medical Fitness Certificate</label>
                  <div className="flex gap-2">
                    <input id="file-input-medicalCert" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'medicalCert')} />
                    <button type="button" onClick={() => handleOpenPreview('medicalCert')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.medicalCert.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.medicalCert.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Bank Account Cheque/Document</label>
                  <div className="flex gap-2">
                    <input id="file-input-bankDoc" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'bankDoc')} />
                    <button type="button" onClick={() => handleOpenPreview('bankDoc')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.bankDoc.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.bankDoc.name} (Saved successfully)</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Police Clearance Copy</label>
                  <div className="flex gap-2">
                    <input id="file-input-policeClearance" type="file" className="p-1.5 border border-[#cbd5e1] text-xs bg-white outline-none flex-1 input-glow-focus transition-all" onChange={(e) => handleFileChange(e, 'policeClearance')} />
                    <button type="button" onClick={() => handleOpenPreview('policeClearance')} className="bg-slate-800 hover:bg-[#ea580c] text-white border-none py-1.5 px-3 rounded text-[11px] font-semibold cursor-pointer transition-colors">View</button>
                  </div>
                  {fileMetadata.policeClearance.name && <span className="text-[10px] text-emerald-600 font-semibold mt-1">📄 {fileMetadata.policeClearance.name} (Saved successfully)</span>}
                </div>
              </div>
            )}

            {/* TAB 9: SYSTEM SETTINGS & AUDIT */}
            {activeTab === 'system' && (
              <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Initial Status</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Probation">Probation</option>
                    <option value="Resigned">Resigned</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Deceased">Deceased</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Biometric Attendance ID</label>
                  <input type="text" placeholder="Machine Fingerprint ID" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={deviceID} onChange={(e) => setDeviceID(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Leave Policy Group</label>
                  <input type="text" placeholder="Default Leave Group" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={leaveGroup} onChange={(e) => setLeaveGroup(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-[11px] font-semibold text-slate-600">Remarks / Operational Notes</label>
                  <textarea rows={3} placeholder="Additional employee background notes..." className="p-2 border border-[#cbd5e1] text-xs outline-none resize-none input-glow-focus transition-all" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </div>

                {/* Advanced Tab 10 Additions (Disciplinary & Compliance) */}
                <div className="flex flex-col gap-1 col-span-4 mt-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700">Disciplinary Logs & Compliance (শৃঙ্খলামূলক ও ট্রেড ইউনিয়ন ব্যবস্থা)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Warning Letters Issued</label>
                  <input type="number" min="0" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={warningLetters} onChange={(e) => setWarningLetters(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">Suspension / Disciplinary History</label>
                  <input type="text" placeholder="e.g. Suspended for 7 Days on 2026-02-10" className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={suspensionHistory} onChange={(e) => setSuspensionHistory(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">WPC / Union Member</label>
                  <select className="p-2 border border-[#cbd5e1] text-xs outline-none input-glow-focus transition-all" value={unionMember} onChange={(e) => setUnionMember(e.target.value)}>
                    <option value="No">No</option><option value="Yes (Active Member)">Yes (Active Member)</option>
                  </select>
                </div>

                {/* Audit Fields */}
                <div className="flex flex-col gap-1 mt-2 border-t border-slate-100 pt-3 col-span-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Auditing Logs</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Created By</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs bg-slate-100 cursor-not-allowed" value="system-admin" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Created At</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs bg-slate-100 cursor-not-allowed" value={new Date().toLocaleString()} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Last Updated By</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs bg-slate-100 cursor-not-allowed" value="system-admin" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Last Updated At</label>
                  <input type="text" disabled className="p-2 border border-slate-200 text-xs bg-slate-100 cursor-not-allowed" value={new Date().toLocaleString()} />
                </div>
              </div>
            )}

          </div>

          {/* REGISTER ACTION BAR — INTEGRATED SPECIFIC IN-FORM DELETE PROFILE BUTTON! */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end shrink-0 pr-2 gap-3">
            {activeEditingEmployee && (
              <button
                type="button"
                onClick={() => onDeleteEmployee && onDeleteEmployee(activeEditingEmployee.id)} // Triggers deletion in root!
                className="bg-rose-600 hover:bg-rose-700 text-white border-none py-2 px-6 text-xs font-bold rounded cursor-pointer transition-all"
              >
                Delete Profile
              </button>
            )}
            <button type="submit" className="bg-[#ea580c] hover:bg-orange-600 text-white border-none py-2 px-6 text-xs font-bold rounded cursor-pointer transition-all">
              Save Registered Profile
            </button>
          </div>
        </form>

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
              {previewModalUrl.url.startsWith('data:image') || previewModalUrl.url.includes('image') || previewModalUrl.url.startsWith('blob:') ? (
                <img src={previewModalUrl.url} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <iframe src={previewModalUrl.url} title="Document Preview" className="w-full h-full border-none" />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}