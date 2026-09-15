# 🏢 Workspace Booking System

A full-stack **Workspace Booking System** developed during my **DevOps Internship at Presidio, Coimbatore**.

The project provides a platform for managing and booking available workspaces while demonstrating practical implementation of **cloud infrastructure, containerization, Infrastructure as Code, CI/CD, and deployment automation**.

---

## 📌 Project Overview

The Workspace Booking System was developed with a focus on both application functionality and DevOps practices.

During the project, I worked on:

- Managing cloud infrastructure using **AWS**
- Automating infrastructure provisioning using **Terraform**
- Containerizing applications using **Docker**
- Managing services using **Docker Compose**
- Configuring **Nginx** as a reverse proxy
- Using **MongoDB** for application data
- Initially configuring **Jenkins** for CI/CD
- Troubleshooting Jenkins pipeline and deployment issues
- Migrating the CI/CD workflow to **GitHub Actions**
- Managing container images using **Docker Hub**
- Working with **Kubernetes** for container orchestration
- Deploying and testing the application in a cloud environment
- Troubleshooting infrastructure and deployment issues

---

## 🚀 Key Features

- 🏢 View available workspaces
- 📅 Workspace booking functionality
- 👤 User-oriented workspace management
- 📊 Workspace availability dashboard
- 🗄️ MongoDB database integration
- 🌐 Nginx reverse proxy and service routing
- 🐳 Dockerized application services
- ☁️ AWS cloud infrastructure
- 🔄 Automated CI/CD using GitHub Actions
- 📦 Docker image management using Docker Hub
- ⚙️ Infrastructure provisioning using Terraform
- ☸️ Kubernetes-based container orchestration

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **AWS** | Cloud infrastructure and deployment |
| **Terraform** | Infrastructure as Code |
| **Jenkins** | Initial CI/CD implementation |
| **GitHub Actions** | CI/CD automation and deployment |
| **Docker** | Application containerization |
| **Docker Compose** | Multi-container application management |
| **Docker Hub** | Container image management |
| **MongoDB** | Database |
| **Nginx** | Reverse proxy and service routing |
| **Kubernetes** | Container orchestration |
| **Git & GitHub** | Version control and source code management |

---

# 🏗️ DevOps Implementation

## ☁️ AWS Infrastructure

AWS services were used to provision and manage the infrastructure required for deploying the application.

The implementation involved working with:

- **EC2** — Application hosting
- **S3** — Cloud storage
- **VPC** — Network configuration
- **IAM** — Access and permissions management
- **Security Groups** — Network-level access control

The AWS infrastructure was configured to support application deployment and communication between the required services.

### AWS Infrastructure

![AWS Infrastructure](screenshots/Screenshot%202026-05-13%20231232.png)

---

# ⚙️ Infrastructure as Code — Terraform

**Terraform** was used to automate infrastructure provisioning instead of manually creating AWS resources.

This made the infrastructure:

- Repeatable
- Consistent
- Easier to manage
- Easier to reproduce
- Suitable for automated deployment workflows

Terraform configuration files were used to define the required infrastructure and its dependencies.

### Terraform Infrastructure Setup

![Terraform Infrastructure Setup](screenshots/Screenshot%202026-05-14%20004558.png)

---

# 🐳 Docker & Containerization

The application services were containerized using **Docker**.

Docker helped create consistent application environments and simplify deployment across development and cloud environments.

**Docker Compose** was used to manage multiple services, their networking, environment variables, and service dependencies.

Docker images were built and managed through **Docker Hub** as part of the deployment workflow.

### Docker Setup

![Docker Setup](screenshots/Screenshot%202026-05-13%20235252.png)

---

# 🗄️ MongoDB

**MongoDB** was used as the database for storing application-related data.

The database configuration included:

- Container networking
- Environment variables
- Service connectivity
- Cloud-hosted service integration

The application services were configured to communicate with MongoDB through the required network and environment configuration.

---

# 🌐 Nginx Reverse Proxy

**Nginx** was configured as a reverse proxy to route incoming requests to the appropriate application services.

This provided a centralized entry point for the deployed application and helped manage communication between different services.

---

# 🔄 CI/CD Pipeline

CI/CD automation was initially explored using **Jenkins**.

During the implementation, the Jenkins pipeline encountered issues that prevented the deployment workflow from completing successfully. The pipeline execution and deployment errors were analyzed as part of the troubleshooting process.

Instead of continuing with the problematic Jenkins workflow, the CI/CD implementation was moved to **GitHub Actions**.

GitHub Actions was then configured to automate the required build and deployment workflow.

### CI/CD Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins
    │
    ▼
Pipeline / Deployment Failure
    │
    ▼
Troubleshooting
    │
    ▼
GitHub Actions
    │
    ▼
Build & Deployment
    │
    ▼
Docker Image
    │
    ▼
Docker Hub
    │
    ▼
AWS Infrastructure
    │
    ▼
Deployed Application

```

This workflow helped automate the process of building, testing, and deploying application changes.

---

# 🧪 Deployment Troubleshooting

During the deployment process, I encountered different configuration and infrastructure-related issues and worked on troubleshooting them.

The initial CI/CD workflow was configured using **Jenkins**, but the Jenkins pipeline encountered errors during the deployment process. After analyzing the pipeline and deployment issues, I moved the CI/CD workflow to **GitHub Actions**.

GitHub Actions was then configured to automate the build and deployment workflow.

Another challenge was related to the resource limitations of the **AWS EC2 Free Tier** environment. Building and running additional database container images required more resources than were practical in the available environment.

Therefore, Docker images were created and deployed for the **frontend and backend applications**, while MongoDB was handled separately as the database service.

### Deployment Approach

```text
GitHub Repository
       │
       ▼
