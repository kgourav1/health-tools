# 🩺 Health Tools Web Application

A modern, user-friendly, and fully responsive Health Tools web application built using **HTML**, **CSS**, **JavaScript**, and **Chart.js**. This project features **10 mini health calculators** along with a centralized **Health Summary Dashboard**.

---

## 🚀 Features

* 🎛️ Dashboard to navigate all health calculators
* 🌙 Dark Mode with persistent theme memory (via localStorage)
* 💾 Input auto-fill across calculators (shared user data via localStorage)
* 📊 Visual feedback using Chart.js
* 📱 Fully responsive design
* 🧠 Health Summary with user profile, past results & insights

---

## 🧮 Included Health Calculators

### 1. **BMI (Body Mass Index)**

**Formula:**

```
BMI = weight (kg) / (height (m))^2
```

* Interpretation: Underweight, Normal, Overweight, Obese

### 2. **BMR (Basal Metabolic Rate)**

**Formula (Mifflin-St Jeor Equation):**

```
For Men: BMR = 10*weight + 6.25*height - 5*age + 5
For Women: BMR = 10*weight + 6.25*height - 5*age - 161
```

### 3. **TDEE (Total Daily Energy Expenditure)**

**Formula:**

```
TDEE = BMR * Activity Factor
```

Activity Factors: Sedentary (1.2), Light (1.375), Moderate (1.55), Active (1.725), Very Active (1.9)

### 4. **Ideal Body Weight (IBW)**

**Formula (Devine):**

```
Men: 50 + 2.3*(height in inches - 60)
Women: 45.5 + 2.3*(height in inches - 60)
```

### 5. **Body Fat Percentage (Navy Method)**

**Formula:**

```
Men: 495 / (1.0324 - 0.19077*log10(waist-neck) + 0.15456*log10(height)) - 450
Women: 495 / (1.29579 - 0.35004*log10(waist+hip-neck) + 0.22100*log10(height)) - 450
```

### 6. **Waist-to-Height Ratio**

**Formula:**

```
Ratio = waist circumference / height
```

* Good if < 0.5 (depends on gender and age)

### 7. **Daily Water Intake**

**Formula:**

```
Water (liters) = weight (kg) * 0.033
```

### 8. **Heart Rate Zone Calculator**

**Formulas:**

```
Max HR = 220 - age
Zone 1 (Warm up): 50–60% of Max HR
Zone 2 (Fat burn): 60–70%
Zone 3 (Cardio): 70–80%
Zone 4 (Hardcore): 80–90%
Zone 5 (Max effort): 90–100%
```

### 9. **Pregnancy Due Date**

**Formula:**

```
Due Date = LMP + 280 days (40 weeks)
```

Also includes: Week-by-week tracker and progress chart

### 10. **Calories Burned (MET-based)**

**Formula:**

```
Calories Burned = (MET * weight in kg * duration in minutes) / 60
```

---



---

## 🌙 Dark Mode Support

* Toggle in header
* Saves user preference in `localStorage`
* Automatically applies theme across all tools

---

## 🔧 How to Use

1. Open `index.html` in your browser
2. Click on any health tool
3. Enter your details and calculate
4. Use the Health Summary page to see all your stats in one place!

---

## 📌 Future Enhancements

* Export Health Summary as PDF
* Add login system for multiple users (optional)
* Weekly/monthly history tracking
* Smart insights based on health trends

---

## 📊 Health Summary Dashboard (Upcoming)

Displays:

* Basic user profile (age, gender, weight, height)
* Visual charts: BMI category, Water Intake, Calories Burned, Pregnancy Progress
* Automatically updates using values from individual tools (via localStorage)

---

## 👨‍💻 Built With

* HTML
* CSS (Flexbox + Grid)
* JavaScript (ES6+)
* [Chart.js](https://www.chartjs.org/) for data visualization

---

## 🎉 Credits

Project by **Kumar Gourav** to make health education interactive and accessible.

---

Feel free to contribute or suggest ideas to improve this project 🙌
