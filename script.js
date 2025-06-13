// script.js
// document.getElementById("darkToggle").addEventListener("click", () => {
//   document.body.classList.toggle("dark");
// });

// 🌙 Dark Mode Toggle + Save to localStorage
const darkToggle = document.getElementById("darkToggle");

// Load preference from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}

// Toggle dark mode
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  });
}

// BMI Calculator Logic
if (window.location.pathname.includes("bmi.html")) {
  const form = document.getElementById("bmiForm");
  const resultBox = document.getElementById("resultBox");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  // Load from localStorage if available
  const savedBMI = JSON.parse(localStorage.getItem("bmiData"));
  if (savedBMI) {
    heightInput.value = savedBMI.height;
    weightInput.value = savedBMI.weight;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    if (!height || !weight) return;

    const bmi = (weight / (height / 100) ** 2).toFixed(1);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obesity";

    resultBox.innerHTML = `
      <h3>Your BMI is ${bmi}</h3>
      <p>Category: <strong>${category}</strong></p>
    `;

    // Save to localStorage
    localStorage.setItem("bmiData", JSON.stringify({ height, weight }));
  });
}

if (window.location.pathname.includes("bmi.html")) {
  const form = document.getElementById("bmiForm");
  const resultBox = document.getElementById("resultBox");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  // Load previous data
  const savedBMI = JSON.parse(localStorage.getItem("bmiData"));
  if (savedBMI) {
    heightInput.value = savedBMI.height;
    weightInput.value = savedBMI.weight;
  }

  let chart; // for storing Chart.js instance

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    if (!height || !weight) return;

    const bmi = (weight / (height / 100) ** 2).toFixed(1);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obesity";

    resultBox.innerHTML = `
      <h3>Your BMI is ${bmi}</h3>
      <p>Category: <strong>${category}</strong></p>
    `;

    // Save to localStorage
    localStorage.setItem("bmiData", JSON.stringify({ height, weight }));

    // Render Chart
    const ctx = document.getElementById("bmiChart").getContext("2d");

    if (chart) chart.destroy(); // destroy previous chart if exists

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Underweight", "Normal", "Overweight", "Obese"],
        datasets: [
          {
            label: "BMI Range",
            data: [18.4, 24.9, 29.9, 40],
            backgroundColor: ["#00bcd4", "#4caf50", "#ff9800", "#f44336"],
          },
          {
            type: "line",
            label: "Your BMI",
            data: [bmi, bmi, bmi, bmi],
            borderColor: "#0077ff",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "BMI Category Chart",
          },
        },
        scales: {
          y: { beginAtZero: true, suggestedMax: 45 },
        },
      },
    });
  });
}

// BMR Calculator Logic
if (window.location.pathname.includes("bmr.html")) {
  const form = document.getElementById("bmrForm");
  const resultBox = document.getElementById("resultBox");

  const genderInput = document.getElementById("gender");
  const ageInput = document.getElementById("age");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  // Prefill from localStorage if available
  const commonData = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (commonData.gender) genderInput.value = commonData.gender;
  if (commonData.age) ageInput.value = commonData.age;
  if (commonData.height) heightInput.value = commonData.height;
  if (commonData.weight) weightInput.value = commonData.weight;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = genderInput.value;
    const age = parseFloat(ageInput.value);
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!gender || !age || !height || !weight) return;

    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    resultBox.innerHTML = `
      <h3>Your BMR is ${bmr.toFixed(2)} calories/day</h3>
      <p>This is the number of calories your body needs at rest.</p>
    `;

    // Save data for pre-filling across tools
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ gender, age, height, weight })
    );

    // Destroy previous chart if it exists
    if (window.bmrChart instanceof Chart) {
      window.bmrChart.destroy();
    }

    const activityLevels = [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Super Active",
    ];
    const factors = [1.2, 1.375, 1.55, 1.725, 1.9];
    const calories = factors.map((f) => parseFloat((bmr * f).toFixed(2)));

    const ctx = document.getElementById("bmrChart").getContext("2d");
    window.bmrChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: activityLevels,
        datasets: [
          {
            label: "Estimated Calorie Needs",
            data: calories,
            backgroundColor: "#4caf50",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Calorie Needs by Activity Level",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Calories per day",
            },
          },
        },
      },
    });
  });
}