GitHub Actions
       │
       ├── Build Frontend Docker Image
       │
       ├── Build Backend Docker Image
       │
       ▼
   Docker Hub
       │
       ▼
AWS EC2
       │
       ├── Frontend Container
       │
       ├── Backend Container
       │
       └── MongoDB Database
```

The deployment process involved:

- Analyzing Jenkins pipeline failures
- Moving the CI/CD workflow to GitHub Actions
- Building Docker images for the frontend application
- Building Docker images for the backend application
- Pushing application images to Docker Hub
- Deploying the application on AWS EC2
- Configuring MongoDB separately as the database service
- Troubleshooting networking, environment variables, and service connectivity

### Deployment / CI-CD Screenshots

![Deployment Screenshot](screenshots/Screenshot%202026-05-18%20130127.png)

![CI/CD Screenshot](screenshots/Screenshot%202026-05-20%20225501.png)

---

# 📊 Workspace Dashboard

The application provides a dashboard for viewing available workspaces and their booking-related information.

### Dashboard

![Workspace Booking Dashboard](screenshots/Screenshot%202026-05-15%20152625.png)

---

# 📁 Project Structure

The project was developed with a structured application and DevOps configuration.

The project contains separate frontend and backend applications along with Docker, infrastructure, and CI/CD configuration.

```text
workspace-booking-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── ...
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── ...
│
├── docker-compose.yml
├── Dockerfile
├── nginx/
├── Jenkinsfile
├── .github/
│   └── workflows/
│
└── README.md
```

### Project Directory

![Project Directory](screenshots/Screenshot%202026-05-21%20204845.png)

---

# 🔧 DevOps Workflow

The overall development and deployment workflow followed these stages:

### 1. Development

The frontend and backend applications were developed and maintained using Git and GitHub.

### 2. Version Control

Application changes were committed and pushed to the GitHub repository.

### 3. Infrastructure Provisioning

Terraform was used to provision the required AWS infrastructure.

### 4. Containerization

The frontend and backend applications were containerized using Docker.

Due to the resource limitations of the AWS EC2 Free Tier environment, Docker images were created for the **frontend and backend applications**, while MongoDB was handled separately as the database service.

### 5. Image Management

The frontend and backend Docker images were built and pushed to **Docker Hub**.

### 6. Initial CI/CD — Jenkins

Jenkins was initially configured for the CI/CD workflow.

The Jenkins pipeline encountered errors during deployment, which required troubleshooting.

### 7. CI/CD Migration — GitHub Actions

After encountering issues with Jenkins, the CI/CD workflow was moved to **GitHub Actions**.

GitHub Actions was configured to automate the build and deployment process.

### 8. AWS Deployment

The frontend and backend containers were deployed to the AWS EC2 environment.

### 9. Database Integration

MongoDB was configured separately and connected to the backend application using the required networking and environment configuration.

### 10. Troubleshooting

Deployment and infrastructure issues were analyzed and resolved throughout the implementation process.

---

# 📸 Project Screenshots

## Workspace Dashboard

![Workspace Dashboard](screenshots/Screenshot%202026-05-15%20152625.png)

## AWS Infrastructure

![AWS Infrastructure](screenshots/Screenshot%202026-05-13%20231232.png)

## Docker / Repository

![Docker Setup](screenshots/Screenshot%202026-05-13%20235252.png)

## Terraform Setup

![Terraform Setup](screenshots/Screenshot%202026-05-14%20004558.png)

## Jenkins Deployment / Error

![Jenkins Deployment](screenshots/Screenshot%202026-05-18%20130127.png)

## GitHub Actions Deployment

![GitHub Actions Deployment](screenshots/Screenshot%202026-05-20%20225501.png)

## Project Structure

![Project Structure](screenshots/Screenshot%202026-05-21%20204845.png)

---

# 📚 What I Learned

Through this project, I gained practical experience in:

- Cloud infrastructure management
- AWS EC2, S3, VPC, IAM, and Security Groups
- Infrastructure as Code using Terraform
- Docker containerization
- Docker Compose
- Docker Hub
- CI/CD pipeline implementation
- Jenkins pipeline configuration and troubleshooting
- Migrating CI/CD workflows from Jenkins to GitHub Actions
- GitHub Actions automation
- Nginx reverse proxy configuration
- MongoDB integration
- Container networking
- Environment variable configuration
- Kubernetes
- AWS deployment
- Working with cloud resource limitations
- Deployment troubleshooting
- Git and GitHub workflows
- Agile team collaboration

---

# 🔮 Future Enhancements

- 📅 Advanced booking and scheduling
- 🔔 Booking notifications
- 👤 Role-based access control
- 📊 Advanced workspace analytics
- ☁️ Improved cloud scalability
- 🔄 More advanced CI/CD automation
- 📈 Application monitoring and logging
- 🔐 Enhanced security configuration
- ☸️ Improved Kubernetes deployment and scaling
- 📱 Improved mobile responsiveness

---

# 👩‍💻 Internship Experience

**DevOps Intern — Presidio, Coimbatore**

**Technologies:**  
AWS | Terraform | Jenkins | GitHub Actions | Docker | Docker Compose | MongoDB | Kubernetes | Nginx | GitHub

This project provided hands-on experience in **cloud infrastructure, Infrastructure as Code, containerization, CI/CD automation, deployment troubleshooting, cloud resource management, and collaborative DevOps practices**.

---
