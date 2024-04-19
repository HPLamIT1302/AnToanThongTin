   // xử lý hàm băm md5
   function calculateMD5() {
    const inputMD5 = document.getElementById('inputMD5').value;
    const hashValue = CryptoJS.MD5(inputMD5).toString();

    const outputMD5 = document.getElementById('outputMD5');
    outputMD5.innerHTML = `
        <div class="alert alert-info mt-3 text-wrap" role="alert">
            MD5 Hash: 
            <br>
            ${hashValue}
        </div>
    `;
}

// xử lý hàm băm SHA-1
function calculateSHA1() {
    const inputSHA1 = document.getElementById('inputSHA1').value;
    const hashValue = CryptoJS.SHA1(inputSHA1).toString();

    const outputSHA1 = document.getElementById('outputSHA1');
    outputSHA1.innerHTML = `
        <div class="alert alert-info mt-3 text-wrap" role="alert">
            SHA-1 Hash: 
            <br>
            ${hashValue}
        </div>
    `;
}

// xủ lý hàm băm SHA-256
function calculateSHA256() {
    const inputSHA256 = document.getElementById('inputSHA256').value;
    const hashValue = CryptoJS.SHA256(inputSHA256).toString();

    const outputSHA256 = document.getElementById('outputSHA256');
    outputSHA256.innerHTML = `
        <div class="alert alert-info mt-3 text-wrap" role="alert">
            SHA-256 Hash: 
            <br>
            ${hashValue}
        </div>
    `;
}


function calculateSHA3() {
    // Lấy giá trị đầu vào từ input
    const inputSHA3 = document.getElementById('inputSHA3').value;

    // Tính toán giá trị băm SHA-3 (SHA3-256) bằng thư viện crypto-js
    const hashValueSHA3 = CryptoJS.SHA3(inputSHA3, { outputLength: 256 }).toString();

    // Hiển thị giá trị băm SHA-3 ra phần tử có id là outputSHA3
    const outputSHA3 = document.getElementById('outputSHA3');
    outputSHA3.innerHTML = `
        <div class="alert alert-info mt-3 text-wrap" role="alert">
            SHA-3 (SHA3-256) Hash: 
            <br>
            ${hashValueSHA3}
        </div>
    `;
}

// xem mật khẩu
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Function to determine password strength and estimate crack time
function checkPasswordStrength() {
const password = $('#password').val();
const passwordLength = password.length;
const hasLowercase = /[a-z]/.test(password);
const hasUppercase = /[A-Z]/.test(password);
const hasDigit = /\d/.test(password);
const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

// Update password length display
$('#passwordLength').text(`${passwordLength} ký tự`);

// Update character types display and check icons
updateCharacterType('#ck1', hasLowercase, '#check1');
updateCharacterType('#ck2', hasUppercase, '#check2');
updateCharacterType('#ck3', hasDigit, '#check3');
updateCharacterType('#ck4', hasSpecialChar, '#check4');

// Check if the password is weak (in dictionary or common passwords)
const isWeak = isInDictionary(password) || isCommonPassword(password);

if (isWeak) {
// Password is weak (in dictionary or common passwords)
$('#passwordStrength').html(`<i class="fas fa-user-shield"></i> Rất yếu`);
$('#passwordStrength').removeClass('text-warning text-success').addClass('text-danger');

$('#strengthProgressBar').css('width', '10%').removeClass('bg-warning bg-success').addClass('bg-danger');
} else {
// Determine password strength based on length and character requirements
let strength = 'Rất yếu';
let progressWidth = 10;
let progressBarColor = 'bg-danger';

if (passwordLength >= 16 && hasLowercase && hasUppercase && hasDigit && hasSpecialChar) {
    strength = 'Mạnh';
    progressWidth = 100;
    progressBarColor = 'bg-success';
} else if (passwordLength >= 12 && (hasLowercase || hasUppercase || hasDigit || hasSpecialChar)) {
    strength = 'Tốt';
    progressWidth = 77;
    progressBarColor = 'bg-success';
} else if (passwordLength >= 8 && (hasLowercase || hasUppercase || hasDigit || hasSpecialChar)) {
    strength = 'Trung bình';
    progressWidth = 50;
    progressBarColor = 'bg-warning';
} else if (passwordLength >= 6 && (hasLowercase || hasUppercase || hasDigit || hasSpecialChar)) {
    strength = 'Yếu';
    progressWidth = 35;
    progressBarColor = 'bg-warning';
}

// Update password strength text and icon
$('#passwordStrength').html(`<i class="fas fa-user-shield"></i> ${strength}`);
$('#passwordStrength').removeClass('text-danger text-warning text-success').addClass(progressBarColor.replace('bg-', 'text-'));

// Update progress bar width and color
$('#strengthProgressBar').css('width', `${progressWidth}%`).removeClass('bg-danger bg-warning bg-success').addClass(`progress-bar ${progressBarColor} progress-bar-striped progress-bar-animated`);
}
}