// TDEE Calculator Logic
if (window.location.pathname.includes("tdee.html")) {
  const form = document.getElementById("tdeeForm");
  const resultBox = document.getElementById("resultBox");

  const genderInput = document.getElementById("gender");
  const ageInput = document.getElementById("age");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const activityInput = document.getElementById("activity");

  // Prefill from localStorage
  const commonData = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (commonData.gender) genderInput.value = commonData.gender;
  if (commonData.age) ageInput.value = commonData.age;
  if (commonData.height) heightInput.value = commonData.height;
  if (commonData.weight) weightInput.value = commonData.weight;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = genderInput.value;
    const age = parseFloat(ageInput.value);
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const activityFactor = parseFloat(activityInput.value);

    if (!gender || !age || !height || !weight || !activityFactor) return;

    // Calculate BMR
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = bmr * activityFactor;

    resultBox.innerHTML = `
      <h3>Your TDEE is ${tdee.toFixed(2)} calories/day</h3>
      <p>This is your estimated daily calorie requirement based on your activity level.</p>
    `;

    // Save data
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ gender, age, height, weight })
    );

    // Chart
    const labels = ["BMR", "TDEE"];
    const values = [bmr, tdee];

    if (window.tdeeChart instanceof Chart) {
      window.tdeeChart.destroy();
    }

    const ctx = document.getElementById("tdeeChart").getContext("2d");
    window.tdeeChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Calories",
            data: values,
            backgroundColor: ["#2196f3", "#4caf50"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "BMR vs TDEE",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Calories/day",
            },
          },
        },
      },
    });
  });
}

// IBW Calculator Logic
if (window.location.pathname.includes("ibw.html")) {
  const form = document.getElementById("ibwForm");
  const resultBox = document.getElementById("resultBox");

  const genderInput = document.getElementById("gender");
  const heightInput = document.getElementById("height");

  // Prefill from localStorage
  const commonData = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (commonData.gender) genderInput.value = commonData.gender;
  if (commonData.height) heightInput.value = commonData.height;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = genderInput.value;
    const heightCm = parseFloat(heightInput.value);

    if (!gender || !heightCm) return;

    // Convert height cm to inches
    const heightInches = heightCm / 2.54;
    const baseHeightInches = 60; // 5 feet

    let ibw;

    if (heightInches < baseHeightInches) {
      // For below 5 feet, use base weight
      ibw = gender === "male" ? 50 : 45.5;
    } else {
      ibw =
        gender === "male"
          ? 50 + 2.3 * (heightInches - baseHeightInches)
          : 45.5 + 2.3 * (heightInches - baseHeightInches);
    }

    resultBox.innerHTML = `
      <h3>Your Ideal Body Weight (Devine Formula) is ${ibw.toFixed(2)} kg</h3>
      <p>This is an estimate of your ideal weight based on your height and gender.</p>
    `;

    // Save to localStorage profile
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    userProfile.gender = gender;
    userProfile.height = heightCm;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  });
}

// Body Fat Percentage (Navy Method)
if (window.location.pathname.includes("bodyfat.html")) {
  const form = document.getElementById("bodyFatForm");
  const resultBox = document.getElementById("resultBox");

  const genderInput = document.getElementById("gender");
  const heightInput = document.getElementById("height");
  const neckInput = document.getElementById("neck");
  const waistInput = document.getElementById("waist");
  const hipInput = document.getElementById("hip");
  const hipLabel = document.getElementById("hipLabel");

  // Show hip input only for females
  genderInput.addEventListener("change", () => {
    hipLabel.style.display = genderInput.value === "female" ? "block" : "none";
  });

  // Prefill from localStorage
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (userProfile.gender) genderInput.value = userProfile.gender;
  if (userProfile.height) heightInput.value = userProfile.height;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = genderInput.value;
    const height = parseFloat(heightInput.value);
    const neck = parseFloat(neckInput.value);
    const waist = parseFloat(waistInput.value);
    const hip = parseFloat(hipInput.value || 0);

    if (
      !gender ||
      !height ||
      !neck ||
      !waist ||
      (gender === "female" && !hip)
    ) {
      resultBox.innerHTML = "<p>Please fill all required fields.</p>";
      return;
    }

    const log10 = (x) => Math.log(x) / Math.LN10;

    let bodyFat;
    if (gender === "male") {
      bodyFat = 86.01 * log10(waist - neck) - 70.041 * log10(height) + 36.76;
    } else {
      bodyFat =
        163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387;
    }

    bodyFat = bodyFat.toFixed(2);

    resultBox.innerHTML = `
      <h3>Your Body Fat Percentage is ${bodyFat}%</h3>
      <p>This is an estimate using the U.S. Navy Method.</p>
    `;

    // Save basic data
    userProfile.gender = gender;
    userProfile.height = height;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Destroy existing chart if it exists

    if (window.bodyFatChart instanceof Chart) {
      window.bodyFatChart.destroy();
    }

    // Create Chart
    const ctx = document.getElementById("bodyFatChart").getContext("2d");
    window.bodyFatChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Body Fat %", "Lean Body Mass %"],
        datasets: [
          {
            data: [bodyFat, 100 - bodyFat],
            backgroundColor: ["#f87171", "#34d399"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw.toFixed(2) + "%";
              },
            },
          },
        },
      },
    });
  });
}

