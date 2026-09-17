var dataPengguna = [
  {
    id: 1,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat"
  },
  {
    id: 2,
    nama: "Ridwan Tri Gunara",
    email: "ridwantg@ut.ac.id",
    password: "ridwan123",
    role: "Administrator",
    lokasi: "Rumah"
  },
  {
    id: 3,
    nama: "Leventis",
    email: "leventis@ut.ac.id",
    password: "leventhis",
    role: "Administrator",
    lokasi: "Rumah"
  }
];

function login() {
  let email = document.getElementById("email")?.value.trim();
  let password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    Swal.fire({
      title: "Oops!",
      text: "Harap isi email dan password terlebih dahulu",
      icon: "warning",
      confirmButtonColor: "#f59e0b"
    });
    return;
  }

  let user = dataPengguna.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem(
      "userLogin",
      JSON.stringify(user)
    );

    Swal.fire({
      title: "Login Berhasil!",
      text: `Selamat datang, ${user.nama}`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "stock.html";
    });

    } else {

    Swal.fire({
      title: "Login Gagal",
      text: "Email atau password salah",
      icon: "error",
      confirmButtonColor: "#ef4444"
    });

  }
}

async function logout() {
  const result = await Swal.fire({
    title: "Keluar Aplikasi?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    confirmButtonColor: "#004098",
    cancelButtonColor: "#ef4444"
  });

  if (result.isConfirmed) {
  
  localStorage.removeItem("userLogin");
    await Swal.fire({
      title: "Logout Berhasil",
      text: "Anda akan kembali ke halaman login.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });

    window.location.href = "index.html";

  }
}

function cekLogin() {

  const halamanLogin =
    window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("/");

  const user =
    JSON.parse(
      localStorage.getItem("userLogin")
    );
    if (!user && !halamanLogin) {
    Swal.fire({
      title: "Akses Ditolak",
      text: "Silakan login terlebih dahulu",
      icon: "warning",
      confirmButtonColor: "#f59e0b"
    }).then(() => {
      window.location.href = "index.html";
    });

  }
}

function lupaPassword() {
  Swal.fire({
    toast: true,
    position: "top",
    icon: "info",
    title: "Fitur reset password belum tersedia",
    showConfirmButton: false,
    timer: 2500
  });

}

function daftarAkun() {
  Swal.fire({
    toast: true,
    position: "top",
    icon: "info",
    title: "Fitur daftar akun belum tersedia",
    showConfirmButton: false,
    timer: 2500
  });

}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    cekLogin();
  }
);