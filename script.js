document.addEventListener("DOMContentLoaded", () => {
    // Core Game Variables
    let robots = 0;
    let productionRate = 1; // robots per second
    let upgrades = {
        speed: 1,
        selfRepair: 0,
        conquestPower: 1
    };
    let empireConquests = 0;
    let universeControl = 0;
    let multiverseExplored = 0;

    // Elements for displaying game stats
    const robotCountDisplay = document.getElementById("robot-count");
    const empireCountDisplay = document.getElementById("empire-count");
    const universeControlDisplay = document.getElementById("universe-control");
    const multiverseDisplay = document.getElementById("multiverse-explored");

    // Menu Elements
    const productionPanel = document.getElementById("production-panel");
    const upgradesPanel = document.getElementById("upgrades-panel");
    const empirePanel = document.getElementById("empire-panel");
    const universePanel = document.getElementById("universe-panel");
    const multiversePanel = document.getElementById("multiverse-panel");

    // Show Panels based on Menu Click
    const menuIcons = document.querySelectorAll(".menu-icon");
    menuIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            hidePanels();
            document.getElementById(`${icon.id}-panel`).style.display = "block";
        });
    });

    function hidePanels() {
        productionPanel.style.display = "none";
        upgradesPanel.style.display = "none";
        empirePanel.style.display = "none";
        universePanel.style.display = "none";
        multiversePanel.style.display = "none";
    }

    // Incremental Production of Robots
    function produceRobots() {
        robots += productionRate * upgrades.speed;
        updateDisplays();
    }

    // Upgrade System
    function purchaseUpgrade(type) {
        switch (type) {
            case 'speed':
                upgrades.speed += 1;
                break;
            case 'selfRepair':
                upgrades.selfRepair += 1;
                break;
            case 'conquestPower':
                upgrades.conquestPower += 1;
                break;
        }
        updateDisplays();
    }

    // Conquest System
    function conquerEmpire() {
        if (robots >= 100 * (empireConquests + 1)) {
            robots -= 100 * (empireConquests + 1);
            empireConquests += upgrades.conquestPower;
            universeControl += 1;
            updateDisplays();
        }
    }

    // Update the displayed stats
    function updateDisplays() {
        robotCountDisplay.innerText = `Robots: ${robots}`;
        empireCountDisplay.innerText = `Empires Conquered: ${empireConquests}`;
        universeControlDisplay.innerText = `Universe Control: ${universeControl}`;
        multiverseDisplay.innerText = `Multiverse Explored: ${multiverseExplored}`;
    }

    // Save and Load functions using localStorage
    function saveProgress() {
        const gameData = {
            robots: robots,
            upgrades: upgrades,
            empireConquests: empireConquests,
            universeControl: universeControl,
            multiverseExplored: multiverseExplored
        };
        localStorage.setItem("gameProgress", JSON.stringify(gameData));
        console.log("Progress Saved!");
    }

    function loadProgress() {
        const savedData = JSON.parse(localStorage.getItem("gameProgress"));
        if (savedData) {
            robots = savedData.robots;
            upgrades = savedData.upgrades;
            empireConquests = savedData.empireConquests;
            universeControl = savedData.universeControl;
            multiverseExplored = savedData.multiverseExplored;
            updateDisplays();
            console.log("Progress Loaded!");
        }
    }

    // Auto-save every minute
    setInterval(saveProgress, 60000);

    // Load progress when page is loaded
    loadProgress();

    // Game loop for incremental production every second
    setInterval(produceRobots, 1000);

    // Event listeners for buttons
    document.getElementById("production-button").addEventListener("click", produceRobots);
    document.getElementById("speed-upgrade-button").addEventListener("click", () => purchaseUpgrade('speed'));
    document.getElementById("self-repair-button").addEventListener("click", () => purchaseUpgrade('selfRepair'));
    document.getElementById("conquest-upgrade-button").addEventListener("click", () => purchaseUpgrade('conquestPower'));
    document.getElementById("conquer-empire-button").addEventListener("click", conquerEmpire);
});
