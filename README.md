# 🧩 Pokédex – Full Stack Application

A **full-stack Pokédex application** built using **Spring Boot (Backend)** and **React (Frontend)** that fetches Pokémon data from the public **PokeAPI**.

The project demonstrates **clean architecture**, **external API integration**, **pagination**, **caching**, and a **responsive modern UI**.

---

## 🌐 Live Demo

👉 **Live Application:**
[https://pokedex-1-nnpn.onrender.com/](https://pokedex-1-nnpn.onrender.com/)

---

## ✨ Features

### Backend (Spring Boot)

* Fetch Pokémon by **name or ID**
* Paginated Pokémon list
* Integration with **PokeAPI**
* In-memory caching using **Caffeine**
* Centralized exception handling
* Clean layered architecture

### Frontend (React)

* **Fully responsive UI** (desktop, tablet, mobile)
* Pokémon grid with pagination
* Search by name or ID
* Detailed Pokémon view
* Conditional rendering for smooth navigation
* Toast notifications for errors and edge cases

---

## 🛠️ Tech Stack

**Backend**

* Java 17, Spring Boot, Maven
* RestTemplate, Caffeine Cache

**Frontend**

* React (Create React App)
* JavaScript, HTML, CSS
* Fetch API, react-toastify

---

## 📁 Project Structure

```
pokedex
│
├── pokedex                       # Backend
│   ├── src
│   |── BackendDocumentation.md   # Backend details
│
├── pokedex-frontend              #Frontend
│   ├── src
│   |── FrontendDocumentation.md  # Frontend details
│
└── README.md 
```

### Documentation

* **Backend Documentation:** `pokedex/BackendDocumentation.md`
* **Frontend Documentation:** `pokedex-frontend/FrontendDocumentation.md`

---

## How to Run Locally

### Run Backend (Using Maven)

```bash
cd pokedex
mvn spring-boot:run
```

Runs on: `http://localhost:8080`

### Run Backend (Using JAR File)

```bash
cd pokedex
mvn clean package
java -jar target/pokedex-0.0.1-SNAPSHOT.jar
```

Runs on: `http://localhost:8080`

### Run Frontend

```bash
cd pokedex-frontend
npm install
npm start
```

Runs on: `http://localhost:3000`

---

## 🔁 How It Works

```
Responsive React Frontend
          ↓
   Spring Boot REST APIs
          ↓
     External PokeAPI
```

* Frontend communicates only with backend APIs
* Backend handles validation, caching, and external API calls
* UI updates dynamically using conditional rendering

---

## Summary

This project showcases:

* Full-stack development with **Spring Boot + React**
* Responsive UI design
* Real-world API integration
* Performance optimization using caching
* Clean code and clear documentation

