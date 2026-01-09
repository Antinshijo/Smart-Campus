/* home.js — SmartCampus (STUDENT) */

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const avatarImg = document.getElementById('avatarImg');
const topName = document.getElementById('topName');
const welcomeName = document.getElementById('welcomeName');

const leaveOptions = document.getElementById('leaveOptions');
const leaveForm = document.getElementById('leaveForm');
const leaveTitle = document.getElementById('leaveTitle');
const frmLeave = document.getElementById('frmLeave');
const activitySection = document.getElementById('activitySection');
const activityList = document.getElementById('activityList');
const noActivity = document.getElementById('noActivity');
const main = document.getElementById('main');

/* SIDEBAR */
document.querySelectorAll('.sidebar li').forEach(li => {
  li.onclick = () => handleMenu(li.dataset.action);
});
menuBtn.onclick = () => sidebar.classList.toggle('active');

init();

function init() {
  loadProfile();
  showWelcome();
  frmLeave.addEventListener('submit', submitLeave);
  document.getElementById('cancelLeave').onclick = showWelcome;
}

/* PROFILE */
function loadProfile() {
  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  avatarImg.src = p.photo || `https://ui-avatars.com/api/?name=${p.name || 'S'}`;
  topName.textContent = p.name || 'Student';
  welcomeName.textContent = p.name || 'Student';
}

/* MENU */
function handleMenu(action) {
  hideAll();

  if (action === 'leave') leaveOptions.classList.remove('hidden');
  else if (action === 'activity') {
    loadActivity();
    activitySection.classList.remove('hidden');
  }
  else if (action === 'attendance') showAttendance();
  else if (action === 'exam') showExams();
  else showWelcome();
}

function hideAll() {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.dynamic').forEach(d => d.remove());
}

function showWelcome() {
  hideAll();
  document.getElementById('welcome').classList.remove('hidden');
}

/* LEAVE */
function openLeaveForm(type) {
  leaveOptions.classList.add('hidden');
  leaveForm.classList.remove('hidden');
  leaveTitle.textContent = type === 'onduty' ? 'On-Duty Letter' : 'Leave Letter';

  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  fldName.value = p.name || '';
  fldReg.value = p.reg || '';
}

async function submitLeave(e) {
  e.preventDefault();

  const leave = {
    id: 'REQ' + Date.now(),
    studentName: fldName.value,
    reg: fldReg.value,
    type: fldType.value || 'Leave',
    from: fldFrom.value,
    to: fldTo.value,
    reason: fldReason.value,
    file: fldFile.files[0] ? await toBase64(fldFile.files[0]) : null,
    advisorVerified: false,
    hodVerified: false,
    status: 'Pending'
  };

  const arr = JSON.parse(localStorage.getItem('sc_requests') || '[]');
  arr.unshift(leave);
  localStorage.setItem('sc_requests', JSON.stringify(arr));

  alert('✅ Leave Submitted');
  frmLeave.reset();
  showWelcome();
}

/* ACTIVITY */
function loadActivity() {
  const arr = JSON.parse(localStorage.getItem('sc_requests') || '[]');
  activityList.innerHTML = '';

  if (!arr.length) {
    noActivity.style.display = 'block';
    return;
  }

  noActivity.style.display = 'none';

  arr.forEach(r => {
    activityList.innerHTML += `
      <div class="activity-card">
        <h4>${r.type}</h4>
        <p>${r.from} → ${r.to}</p>
        <p>${r.reason}</p>
        <span class="badge">${r.status}</span>
        <button class="btn outline" onclick="downloadPDF('${r.id}')">Download PDF</button>
      </div>`;
  });
}

/* ATTENDANCE */
function showAttendance() {
  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  const data = JSON.parse(localStorage.getItem('sc_attendance') || '{}')[p.reg] || {};

  let html = `<div class="panel dynamic"><h2>Attendance</h2>`;
  if (!Object.keys(data).length) html += `<p class="muted">No attendance yet</p>`;
  else for (let s in data) html += `<div class="card">${s} : ${data[s]}</div>`;
  html += `</div>`;

  main.appendChild(createNode(html));
}

/* EXAMS */
function showExams() {
  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  const exams = JSON.parse(localStorage.getItem('sc_exams') || '{}')[p.reg] || [];

  let html = `<div class="panel dynamic"><h2>Assigned Exams</h2>`;
  if (!exams.length) html += `<p class="muted">No exams assigned</p>`;
  else exams.forEach(e => html += `<div class="card">${e.subject} – ${e.name}</div>`);
  html += `</div>`;

  main.appendChild(createNode(html));
}


function createNode(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

function toBase64(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsDataURL(file);
  });
}
// pdf 
function downloadPDF(id) {
  if (!window.jspdf) {
    alert("jsPDF not loaded");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const arr = JSON.parse(localStorage.getItem("sc_requests") || "[]");
  const r = arr.find(x => x.id === id);

  if (!r) {
    alert("Request not found");
    return;
  }

  doc.setFontSize(14);
  doc.text("SMART CAMPUS", 80, 20);
  doc.text("Leave Approval Letter", 70, 30);

  doc.setFontSize(11);
  doc.text(`Student Name : ${r.studentName}`, 20, 50);
  doc.text(`Register No  : ${r.reg}`, 20, 60);
  doc.text(`Leave Type   : ${r.type}`, 20, 70);
  doc.text(`From Date    : ${r.from}`, 20, 80);
  doc.text(`To Date      : ${r.to}`, 20, 90);

  doc.text("Reason:", 20, 105);
  doc.text(r.reason || "-", 20, 115, { maxWidth: 170 });

  doc.text("Status: Approved by HOD", 20, 150);
  doc.text("Advisor Signature", 20, 170);
  doc.text("HOD Signature", 140, 170);

  doc.save(`Leave_${r.reg}.pdf`);
}
// profile
// profile button
const profileBtn = document.getElementById('editProfileBtn');
if(profileBtn){
  profileBtn.onclick = () => {
    window.location.href = 'profile.html';
  }
}
function loadProfile() {
  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  avatarImg.src = p.photo || `https://ui-avatars.com/api/?name=${p.name || 'S'}`;
  topName.textContent = p.name || 'Student';
  welcomeName.textContent = p.name || 'Student';
}


 