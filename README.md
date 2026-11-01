# 🏛️ Hammadur Rahman Academy Secondary School, Lafia

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abulawiz/hammadur-rahman-academy)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![SQLite](https://img.shields.io/badge/SQLite-WAL_Mode-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

Official full-stack web portal and academic management suite for **Hammadur Rahman Academy Secondary School**, situated in Lafia, Nasarawa State, Nigeria.

> **Motto:** *Knowledge, Character and Excellence (العلم والخلق والتميز)*  
> **WAEC / NECO Accredited Examination Center:** `4260189`

---

## 🌟 Key Highlights & Features

### 🎓 Academic & Student Experience
- **Interactive Academic Curricula:** Junior Secondary (JSS1–3 with Basic Science, Introductory Technology & Tahfeez) and Senior Secondary (Science, Arts & Humanities, Commercial).
- **Student Terminal Results Scratch Card Portal:** Live result checker verifying Student Admission Number (`HRA/2024/048`) and Scratch Card PIN (`8842-1903-7521`), rendering full printable terminal report cards with term positions, grades, GPA, and principal remarks.
- **120-Seat Solar CBT Lab Engine:** Interactive WAEC, NECO, and JAMB UTME simulated testing engine with instant automated scoring, answer concealment, and question-by-question syllabus review.
- **E-Learning & Coursework Assignments:** Homework tracker with assignment submission, scoring, and faculty feedback.
- **Attendance Tracking:** Daily roll-call records (`Present`, `Absent`, `Late`, `Excused`) with student attendance rates.

### 🏫 Administration, Bursary & Boarding
- **Executive Admin Portal:** Multi-tab management suite with real-time analytics for students, staff, bursary, bulletins, and inquiries.
- **Admissions Workflow:** 3-step digital application modal with automatic reference slip generation (`HRA-ADM-XXXXXX`) and screening date confirmation.
- **Bursary Fee Ledger:** Tuition, boarding, ICT CBT lab levy, and development fee schedules with verified receipt logging.
- **Boarding Residence Management:** Hostel occupancy tracker for Sultan Bello Hall, Usman Dan Fodio Hall, Nana Asma'u Hall, and Khadijah Bint Khuwaylid Hall.
- **Theme Customizer:** Persistent **Light Mode** and **Deep Black/Dark Mode** switcher.
- **Responsive Mobile Drawer Navigation:** Smooth slide-out drawer navigation with deep links.

---

## 🚀 One-Click Hosting on Vercel

You can deploy this project directly to Vercel in seconds:

1. Click the button above or visit [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import the repository: **`abulawiz/hammadur-rahman-academy`**.
3. Leave the build settings as default:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your school website will be live worldwide on a fast, global CDN!

---

## 💻 Local Setup & Development

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer recommended)
- `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/abulawiz/hammadur-rahman-academy.git

# Navigate into the project folder
cd hammadur-rahman-academy

# Install dependencies
npm install
```

### Running the Full-Stack Application

Run both the Vite frontend (`http://127.0.0.1:5173`) and Express + SQLite backend (`http://127.0.0.1:5000`) concurrently:

```bash
npm run dev:all
```

Or run them individually:
```bash
# Frontend only
npm run dev

# Backend API server only
npm run server
```

### Production Build

```bash
npm run build
```

---

## 🔑 Demo Testing Credentials

### 1. Student Scratch Card Portal
- **URL:** Click **"Student Portal"** on the top Navbar or Sidebar.
- **Admission Number:** `HRA/2024/048`
- **Scratch Card PIN:** `8842-1903-7521`
- *Candidate: Mustapha Ibrahim Al-Hassan (SSS 2 Science Diamond, 89.2% Average, 2nd position in class).*

### 2. Administrative Management Portal
- **URL:** Click **"Admin Portal"** on the Navbar or Sidebar.
- **Principal / Administrator:** `admin` / `admin123`
- **Bursar / Accounts Officer:** `bursar` / `bursar123`

---

## 🏛️ Campus Contact & Location

- **Address:** Hammadur Rahman Academy Secondary School Campus, Off Jos Road / Shendam Highway, Lafia, Nasarawa State, Nigeria.
- **Admissions Helpline:** +234 803 892 4110 | +234 815 674 2200
- **Official Inquiries:** `admissions@hammadurrahman.sch.ng`
- **WAEC / NECO Center Code:** `4260189`

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
