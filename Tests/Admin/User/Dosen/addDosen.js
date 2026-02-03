// test.js

const { Builder, By, Key, until } = require('selenium-webdriver');
const { ServiceBuilder } = require('selenium-webdriver/chrome');

// Inisialisasi service untuk chromedriver.
// Ini diperlukan agar driver bisa berjalan dengan baik.
const service = new ServiceBuilder();

async function runTest() {
    // Buat instance WebDriver untuk browser Chrome.
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(service)
        .build();

    try {
        // --- Langkah 1: Login ke website ---
        // Buka halaman login.
        await driver.get('http://127.0.0.1:8000/login');
        console.log('Berhasil membuka halaman login.');

        // Tunggu hingga elemen input email terlihat dan isi.
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('akaashi@trivium.ac.id');
        console.log('Berhasil mengisi email.');

        // Tunggu hingga elemen input password terlihat dan isi.
        await driver.wait(until.elementLocated(By.name('password')), 10000);
        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('akaashi'); // Pastikan password ini benar
        console.log('Berhasil mengisi password.');

        // Klik tombol "Masuk"
        let masukButton = await driver.findElement(By.css('button[type="submit"]'));
        await masukButton.click();
        console.log('Berhasil mengklik tombol Masuk.');

        // --- Langkah 2: Navigasi ke halaman "Tambah Dosen" ---
        // Tunggu sampai halaman dashboard dimuat.
        await driver.wait(until.urlIs('http://127.0.0.1:8000/dashboard'), 10000);
        console.log('Berhasil masuk ke dashboard.');

        // Klik menu "Data Pengguna".
        let dataPenggunaMenu = await driver.wait(until.elementLocated(By.xpath('//span[text()="Data Pengguna"]')), 10000);
        await dataPenggunaMenu.click();
        console.log('Berhasil mengklik menu "Data Pengguna".');

        // Klik submenu "Dosen".
        let dosenSubmenu = await driver.wait(until.elementLocated(By.xpath('//span[text()="Dosen"]')), 10000);
        await dosenSubmenu.click();
        console.log('Berhasil mengklik submenu "Dosen".');

        // Tunggu sampai halaman dosen dimuat dan tombol "Tambah Dosen" terlihat.
        // Perbaikan: Mencari elemen <a> yang berisi <button> dengan teks "Tambah Dosen".
        // Ini adalah locator yang lebih fleksibel dan sesuai dengan struktur HTML yang Anda berikan.
        // Locator ini akan mencari tag <a> yang memiliki descendant (anak atau cucu) berupa button dengan teks "Tambah Dosen".
        await driver.wait(until.elementLocated(By.xpath('//button[contains(., "Tambah Dosen")]')), 10000);
        let tambahDosenButton = await driver.findElement(By.xpath('//button[contains(., "Tambah Dosen")]'));
        await tambahDosenButton.click();
        console.log('Berhasil mengklik tombol "Tambah Dosen".');
        
        // --- Langkah 3: Isi Formulir dan Simpan ---
        // Tunggu hingga halaman tambah dosen dimuat.
        await driver.wait(until.urlContains('/dosen/create'), 10000);
        console.log('Berhasil membuka halaman "Tambah Dosen".');

        // Isi Nama Dosen
        let namaDosenInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Masukkan nama lengkap tanpa gelar"]')), 10000);
        await namaDosenInput.sendKeys('Automation Dosen');
        console.log('Berhasil mengisi nama dosen.');

        // Isi NIP
        let nipInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Contoh: 198501012010011001"]')), 10000);
        await nipInput.sendKeys('198501012010011001');
        console.log('Berhasil mengisi NIP.');

        // Isi Alamat
        let alamatInput = await driver.wait(until.elementLocated(By.css('textarea')), 10000);
        await alamatInput.sendKeys('Jl. Automation No. 91');
        console.log('Berhasil mengisi alamat.');
        
        // Isi No HP
        let noHpInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Contoh: 081234567890"]')), 10000);
        await noHpInput.sendKeys('081234567899');
        console.log('Berhasil mengisi No HP.');

        // Klik tombol Simpan.
        let simpanButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(., "Simpan")]')), 10000);
        await simpanButton.click();
        console.log('Berhasil mengklik tombol Simpan.');

        // --- Langkah 4: Verifikasi hasil (opsional) ---
        // Tunggu notifikasi sukses
        // Asumsi notifikasi sukses memiliki kelas .swal2-success
        await driver.wait(until.elementLocated(By.css('.swal2-success')), 10000);
        console.log('Data dosen berhasil ditambahkan.');
        
        // Tunggu 5 detik sebelum menutup browser
        await driver.sleep(5000); 

    } catch (error) {
        // Tangani error yang terjadi
        console.error("Terjadi error: ", error);
    } finally {
        // Tutup browser setelah selesai, baik sukses maupun gagal
        await driver.quit();
        console.log('Browser telah ditutup.');
    }
}

// Jalankan fungsi pengujian
runTest();
