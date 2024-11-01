document.addEventListener("DOMContentLoaded", () => {
    const panels = document.querySelectorAll(".panel");
    const buttons = document.querySelectorAll(".menu button");

    // Show panel based on clicked button
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            panels.forEach(panel => panel.style.display = "none");
            document.getElementById(`${button.id}-panel`).style.display = "block";
        });
    });

    // Save and Load functions
    function saveProgress() {
        const data = {};
        panels.forEach(panel => {
            data[panel.id] = panel.innerHTML;
        });
        localStorage.setItem("gameProgress", JSON.stringify(data));
        console.log("Progress Saved!");
    }

    function loadProgress() {
        const savedData = JSON.parse(localStorage.getItem("gameProgress"));
        if (savedData) {
            panels.forEach(panel => {
                if (savedData[panel.id]) {
                    panel.innerHTML = savedData[panel.id];
                }
            });
            console.log("Progress Loaded!");
        }
    }

    // Auto-save every minute
    setInterval(saveProgress, 60000);

    // Load progress when page is loaded
    loadProgress();
});
