function showPanel(id){
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  if(id === "studentList") loadStudents();
  if(id === "hodList") loadHODs();
  if(id === "finance") loadFees();
  if(id === "announcementList") loadAnnouncements();
}

/* ===== STUDENT ===== */
function createStudent(){
  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  students.push({
    name: cs_name.value,
    reg: cs_reg.value,
    year: cs_year.value
  });
  localStorage.setItem("sc_students", JSON.stringify(students));
  alert("Student added ✅");
}

function loadStudents(){
  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  studentContainer.innerHTML = "";
  students.forEach((s,i)=>{
    studentContainer.innerHTML += `
      <div class="card">
        ${s.name} | ${s.reg} | Year ${s.year}
      </div>`;
  });
}

/* ===== HOD ===== */
function createHOD(){
  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  hods.push({name: ch_name.value, dept: ch_dept.value});
  localStorage.setItem("sc_hods", JSON.stringify(hods));
  alert("HOD added ✅");
}

function loadHODs(){
  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  hodContainer.innerHTML = "";
  hods.forEach(h=>{
    hodContainer.innerHTML += `
      <div class="card">${h.name} - ${h.dept}</div>`;
  });
}

/* ===== FEES ===== */
function loadFees(){
  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  feesContainer.innerHTML = "";
  students.forEach((s,i)=>{
    feesContainer.innerHTML += `
      <div class="card">
        ${s.name} (Year ${s.year})
        <input placeholder="Fees Amount" id="fee_${i}">
        <button onclick="saveFee(${i})">Save</button>
      </div>`;
  });
}

function saveFee(i){
  const fees = JSON.parse(localStorage.getItem("sc_fees") || "{}");
  fees[i] = document.getElementById(`fee_${i}`).value;
  localStorage.setItem("sc_fees", JSON.stringify(fees));
  alert("Fees updated 💰");
}

/* ===== ANNOUNCEMENT ===== */
function addAnnouncement(){
  const anns = JSON.parse(localStorage.getItem("sc_announcements") || "[]");
  anns.push({
    text: an_text.value,
    img: an_img.value,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("sc_announcements", JSON.stringify(anns));
  alert("Announcement published 📢");
}

function loadAnnouncements(){
  const anns = JSON.parse(localStorage.getItem("sc_announcements") || "[]");
  announcementContainer.innerHTML = "";
  anns.forEach((a,i)=>{
    announcementContainer.innerHTML += `
      <div class="card">
        <p>${a.text}</p>
        ${a.img ? `<img src="${a.img}" width="120">` : ""}
        <small>${a.time}</small>
        <button class="danger" onclick="deleteAnnouncement(${i})">Delete</button>
      </div>`;
  });
}

function deleteAnnouncement(i){
  const anns = JSON.parse(localStorage.getItem("sc_announcements"));
  anns.splice(i,1);
  localStorage.setItem("sc_announcements", JSON.stringify(anns));
  loadAnnouncements();
}
