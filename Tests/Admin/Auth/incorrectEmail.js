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
        await emailInput.sendKeys('akaashi@ac.id');
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

        await driver.wait(
          until.urlContains('/dashboard'),
          10000
        );


        // // --- Langkah 2: Navigasi ke halaman "Tambah Dosen" ---
        // // Tunggu sampai halaman dashboard dimuat.
        // await driver.wait(until.urlIs('http://127.0.0.1:8000/dashboard'), 10000);
        // console.log('Berhasil masuk ke dashboard.');
        
        // // Tunggu 5 detik sebelum menutup browser
        // await driver.sleep(5000); 

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
