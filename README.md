# 🦹‍♂️ Sortable Superhero Database

Welcome to the **Sortable** project — where villains like you finally get to organize and analyze those irritating, yoga-pant-wearing superheroes. Your goal? Build a fast, sortable, searchable interface to expose their secrets... with style.

## 🚀 Project Overview

This project fetches data about superheroes from a public API and displays it in a paginated, sortable, searchable table. It was built **from scratch** using **only HTML, CSS, and JavaScript** — **no frameworks** allowed.

## 🔗 Data Source

All superhero data is retrieved from the following endpoint:

https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json

markdown
Copy
Edit

## 🧠 Features

### ✅ Display

- Render a `<table>` displaying the following fields:
  - **Icon** (images.xs) — Displayed as image thumbnails
  - **Name**
  - **Full Name** (biography.fullName)
  - **Powerstats** (each individual powerstat shown in a separate column)
  - **Race** (appearance.race)
  - **Gender** (appearance.gender)
  - **Height** (appearance.height)
  - **Weight** (appearance.weight)
  - **Place of Birth** (biography.placeOfBirth)
  - **Alignment** (biography.alignment)

### ✅ Pagination

- Allow the user to select page size:
  - Options: 10, 20 (default), 50, 100, or **All**
- Pages update dynamically without reloads.

### ✅ Search

- Interactive search by **name** (updates in real-time with each keystroke)
- Case-insensitive substring matching

### ✅ Sorting

- Click on any column header to sort:
  - Toggles between ascending and descending
- Numerical values like `weight` and `height` are correctly parsed (e.g. "78 kg" < "100 kg")
- Missing values always sorted to the bottom

### 🏎️ Performance

- Optimized to handle large datasets efficiently with minimal delay

## 🛠️ Installation

1. Clone the repo:

```bash
git clone https://github.com/YHamdouni/SORTABLE.git
Open index.html in your browser — no build tools or server required.

📁 Project Structure
sortable/
├── index.html       # Main HTML structure
├── style.css        # All custom styles
└── script.js        # Core logic: fetch, render, sort, filter, paginate
📸 Demo Screenshots (Optional)
Add screenshots here to show off the table, search, and detail view if available.

👨‍💻 Author
Yassine Hamdoun
🔗 View Repo

📜 License
This project is for educational and entertainment purposes. Use it to take over the superhero world… responsibly. 🦹

