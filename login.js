const roleSelect = document.getElementById("roleSelect");
const formContainer = document.getElementById("formContainer");

roleSelect.addEventListener("change", () => {
  const role = roleSelect.value;
  let html = "";

  if (role === "student") {
    html = `
      <h3>Student Registration / Login</h3>
      <input type="text" id="s_name" placeholder="Name">
      <input type="text" id="s_reg" placeholder="Register Number">
      <select id="s_dept">
        <option value="">--Department--</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>AIDS</option>
        <option>MECH</option>
        <option>IT</option>
      </select>
      <button onclick="registerStudent()">Register Student</button>
      <button onclick="loginStudent()">Login Student</button>
    `;
  } else if (role === "hod") {
    html = `
      <h3>HOD / Faculty Registration / Login</h3>
      <input type="text" id="h_name" placeholder="Name">
      <select id="h_dept">
        <option value="">--Department--</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>AIDS</option>
        <option>MECH</option>
        <option>IT</option>
      </select>
      <input type="text" id="h_phone" placeholder="Phone Number (for password)">
      <button onclick="registerHOD()">Register HOD</button>

      <hr class="hr">

      <input type="text" id="h_login_name" placeholder="Name">
      <select id="h_login_dept">
        <option value="">--Department--</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>AIDS</option>
        <option>MECH</option>
        <option>IT</option>
      </select>
      <input type="password" id="h_login_pwd" placeholder="Password">
      <button onclick="loginHOD()">Login HOD</button>
    `;
  }

  formContainer.innerHTML = html;
});

/* ===== STUDENT ===== */
function registerStudent() {
  const name = document.getElementById("s_name").value.trim();
  const reg = document.getElementById("s_reg").value.trim();
  const dept = document.getElementById("s_dept").value;

  if (!name || !reg || !dept) return alert("Fill all fields");

  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  if (students.some(s => s.reg === reg)) return alert("Student already exists");

  students.push({ name, reg, dept });
  localStorage.setItem("sc_students", JSON.stringify(students));
  alert("Student account created ✅");
}

function loginStudent() {
  const name = document.getElementById("s_name").value.trim();
  const reg = document.getElementById("s_reg").value.trim();
  const dept = document.getElementById("s_dept").value;

  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  const student = students.find(s => s.name === name && s.reg === reg && s.dept === dept);

  if (!student) return alert("Invalid student credentials");

  localStorage.setItem("studentName", student.name);
  localStorage.setItem("studentReg", student.reg);
  localStorage.setItem("studentDept", student.dept);

  window.location.href = "home.html";
}

/* ===== HOD ===== */
function registerHOD() {
  const name = document.getElementById("h_name").value.trim();
  const dept = document.getElementById("h_dept").value;
  const phone = document.getElementById("h_phone").value.trim();

  if (!name || !dept || !phone) return alert("Fill all fields");

  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  if (hods.some(h => h.dept === dept)) return alert("HOD for this dept already exists");

  const password = generatePassword(phone);

  hods.push({ name, dept, password });
  localStorage.setItem("sc_hods", JSON.stringify(hods));

  alert(`HOD account created ✅\nDept: ${dept}\nPassword: ${password}`);
}

function loginHOD() {
  const name = document.getElementById("h_login_name").value.trim();
  const dept = document.getElementById("h_login_dept").value;
  const pwd = document.getElementById("h_login_pwd").value.trim();

  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  const hod = hods.find(h => h.name === name && h.dept === dept && h.password === pwd);

  if (!hod) return alert("Invalid HOD credentials");

  localStorage.setItem("hodName", hod.name);
  localStorage.setItem("department", hod.dept);

  window.location.href = "hod.html";
}

/* ===== PASSWORD GENERATOR ===== */
function generatePassword(phone) {
  if (!phone || phone.length < 4) phone = "0000";
  const random = Math.floor(Math.random() * 9000 + 1000);
  return phone.slice(-4) + random;
}