// Waist-to-Height Ratio Tool
if (window.location.pathname.includes("waisttoheight.html")) {
  const form = document.getElementById("whtrForm");
  const resultBox = document.getElementById("resultBox");
  const heightInput = document.getElementById("height");
  const waistInput = document.getElementById("waist");

  // Prefill if data available
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (userProfile.height) heightInput.value = userProfile.height;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const height = parseFloat(heightInput.value);
    const waist = parseFloat(waistInput.value);

    if (!height || !waist) return;

    const whtr = waist / height;
    const whtrRounded = whtr.toFixed(2);

    let category = "";
    if (whtr < 0.35) category = "Extremely Slim";
    else if (whtr < 0.5) category = "Slim";
    else if (whtr < 0.6) category = "Healthy";
    else if (whtr < 0.7) category = "Overweight";
    else category = "Obese";

    resultBox.innerHTML = `
      <h3>Your Waist-to-Height Ratio is ${whtrRounded}</h3>
      <p>Status: <strong>${category}</strong></p>
    `;

    // Save user profile
    userProfile.height = height;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Chart.js
    if (window.whtrChart instanceof Chart) {
      window.whtrChart.destroy();
    }

    const ctx = document.getElementById("whtrChart").getContext("2d");
    window.whtrChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Waist", "Remaining Height"],
        datasets: [
          {
            data: [waist, height - waist],
            backgroundColor: ["#60a5fa", "#10b981"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw.toFixed(1) + " cm";
              },
            },
          },
        },
      },
    });
  });
}

// Water Intake Calculator
if (window.location.pathname.includes("waterintake.html")) {
  const form = document.getElementById("waterForm");
  const resultBox = document.getElementById("resultBox");
  const weightInput = document.getElementById("weight");

  // Prefill from localStorage if available
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (userProfile.weight) weightInput.value = userProfile.weight;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const weight = parseFloat(weightInput.value);
    if (!weight) return;

    const waterLiters = (weight * 0.033).toFixed(2);

    resultBox.innerHTML = `
      <h3>Recommended Daily Water Intake: ${waterLiters} liters</h3>
      <p>💧 Based on your weight of ${weight} kg</p>
    `;

    // Save weight in user profile
    userProfile.weight = weight;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Chart
    if (window.waterChart instanceof Chart) {
      window.waterChart.destroy();
    }

    const ctx = document.getElementById("waterChart").getContext("2d");
    window.waterChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Water Target", "Remaining"],
        datasets: [
          {
            data: [parseFloat(waterLiters), 4 - parseFloat(waterLiters)],
            backgroundColor: ["#3b82f6", "#d1d5db"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw.toFixed(2) + " L";
              },
            },
          },
        },
      },
    });
  });
}

// Heart Rate Zone Calculator
if (window.location.pathname.includes("heartrate.html")) {
  const form = document.getElementById("hrForm");
  const resultBox = document.getElementById("resultBox");
  const ageInput = document.getElementById("age");
  const rhrInput = document.getElementById("rhr");

  // Prefill if available
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (userProfile.age) ageInput.value = userProfile.age;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = parseInt(ageInput.value);
    const rhr = parseInt(rhrInput.value);
    if (!age || !rhr) return;

    const mhr = 220 - age;
    const hrr = mhr - rhr;

    const zones = [
      {
        label: "Very Light (Recovery) (50–60%)",
        min: 0.5,
        max: 0.6,
        color: "#60a5fa",
      },
      {
        label: "Light (Fat Burn) (60–70%)",
        min: 0.6,
        max: 0.7,
        color: "#38bdf8",
      },
      {
        label: "Moderate (Endurance) (70–80%)",
        min: 0.7,
        max: 0.8,
        color: "#0ea5e9",
      },
      {
        label: "Hard (Performance) (80–90%)",
        min: 0.8,
        max: 0.9,
        color: "#0284c7",
      },
      {
        label: "Maximum Effort (90–100%)",
        min: 0.9,
        max: 1.0,
        color: "#1e3a8a",
      },
    ];

    let html = `<h3>Heart Rate Zones (MHR: ${mhr} bpm)</h3><ul>`;
    const chartLabels = [],
      chartData = [],
      chartColors = [];

    zones.forEach((zone) => {
      const minHR = Math.round(hrr * zone.min + rhr);
      const maxHR = Math.round(hrr * zone.max + rhr);
      html += `<li><strong>${zone.label}</strong>: ${minHR}–${maxHR} bpm</li>`;
      chartLabels.push(zone.label);
      chartData.push(maxHR);
      chartColors.push(zone.color);
    });
    html += "</ul>";
    resultBox.innerHTML = html;

    // Save user profile
    userProfile.age = age;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Chart.js
    if (window.hrChart instanceof Chart) {
      window.hrChart.destroy();
    }

    const ctx = document.getElementById("hrChart").getContext("2d");
    window.hrChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Max Heart Rate per Zone",
            data: chartData,
            backgroundColor: chartColors,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.raw + " bpm",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Heart Rate (bpm)" },
          },
        },
      },
    });
  });
}

