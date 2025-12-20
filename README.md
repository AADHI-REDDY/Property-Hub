# PropertyHub | Enterprise Property OS 🏢

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge) ![Build](https://img.shields.io/badge/build-passing-success.svg?style=for-the-badge) ![Stack](https://img.shields.io/badge/stack-Full%20Stack-orange.svg?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

> **A cloud-native Property Management System featuring Role-Based Access Control (RBAC), financial analytics, and a fully containerized architecture.**

---

## 🔗 Live Demo
### 🌐 **[Launch Application](https://prop-frontend.vercel.app/)**
* **Admin/Landlord Demo:** `demo@property.com` / `demo123`
* **Tenant Demo:** *(Register a new account or use demo credentials)*

---

## 💡 Key Features

### 🛡️ **Core Platform**
* **Multi-Role Support:** Distinct portals for Super Admins, Landlords, and Tenants.
* **Property Lifecycle:** Manage units, leases, maintenance requests, and vacancies.
* **Financial Suite:** Rent tracking, payment history, and revenue visualization.

### ⚙️ **Technical Highlights**
* **Stateless Authentication:** Secure JWT-based login with interceptor handling.
* **Responsive UI:** Built with **React + Vite** and **Tailwind CSS** for a premium mobile-first experience.
* **Robust Backend:** **Spring Boot** REST API with **PostgreSQL** persistence.
* **DevOps Ready:** Includes **Docker** containerization, **Kubernetes** manifests, and **Ansible** playbooks for automated deployment.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Java 17, Spring Boot 3, Spring Security, Hibernate, Maven |
| **Database** | PostgreSQL (Production), H2 (Test) |
| **DevOps** | Docker, Docker Compose, Kubernetes (K8s), Ansible |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Local Setup Guide

### Option A: Quick Start (Docker) 🐳
Run the entire stack (Frontend + Backend + DB) with one command:
```bash
docker-compose up --build
