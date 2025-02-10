document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function applyTheme(theme) {
        if (theme === "light") {
            document.documentElement.style.setProperty("--bg-color", "#ffffff");
            document.documentElement.style.setProperty("--text-color", "#000000");
            document.documentElement.style.setProperty("--btn-bg", "#ccc");
            themeToggle.textContent = "🌙";
        } else {
            document.documentElement.style.setProperty("--bg-color", "#121212");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            document.documentElement.style.setProperty("--btn-bg", "#333");
            themeToggle.textContent = "☀";
        }
    }
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
//theme hi hai 
    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.style.getPropertyValue("--bg-color") === "#ffffff" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });
});



// Add Habit
function addHabit() {
    const habitInput = document.getElementById("habitInput");
    const timeInput = document.getElementById("timeInput");
    const habitList = document.getElementById("habitList");
    const streakList = document.getElementById("streakList");

    if (habitInput.value.trim() === "") return;

    const habitName = habitInput.value;

    const li = document.createElement("li");
    li.classList.add("habit-item");
    li.innerHTML = `
        <span>${habitName}</span>
        <div class="progress-container">
            <div class="progress-bar"></div>
        </div>
        <button class="checkpoint-btn" onclick="updateProgress(this, '${habitName}')">✔</button>
        <button class="remove-btn" onclick="confirmRemoval('${habitName}', this)">❌</button>
    `;

    habitList.appendChild(li);

    // Streak board
    const streakLi = document.createElement("li");
    streakLi.classList.add("streak-item");
    streakLi.setAttribute("data-habit", habitName);
    streakLi.innerHTML = `
        <span>${habitName}</span>
        <span class="medal">🥉</span>
        <span class="streak-count">0 days</span>
    `;

    streakList.appendChild(streakLi);
    habitInput.value = "";
}

// Update Progress
function updateProgress(button, habitName) {
    const progressBar = button.previousElementSibling.firstElementChild;
    let currentWidth = parseInt(progressBar.style.width) || 0;

    if (currentWidth < 100) {
        progressBar.style.width = (currentWidth + 20) + "%";
    }

    if (currentWidth + 20 >= 100) {
        updateStreak(habitName);
    }
}

// Update Streak
function updateStreak(habitName) {
    const streakItem = document.querySelector(`.streak-item[data-habit="${habitName}"]`);
    if (!streakItem) return;

    const streakCountSpan = streakItem.querySelector(".streak-count");
    const medalSpan = streakItem.querySelector(".medal");

    let currentStreak = parseInt(streakCountSpan.innerText) || 0;
    currentStreak++;

    streakCountSpan.innerText = `${currentStreak} days`;

    // sidha radiant
    if (currentStreak >= 30) {
        medalSpan.innerText = "💎"; 
    } else if (currentStreak >= 20) {
        medalSpan.innerText = "🥇"; 
    } else if (currentStreak >= 10) {
        medalSpan.innerText = "🥈"; 
    } else {
        medalSpan.innerText = "🥉"; 
    }
}

// Confirm kr rheee
function confirmRemoval(habitName, button) {
    if (confirm(`Are you sure you want to remove the habit: "${habitName}"?`)) {
        removeHabit(habitName, button);
    }
}

// deleted
function removeHabit(habitName, button) {
    const habitItem = button.parentElement;
    habitItem.remove();

    const streakItem = document.querySelector(`.streak-item[data-habit="${habitName}"]`);
    if (streakItem) {
        streakItem.remove();
    }

    alert(`"${habitName}" has been removed.`);
}
