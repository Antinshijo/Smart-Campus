const roleSelect = document.getElementById("roleSelect");
const formContainer = document.getElementById("formContainer");

/* ===== ROLE CHANGE ===== */
roleSelect.addEventListener("change", () => {
  const role = roleSelect.value;
  let html = "";

  /* ===== STUDENT ===== */
  if (role === "student") {
    html = `
      <h3>Student Registration / Login</h3>
      <input type="text" id="s_name" placeholder="Name">
      <input type="text" id="s_reg" placeholder="Register Number">
      <select id="s_dept">
        <option value="">--Department--</option>
        <option>CSE</option><option>ECE</option><option>EEE</option>
        <option>AIDS</option><option>MECH</option><option>IT</option>
      </select>
      <button onclick="registerStudent()">Register</button>
      <button onclick="loginStudent()">Login</button>
    `;
  }

  /* ===== HOD ===== */
  else if (role === "hod") {
    html = `
      <h3>HOD / Faculty</h3>
      <input type="text" id="h_name" placeholder="Name">
      <select id="h_dept">
        <option value="">--Department--</option>
        <option>CSE</option><option>ECE</option><option>EEE</option>
        <option>AIDS</option><option>MECH</option><option>IT</option>
      </select>
      <input type="text" id="h_phone" placeholder="Phone Number">
      <button onclick="registerHOD()">Register HOD</button>

      <hr class="hr">

      <input type="text" id="h_login_name" placeholder="Name">
      <select id="h_login_dept">
        <option value="">--Department--</option>
        <option>CSE</option><option>ECE</option><option>EEE</option>
        <option>AIDS</option><option>MECH</option><option>IT</option>
      </select>
      <input type="password" id="h_login_pwd" placeholder="Password">
      <button onclick="loginHOD()">Login</button>
    `;
  }

  /* ===== ADMIN ===== */
  else if (role === "admin") {
    html = `
      <h3>Admin Login</h3>
      <input type="text" id="a_id" placeholder="Admin ID">
      <input type="password" id="a_pwd" placeholder="Password">
      <button onclick="loginAdmin()">Login Admin</button>
    `;
  }

  formContainer.innerHTML = html;
});

/* ================= STUDENT ================= */

function registerStudent() {
  const name = s_name.value.trim();
  const reg = s_reg.value.trim();
  const dept = s_dept.value;

  if (!name || !reg || !dept) return alert("Fill all fields");

  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  if (students.some(s => s.reg === reg))
    return alert("Student already exists");

  students.push({ name, reg, dept });
  localStorage.setItem("sc_students", JSON.stringify(students));

  alert("Student registered ✅");
}

function loginStudent() {
  const students = JSON.parse(localStorage.getItem("sc_students") || "[]");
  const student = students.find(
    s => s.name === s_name.value.trim() &&
         s.reg === s_reg.value.trim() &&
         s.dept === s_dept.value
  );

  if (!student) return alert("Invalid student details");

  localStorage.setItem("sc_profile", JSON.stringify(student));
  window.location.href = "home.html";
}

/* ================= HOD ================= */

function registerHOD() {
  const name = h_name.value.trim();
  const dept = h_dept.value;
  const phone = h_phone.value.trim();

  if (!name || !dept || !phone) return alert("Fill all fields");

  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  if (hods.some(h => h.dept === dept))
    return alert("HOD already exists for this dept");

  const password = generatePassword(phone);
  hods.push({ name, dept, password });

  localStorage.setItem("sc_hods", JSON.stringify(hods));
  alert(`HOD created ✅\nDept: ${dept}\nPassword: ${password}`);
}

function loginHOD() {
  const hods = JSON.parse(localStorage.getItem("sc_hods") || "[]");
  const hod = hods.find(
    h => h.name === h_login_name.value.trim() &&
         h.dept === h_login_dept.value &&
         h.password === h_login_pwd.value.trim()
  );

  if (!hod) return alert("Invalid HOD credentials");

  localStorage.setItem("hodProfile", JSON.stringify(hod));
  window.location.href = "hod.html";
}

/* ================= ADMIN ================= */

function loginAdmin() {
  const id = document.getElementById("a_id").value.trim();
  const pwd = document.getElementById("a_pwd").value.trim();

  // demo admin
  if (id === "admin" && pwd === "admin123") {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin login");
  }
}

/* ================= PASSWORD ================= */

function generatePassword(phone) {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return phone.slice(-4) + rand;
}

