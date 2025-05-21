const gasList = [
  { name: 'Methane', threshold: 5, danger: 10 },
  { name: 'Carbon Monoxide', threshold: 25, danger: 50 },
  { name: 'Hydrogen Sulfide', threshold: 10, danger: 20 },
  { name: 'Sulfur Dioxide', threshold: 5, danger: 10 },
  { name: 'Nitrogen Dioxide', threshold: 3, danger: 6 },
  { name: 'Ammonia', threshold: 25, danger: 50 },
  { name: 'Ozone', threshold: 0.1, danger: 0.2 },
  { name: 'Carbon Dioxide', threshold: 5000, danger: 10000 }
];

let evacuationTriggered = false;
let workersIn = Math.floor(Math.random() * 401) + 300; // between 300–700
let workersOut = Math.floor(Math.random() * workersIn);
let workersInside = workersIn - workersOut;

function logout() {
  alert("Logged out!");
  window.location.href = 'index.html';
}

function generateGasData() {
  let gasLevels = [];
  let detected = [];
  let hazardous = [];
  let dangerDetected = false;
  let totalAirQuality = 0;

  const forceSafeScenario = Math.random() < 0.3; // 30% chance to force NO hazardous gases

  gasList.forEach(gas => {
    let value;
    if (forceSafeScenario) {
      value = parseFloat((Math.random() * gas.threshold * 0.8).toFixed(2)); 
      // Keep values well below threshold
    } else {
      value = parseFloat((Math.random() * gas.danger).toFixed(2));
    }

    gasLevels.push({ name: gas.name, value });
    totalAirQuality += value;

    if (value > 0) detected.push({ name: gas.name, value });
    if (value > gas.threshold) hazardous.push({ name: gas.name, value });
    if (value > gas.danger) dangerDetected = true;
  });

  updateDropdown("gasLevelDropdown", gasLevels);
  updateDropdown("gasDetectDropdown", detected);
  updateDropdown("hazardGasDropdown", hazardous);

  updateProgressBar("gasLevel", gasLevels.length);
  updateProgressBar("gasDetect", detected.length);
  updateProgressBar("hazardGas", hazardous.length);

  updateAirQuality(totalAirQuality / gasList.length);
  updateExhausterStatus(hazardous.length); // Pass hazardous gases count

  if (dangerDetected && !evacuationTriggered) {
    triggerEvacuation();
  }
}


function updateDropdown(id, data) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";
  data.forEach(item => {
    const option = document.createElement("option");
    option.text = `${item.name} - ${item.value} ppm`;
    dropdown.add(option);
  });
}

function updateProgressBar(id, count) {
  const badge = document.getElementById(id + "Badge");
  const bar = document.getElementById(id + "Progress");

  const percentage = (count / 8) * 100;
  bar.style.width = percentage + "%";
  badge.textContent = `${count}/8`;

  if (count <= 2) badge.style.background = "green";
  else if (count <= 5) badge.style.background = "orange";
  else badge.style.background = "red";
}

function updateAirQuality(avg) {
  const label = document.getElementById("airQualityLabel");

  if (avg <= 100) {
    label.textContent = "Good";
    label.style.color = "green";
  } else if (avg <= 1000) {
    label.textContent = "Ok";
    label.style.color = "orange";
  } else {
    label.textContent = "Bad";
    label.style.color = "red";
  }
}





function updateExhausterStatus(hazardousCount) {
  const status = document.getElementById("exhausterStatus");

  if (hazardousCount === 0) {
    status.textContent = "OFF";
    status.style.color = "green";
  } else {
    status.textContent = "ON";
    status.style.color = "red";
  }
}




function triggerEvacuation() {
  evacuationTriggered = true;
  document.getElementById("evacuationCard").style.display = "block";
  workersIn = 0;
  workersOut = 0;
  workersInside = 0;
  updateWorkerUI();
}

function updateWorkerUI() {
  const workerCountText = document.getElementById("workerCount");
  workerCountText.textContent = `${workersInside} Workers`;

  updateWorkerBar("workersIn", workersIn);
  updateWorkerBar("workersOut", workersOut);
}

function updateWorkerBar(id, count) {
  const badge = document.getElementById(id + "Badge");
  const bar = document.getElementById(id + "Progress");

  const percentage = (count / 700) * 100;
  bar.style.width = percentage + "%";
  badge.textContent = count;

  if (count <= 200) badge.style.background = "green";
  else if (count <= 500) badge.style.background = "orange";
  else badge.style.background = "red";
}

document.addEventListener("DOMContentLoaded", () => {
  generateGasData();
  updateWorkerUI();

  document.getElementById("profilePic").addEventListener("click", () => {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", (e) => {
    if (!e.target.matches('#profilePic')) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });

  setInterval(() => {
    if (!evacuationTriggered) generateGasData();
  }, 10000);
});

// Smooth Page Load
window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});

// Smooth Page Refresh with Loader
document.querySelector(".refresh-btn").addEventListener("click", () => {
  const loader = document.getElementById("pageLoader");
  loader.style.display = "flex";
  
  // Delay for the animation
  setTimeout(() => location.reload(), 1000);  
}); 