// Function to update character type display
function updateCharacterType(elementId, hasType, iconId) {
const element = $(elementId);
const checkIcon = $(iconId);

if (hasType) {
    element.addClass('text-success').removeClass('text-danger');
    checkIcon.removeClass('d-none');
} else {
    element.removeClass('text-success').addClass('text-danger');
    checkIcon.addClass('d-none');
}
}

// Attach event listener to password input field
$(document).ready(function () {
$('#password').on('input', function () {
    checkPasswordStrength();
    estimateCrackTime();
});
});

// Function to estimate crack time and display result
function estimateCrackTime() {
const password = $('#password').val(); // Get password value using jQuery
const isWeak = isInDictionary(password) || isCommonPassword(password);

let crackTimeSeconds;
if (isWeak) {
    crackTimeSeconds = 0; // Assume crack time is 0 seconds for weak passwords
} else {
    crackTimeSeconds = calculateCrackTime(password);
}

const formattedTime = formatTime(crackTimeSeconds);

const crackTimeResultElement = $('#crackTimeResult');
crackTimeResultElement.html(`
    <div class="alert alert-info mt-3 text-wrap" role="alert">
    <p class="text-secondary"><i>Thời gian này chỉ là ước tính. Tùy thuộc vào mỗi năm mà số liệu có thể bị thay đổi!</i></p>
        Thời gian ước tính phá giải mật khẩu (brute-force attack và tấn công từ điển): 
        <br>
        ${formattedTime} 
    </div>
`);
}

// Function to calculate crack time in seconds
function calculateCrackTime(password) {
const characters = 94; // Number of possible characters (approximately 94 printable ASCII characters)
const keysPerSecond = 17042497.3; // Number of keys per second

const possibilities = characters ** password.length; // Number of password possibilities
const crackTimeSeconds = possibilities / keysPerSecond; // Estimated time to crack the password (seconds)

return crackTimeSeconds;
}

// Function to format time in appropriate units (years, months, days, hours, minutes, seconds)
function formatTime(seconds) {
if (seconds < 1) {
    return "dưới 1 giây";
}

const timeUnits = [
    { unit: "năm", duration: 60 * 60 * 24 * 365 },
    { unit: "tháng", duration: 60 * 60 * 24 * 30 },
    { unit: "ngày", duration: 60 * 60 * 24 },
    { unit: "giờ", duration: 60 * 60 },
    { unit: "phút", duration: 60 },
    { unit: "giây", duration: 1 }
];

for (const unit of timeUnits) {
    const value = Math.floor(seconds / unit.duration);
    if (value >= 1) {
        return `${value} ${unit.unit}${value === 1 ? "" : ""}`;
    }
}

return "một vài giây"; // Less than 1 second case
}

// Function to check if the password is in the dictionary
function isInDictionary(password) {
const lowercasePassword = password.toLowerCase();
// const dictionary = ['password', '123456', 'qwerty']; // Example dictionary array
return dictionary.includes(lowercasePassword);
}

// Function to check if the password is a common password
function isCommonPassword(password) {
const lowercasePassword = password.toLowerCase();
// const wordlist = ['letmein', 'password123', 'admin']; // Example wordlist array
return wordlist.includes(lowercasePassword);
}










document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các liên kết trong thanh điều hướng
    const navLinks = document.querySelectorAll('.navbar-nav a');

    // Xử lý sự kiện cuộn trang
    window.addEventListener('scroll', () => {
        // Lặp qua từng liên kết trong thanh điều hướng
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Kiểm tra nếu phần tử đích hiện diện trong cửa sổ hiển thị
            if (isElementInViewport(targetElement)) {
                // Xóa lớp active khỏi tất cả các liên kết
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Thêm lớp active cho liên kết tương ứng
                link.classList.add('active');
            }
        });
    });

    // Hàm kiểm tra xem phần tử có trong vùng nhìn thấy của cửa sổ không
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