// Pregnancy Due Date Calculator
if (window.location.pathname.includes("pregnancy.html")) {
  const form = document.getElementById("pregnancyForm");
  const resultBox = document.getElementById("resultBox");
  const lmpInput = document.getElementById("lmpDate");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const lmp = new Date(lmpInput.value);
    if (isNaN(lmp)) return;

    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // Add 280 days

    const formatDate = (date) =>
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    resultBox.innerHTML = `
      <h3>Estimated Due Date: <span style="color:#10b981">${formatDate(
        dueDate
      )}</span></h3>
      <p>🗓️ Based on LMP: ${formatDate(lmp)}</p>
      <p>👶 Gestation Period: 40 weeks (280 days)</p>
    `;

    // Pregnancy Timeline Chart
    const today = new Date();
    const daysPregnant = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const totalDays = 280;

    const chartData = {
      labels: ["Trimester 1", "Trimester 2", "Trimester 3"],
      datasets: [
        {
          label: "Pregnancy Timeline",
          data: [91, 91, 98], // days per trimester
          backgroundColor: ["#60a5fa", "#38bdf8", "#0ea5e9"],
          borderRadius: 5,
        },
      ],
    };

    if (window.pregnancyChart instanceof Chart) {
      window.pregnancyChart.destroy();
    }
    const ctx = document.getElementById("pregnancyChart").getContext("2d");
    Chart.register(window["chartjs-plugin-annotation"]);

    window.pregnancyChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw} days`,
            },
          },
          annotation: {
            annotations: {
              todayLine: {
                type: "line",
                xMin: daysPregnant,
                xMax: daysPregnant,
                borderColor: "#f59e0b",
                borderWidth: 2,
                label: {
                  content: "Today",
                  enabled: true,
                  position: "start",
                },
              },
            },
          },
        },
        scales: {
          x: {
            max: totalDays,
            title: { display: true, text: "Days" },
          },
        },
      },
    });

    // Week-by-Week Tracker
    const currentWeek = Math.min(Math.ceil(daysPregnant / 7), 40);

    let trimester;
    if (currentWeek <= 13) trimester = "Trimester 1";
    else if (currentWeek <= 27) trimester = "Trimester 2";
    else trimester = "Trimester 3";

    const weekTracker = document.getElementById("weekTracker");

    weekTracker.innerHTML = `
  <h3>You're in <span style="color:#0ea5e9">${trimester}</span></h3>
  <p>Currently in <strong>Week ${currentWeek}</strong> of 40</p>

  <div class="progress-bar">
    <div class="progress-fill" style="width:${(currentWeek / 40) * 100}%"></div>
  </div>
  <p style="font-size: 0.9rem; opacity: 0.8;">Week ${currentWeek}: ${getWeekDescription(
      currentWeek
    )}</p>
