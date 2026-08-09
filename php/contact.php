<?php
// Konfigurasi database XAMPP
$host     = 'localhost';
$user     = 'root';
$password = '';          // default XAMPP: kosong
$database = 'portofolio_db';

header('Content-Type: application/json');

// Buat koneksi
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Gagal terhubung ke database.']);
    exit;
}

// Ambil & bersihkan input
$nama   = isset($_POST['nama'])   ? trim($_POST['nama'])   : '';
$email  = isset($_POST['email'])  ? trim($_POST['email'])  : '';
$subjek = isset($_POST['subjek']) ? trim($_POST['subjek']) : '';
$pesan  = isset($_POST['pesan'])  ? trim($_POST['pesan'])  : '';

// Validasi
if ($nama === '' || $email === '' || $subjek === '' || $pesan === '') {
    echo json_encode(['success' => false, 'message' => 'Semua kolom harus diisi.']);
    $conn->close();
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Format email tidak valid.']);
    $conn->close();
    exit;
}

// Simpan ke database menggunakan prepared statement (aman dari SQL injection)
$stmt = $conn->prepare("INSERT INTO pesan (nama, email, subjek, pesan) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssss', $nama, $email, $subjek, $pesan);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Pesan berhasil dikirim. Terima kasih!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menyimpan pesan. Coba lagi.']);
}

$stmt->close();
$conn->close();
