-- Jalankan file ini di phpMyAdmin (XAMPP) pada tab "SQL"
-- atau impor lewat menu Import. Ini akan membuat database + tabel.

CREATE DATABASE IF NOT EXISTS portofolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portofolio_db;

CREATE TABLE IF NOT EXISTS pesan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subjek VARCHAR(200) NOT NULL,
  pesan TEXT NOT NULL,
  tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
