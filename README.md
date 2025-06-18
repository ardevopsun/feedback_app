# Feedback App (Spring Boot + React + Docker + AWS EKS)

**This project is a full-stack feedback collection system built with:**
- **Backend**: Spring Boot + MySQL (RDS)
- **Frontend**: React (with Pagination)
- **Containerization**: Docker
- **Deployment**: AWS EKS + Ingress + ACM TLS + Route 53 Domain

---

## Project Structure

          feedback_app/
      ├── feedback-api/               # Spring Boot backend
      │   ├── src/
      │   ├── pom.xml
      │   └── Dockerfile
      ├── feedback-ui/                # React frontend
      │   ├── src/
      │   ├── public/
      │   ├── Dockerfile
      │   ├── nginx.conf
      │   └── package.json
      ├── manifests/                  # Kubernetes YAMLs
      │   ├── feedback-deployment.yaml
      │   ├── feedback-service.yaml
      │   ├── feedback-ui-deployment.yaml
      │   ├── feedback-ui-service.yaml
      │   └── feedback-ingress.yaml
      └── README.md

---

## Prerequisites 

**Before running/deploying, make sure you have:**

    - Java 17
    - Node.js (v18+)
    - Docker installed and running
    - AWS CLI + eksctl + kubectl configured
    - A Route 53 domain & ACM TLS certificate

---

## Quick Start

**1. Clone the Repo**

     git clone https://github.com/ardevopsun/feedback_app.git
     cd feedback_app


**2. Local Development**

_**Backend (Spring Boot)**_

    cd feedback-api
    mvn spring-boot:run
  
  _**Backend runs at:** http://localhost:8080_

_**Frontend (React)**_
  
    cd feedback-ui
    npm install
    npm start
  
_**Frontend runs at:** http://localhost:3000_


**Make sure feedback-ui/src/App.js has this base URL for backend:**

    const backendBaseUrl = 'http://localhost:8080';


**3. Docker Build & Push**

    cd feedback-api
    docker build -t ardevopsun/feedback-app:latest .
    docker push ardevopsun/feedback-app:latest

_**Frontend:**_

    cd feedback-ui
    docker build -t ardevopsun/feedback-ui:latest .
    docker push ardevopsun/feedback-ui:latest


**4. Deploy to AWS EKS**

**You should already have:**

  - An EKS cluster
  - IAM OIDC + ALB Ingress Controller setup
  - Route 53 + TLS certificate ARN (via ACM)

**Depoy K8s files:**

    cd manifests
    kubectl apply -f feedback-deployment.yaml
    kubectl apply -f feedback-service.yaml
    kubectl apply -f feedback-ui-deployment.yaml
    kubectl apply -f feedback-ui-service.yaml
    kubectl apply -f feedback-ingress.yaml
  
**Replace the following in your feedback-ingress.yaml:**

  - alb.ingress.kubernetes.io/certificate-arn(Replace your ARN)
  - Host: feedback.pingdevops.info(Replace your host)

Wait 1–2 mins and visit: _https://feedback.pingdevops.info_

**How to Customize**

Change backend URL (frontend)
File: feedback-ui/src/App.js

    const backendBaseUrl = 'https://feedback.pingdevops.info'; #Replace your hostname here

**Features**

  - Submit & view feedback
  - Pagination for feedback list
  - Fully responsive React frontend
  - SSL (HTTPS) with custom domain
  - Hosted on AWS EKS using ALB Ingress
