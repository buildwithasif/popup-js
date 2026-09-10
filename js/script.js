// DOM Elements
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const closeBtn = document.getElementById('close-btn');
const actionBtn = document.getElementById('action-btn');

// Funny Bangla Messages
const funnyMessages = [
    {
        title: "প্রথম ধাক্কা! 🤪",
        text: "ভাইরে ভাই! একটু পড়ালেখা বা কাজ করেন, সারাদিন ওয়েবসাইট ঘুরে কী হবে?"
    },
    {
        title: "দ্বিতীয় ধাক্কা! 😜",
        text: "আপনি কি ভেবেছিলেন আবার আসবে না? আমি কিন্তু ১০ সেকেন্ড পরেই চলে এলাম!"
    },
    {
        title: "শেষ হুমকি! 😈",
        text: "আর একবার বন্ধ করলে আমি চিরতরে গায়েব হয়ে যাবো! কথা দিলাম আর ডিস্টার্ব করবো না।"
    }
];

let showCount = 0; // Popup counter

// Function to show popup
function showPopup(index) {
    // Check if user already disabled popup permanently
    if (localStorage.getItem('popupClosedForever') === 'true') {
        return;
    }

    popupTitle.innerText = funnyMessages[index].title;
    popupText.innerText = funnyMessages[index].text;
    popupOverlay.classList.remove('hidden');
}

// Function to hide popup and trigger next timer
function closePopup() {
    popupOverlay.classList.add('hidden');
    showCount++;

    if (showCount === 1) {
        // 2nd Popup after 10 seconds (10000 ms)
        setTimeout(() => {
            showPopup(1);
        }, 10000);
    } else if (showCount === 2) {
        // 3rd Popup after 15 seconds (15000 ms)
        setTimeout(() => {
            showPopup(2);
        }, 15000);
    } else if (showCount >= 3) {
        // Save to LocalStorage after 3rd close (Permanently Close)
        localStorage.setItem('popupClosedForever', 'true');
        console.log("Popup permanently closed and saved in localStorage.");
    }
}

// Event Listeners for Close
closeBtn.addEventListener('click', closePopup);
actionBtn.addEventListener('click', closePopup);

// Initial Timer: 1st Popup after 5 seconds (5000 ms)
window.addEventListener('DOMContentLoaded', () => {
    // Check local storage before running timer
    if (localStorage.getItem('popupClosedForever') !== 'true') {
        setTimeout(() => {
            showPopup(0);
        }, 5000);
    }
});