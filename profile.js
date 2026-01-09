// profile.js - save profile to localStorage key: sc_profile
const frmProfile = document.getElementById('frmProfile');
const inpPhoto = document.getElementById('inpPhoto');
const avatarPreview = document.getElementById('avatarPreview');
const cancelBtn = document.getElementById('cancelProfile');

// load existing
(function loadProfile(){
  const p = JSON.parse(localStorage.getItem('sc_profile') || 'null');
  if(p){
    document.getElementById('pName').value = p.name || '';
    document.getElementById('pEmail').value = p.email || '';
    document.getElementById('pPhone').value = p.phone || '';
    document.getElementById('pReg').value = p.reg || '';
    document.getElementById('pYear').value = p.year || '';
    document.getElementById('pDept').value = p.dept || '';

    if(p.photo){
      avatarPreview.innerHTML = `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/>`;
    } else {
      avatarPreview.textContent = (p.name && p.name[0]) ? p.name[0].toUpperCase() : 'S';
    }
  } else {
    avatarPreview.textContent = 'S';
  }
})();

inpPhoto.addEventListener('change', async (e) => {
  if(e.target.files && e.target.files[0]){
    const file = e.target.files[0];
    // limit size ~2MB
    if(file.size > 2_200_000){ alert('File too large (max ~2MB)'); return; }
    const data = await readFileAsDataURL(file);
    avatarPreview.innerHTML = `<img src="${data}" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/>`;
    avatarPreview.dataset.photo = data;
  }
});

function readFileAsDataURL(file){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }

frmProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  const profile = {
    name: document.getElementById('pName').value.trim(),
    email: document.getElementById('pEmail').value.trim(),
    phone: document.getElementById('pPhone').value.trim(),
    reg: document.getElementById('pReg').value.trim(),
    year: document.getElementById('pYear').value.trim(),
    dept: document.getElementById('pDept').value.trim(),
    photo: avatarPreview.dataset.photo || (avatarPreview.querySelector('img') ? avatarPreview.querySelector('img').src : null)
  };
  localStorage.setItem('sc_profile', JSON.stringify(profile));
  alert('Profile saved!');
  // go back to home to reflect avatar
  window.location.href = 'home.html';
});

cancelBtn.addEventListener('click', ()=> window.location.href = 'home.html');
