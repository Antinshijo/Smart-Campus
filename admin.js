function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ===== CREATE STUDENT ===== */
function createStudent() {
  const students = getData("sc_students");

  const student = {
    name: sName.value,
    reg: sReg.value,
    dept: sDept.value
  };

  students.push(student);
  setData("sc_students", students);
  alert("Student added");
  loadStudents();
}

/* ===== CREATE HOD ===== */
function createHOD() {
  const hods = getData("sc_hods");

  const password = Math.floor(100000 + Math.random() * 900000);

  const hod = {
    name: hName.value,
    dept: hDept.value,
    phone: hPhone.value,
    password: password
  };

  hods.push(hod);
  setData("sc_hods", hods);

  alert(`HOD added\nPassword: ${password}`);
  loadHODs();
}

/* ===== LOAD STUDENTS ===== */
function loadStudents() {
  const students = getData("sc_students");
  studentList.innerHTML = "";

  students.forEach((s, i) => {
    studentList.innerHTML += `
      <div class="card">
        ${s.name} (${s.reg}) - ${s.dept}
        <button onclick="deleteStudent(${i})">Delete</button>
      </div>`;
  });
}

function deleteStudent(i) {
  const students = getData("sc_students");
  students.splice(i, 1);
  setData("sc_students", students);
  loadStudents();
}

/* ===== LOAD HODS ===== */
function loadHODs() {
  const hods = getData("sc_hods");
  hodList.innerHTML = "";

  hods.forEach((h, i) => {
    hodList.innerHTML += `
      <div class="card">
        ${h.name} - ${h.dept} <br>
        Password: <b>${h.password}</b>
        <button onclick="deleteHOD(${i})">Delete</button>
      </div>`;
  });
}

function deleteHOD(i) {
  const hods = getData("sc_hods");
  hods.splice(i, 1);
  setData("sc_hods", hods);
  loadHODs();
}

/* ===== LOGOUT ===== */
function logout() {
  window.location.href = "login.html";
}

/* INIT */
loadStudents();
loadHODs();