`;

    // Optional: Save LMP in localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    userProfile.lmp = lmpInput.value;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  });

  // Prefill if available
  const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (savedProfile.lmp) lmpInput.value = savedProfile.lmp;
}

function getWeekDescription(week) {
  const highlights = {
    1: "Start of pregnancy — LMP used as day 1.",
    4: "Implantation may occur.",
    6: "Heartbeat may begin.",
    12: "First trimester ends soon.",
    20: "Halfway there! You may feel movement.",
    28: "Welcome to the third trimester.",
    36: "Baby is getting ready for birth.",
    40: "Estimated due week!",
  };
  return highlights[week] || "Developing baby and body changes continue.";
}

if (window.location.pathname.includes("calories.html")) {
  const form = document.getElementById("calorieForm");
  const resultBox = document.getElementById("calorieResult");
  const weightInput = document.getElementById("weight");
  const activitySelect = document.getElementById("activitySelect");
  const durationInput = document.getElementById("duration");

  // Prefill weight if available
  const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (savedProfile.weight) weightInput.value = savedProfile.weight;

  let calorieChart;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const weight = parseFloat(weightInput.value);
    const met = parseFloat(activitySelect.value);
    const duration = parseFloat(durationInput.value);
    const durationHours = duration / 60;
    const calories = Math.round(met * weight * durationHours);

    // Save to localStorage
    savedProfile.weight = weight;
    localStorage.setItem("userProfile", JSON.stringify(savedProfile));

    resultBox.innerHTML = `
      <h3>Calories Burned: <span style="color:#10b981">${calories}</span> kcal</h3>
      <p>Activity: ${
        activitySelect.options[activitySelect.selectedIndex].text
      }</p>
      <p>Duration: ${duration} mins</p>
      <p>MET: ${met}</p>
    `;

    // Chart Visualization
    const ctx = document.getElementById("calorieChart").getContext("2d");
    const sampleActivities = [
      { name: "Walking", met: 3.5 },
      { name: "Running", met: 8 },
      { name: "Cycling", met: 7 },
      { name: "Swimming", met: 9.8 },
      { name: "Dancing", met: 6 },
    ];
    const chartData = sampleActivities.map((act) =>
      Math.round(act.met * weight * durationHours)
    );

    if (calorieChart) calorieChart.destroy();

    calorieChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sampleActivities.map((act) => act.name),
        datasets: [
          {
            label: "Calories Burned (kcal)",
            data: chartData,
            backgroundColor: "#3b82f6",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw} kcal`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Calories" },
          },
        },
      },
    });
  });
}

if (window.location.pathname.includes("summary.html")) {
  const profileDiv = document.getElementById("profileSummary");
  const user = JSON.parse(localStorage.getItem("userProfile")) || {};

  // Show basic info
  profileDiv.innerHTML = `
    <h2>👤 Profile Summary</h2>
    <p><strong>Age:</strong> ${user.age || "N/A"}</p>
    <p><strong>Gender:</strong> ${user.gender || "N/A"}</p>
    <p><strong>Weight:</strong> ${user.weight || "N/A"} kg</p>
    <p><strong>Height:</strong> ${user.height || "N/A"} cm</p>
  `;

  // Load saved BMI result
  const bmi = user.bmi;
  if (bmi) {
    const ctx1 = document.getElementById("bmiChart").getContext("2d");
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Underweight", "Normal", "Overweight", "Obese"],
        datasets: [
          {
            label: "Your BMI",
            data: [
              bmi < 18.5 ? bmi : 0,
              bmi >= 18.5 && bmi <= 24.9 ? bmi : 0,
              bmi > 24.9 && bmi <= 29.9 ? bmi : 0,
              bmi >= 30 ? bmi : 0,
            ],
            backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#f87171"],
          },
        ],
      },
      options: { plugins: { legend: { display: false } } },
    });
  }

  // Water Intake
  const water = user.waterIntake;
  if (water) {
    const ctx2 = document.getElementById("waterChart").getContext("2d");
    new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Required", "Drunk"],
        datasets: [
          {
            data: [water, user.waterDrunk || 0],
            backgroundColor: ["#3b82f6", "#a5f3fc"],
          },
        ],
      },
    });
  }

  // Calories Burned Summary
  const ctx3 = document.getElementById("calorieSummaryChart").getContext("2d");
  const calorieData = JSON.parse(localStorage.getItem("calorieHistory")) || [];
  const activities = calorieData.map((d) => d.activity);
  const values = calorieData.map((d) => d.calories);

  if (activities.length) {
    new Chart(ctx3, {
      type: "bar",
      data: {
        labels: activities,
        datasets: [
          {
            label: "Calories Burned",
            data: values,
            backgroundColor: "#0ea5e9",
          },
        ],
      },
    });
  }

  // Pregnancy Chart (if user is pregnant)
  const lmp = user.lmp;
  if (lmp) {
    const today = new Date();
    const daysPregnant = Math.floor(
      (today - new Date(lmp)) / (1000 * 60 * 60 * 24)
    );
    const ctx4 = document
      .getElementById("pregnancyChartSummary")
      .getContext("2d");
    new Chart(ctx4, {
      type: "bar",
      data: {
        labels: ["Pregnancy Progress"],
        datasets: [
          {
            label: "Days Pregnant",
            data: [daysPregnant],
            backgroundColor: "#f472b6",
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: 280,
            title: { display: true, text: "Out of 280 days" },
          },
        },
      },
    });
  } else {
    document.getElementById("pregnancySection").style.display = "none";
  }
}
