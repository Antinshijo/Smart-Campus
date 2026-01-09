// const menuBtn = document.getElementById("menuBtn");
// const sidebar = document.getElementById("sidebar");

// menuBtn.onclick = () => sidebar.classList.toggle("active");

// document.querySelectorAll(".sidebar li").forEach(li => {
//   li.onclick = () => openPanel(li.dataset.action);
// });

// function openPanel(action) {
//   document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));

//   if (action === "attendance")
//     attendancePanel.classList.remove("hidden");
//   else if (action === "exam")
//     examPanel.classList.remove("hidden");
//   else if (action === "leave")
//     leavePanel.classList.remove("hidden");
//   else
//     welcome.classList.remove("hidden");
// }

// /* -------- ATTENDANCE -------- */
// function markAttendance() {
//   const subject = attSubject.value;
//   const data = JSON.parse(localStorage.getItem("attendance") || "{}");

//   data[subject] = (data[subject] || 0) + 1;
//   localStorage.setItem("attendance", JSON.stringify(data));

//   alert("Attendance marked & updated in student dashboard ✅");
// }

// /* -------- EXAM -------- */
// function assignExam() {
//   const exams = JSON.parse(localStorage.getItem("exams") || "[]");
//   exams.push({
//     subject: examSubject.value,
//     name: examName.value
//   });
//   localStorage.setItem("exams", JSON.stringify(exams));
//   alert("Exam assigned & visible to student dashboard 📝");
// }

// /* -------- LEAVE -------- */
// function approveLeave() {
//   let reqs = JSON.parse(localStorage.getItem("sc_requests") || "[]");
//   if (!reqs.length) return alert("No pending letters");

//   reqs[0].status = "Approved";
//   localStorage.setItem("sc_requests", JSON.stringify(reqs));

//   alert("Leave approved & cleared from HOD dashboard ✅");
// }

// /* -------- PROFILE -------- */
// (function () {
//   document.getElementById("avatarImg").src =
//     "https://ui-avatars.com/api/?name=Dr+Kumar";
// })();
