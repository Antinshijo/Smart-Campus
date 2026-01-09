const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const welcomePanel = document.getElementById("welcome");
const leavePanel = document.getElementById("leavePanel");
const attendancePanel = document.getElementById("attendancePanel");
const examPanel = document.getElementById("examPanel");

const leaveList = document.getElementById("leaveList");

/* SIDEBAR */
menuBtn.onclick = () => sidebar.classList.toggle("active");

document.querySelectorAll(".sidebar li").forEach(li => {
  li.onclick = () => openPanel(li.dataset.action);
});

function openPanel(action) {
  document.querySelectorAll(".panel").forEach(p =>
    p.classList.add("hidden")
  );

  if (action === "leave") {
    leavePanel.classList.remove("hidden");
    loadLeaves();
  } else if (action === "attendance") {
    attendancePanel.classList.remove("hidden");
  } else if (action === "exam") {
    examPanel.classList.remove("hidden");
  } else {
    welcomePanel.classList.remove("hidden");
  }
}

/* ================= LEAVE APPROVAL ================= */

function loadLeaves() {
  const reqs = JSON.parse(localStorage.getItem("sc_requests") || "[]");
  leaveList.innerHTML = "";

  if (!reqs.length) {
    leaveList.innerHTML = "<p class='muted'>No leave requests</p>";
    return;
  }

  reqs.forEach(r => {
    leaveList.innerHTML += `
      <div class="card">
        <h3>${r.studentName} (${r.reg})</h3>
        <p><b>Type:</b> ${r.type}</p>
        <p><b>Date:</b> ${r.from} → ${r.to}</p>
        <p><b>Reason:</b> ${r.reason}</p>
        <p><b>Status:</b> ${r.status}</p>

        ${
          !r.advisorVerified && r.status === "Pending"
            ? `<button onclick="approveAdvisor('${r.id}')">
                 Verify as Advisor
               </button>`
            : `<span>✔ Advisor Verified</span>`
        }

        ${
          r.advisorVerified && !r.hodVerified && r.status !== "Rejected"
            ? `
              <button onclick="approveHOD('${r.id}')">Approve</button>
              <button class="danger" onclick="rejectLeave('${r.id}')">Reject</button>
            `
            : ""
        }

        ${
          r.hodVerified || r.status === "Rejected"
            ? `<button onclick="clearLeave('${r.id}')">Clear</button>`
            : ""
        }
      </div>
    `;
  });
}

function approveAdvisor(id) {
  const arr = JSON.parse(localStorage.getItem("sc_requests"));
  const req = arr.find(r => r.id === id);

  req.advisorVerified = true;
  req.status = "Verified by Advisor";

  localStorage.setItem("sc_requests", JSON.stringify(arr));
  loadLeaves();
}

function approveHOD(id) {
  const arr = JSON.parse(localStorage.getItem("sc_requests"));
  const req = arr.find(r => r.id === id);

  req.hodVerified = true;
  req.status = "Approved by HOD";

  localStorage.setItem("sc_requests", JSON.stringify(arr));
  loadLeaves();
}
/* ================= EXTRA PANELS (TEMP FIX) ================= */

function markAttendance(studentId, status) {
  const attendance = JSON.parse(localStorage.getItem("sc_attendance") || "{}");

  if (!attendance[studentId]) attendance[studentId] = {};

  // Use today's date as key
  const today = new Date().toISOString().split("T")[0];
  attendance[studentId][today] = status;

  localStorage.setItem("sc_attendance", JSON.stringify(attendance));

  alert(`Attendance for ${studentId} marked as ${status}`);
}

// clear
function clearLeave(id) {
  let arr = JSON.parse(localStorage.getItem("sc_requests") || "[]");
  arr = arr.filter(r => r.id !== id);

  localStorage.setItem("sc_requests", JSON.stringify(arr));
  loadLeaves();
}
// reject
function rejectLeave(id) {
  const arr = JSON.parse(localStorage.getItem("sc_requests") || "[]");
  const req = arr.find(r => r.id === id);

  if (!req) return;

  req.status = "Rejected";
  req.hodVerified = false;

  localStorage.setItem("sc_requests", JSON.stringify(arr));
  loadLeaves();
}
// exam assign 
function assignExam(studentId, subject, examName) {
  const exams = JSON.parse(localStorage.getItem("sc_exams") || "{}");

  if (!exams[studentId]) exams[studentId] = [];

  exams[studentId].push({ subject, name: examName });

  localStorage.setItem("sc_exams", JSON.stringify(exams));

  alert(`Exam assigned to ${studentId}`);
}
// profile
const profileBtn = document.getElementById('hodProfileBtn');
if(profileBtn){
  profileBtn.onclick = () => {
    window.location.href = 'hodprofile.html';
  }
}
function loadProfile() {
  const p = JSON.parse(localStorage.getItem('sc_profile') || '{}');
  document.getElementById('hodName').textContent = p.name || 'HOD';
  document.getElementById('hodDept').textContent = p.dept || '';
}


