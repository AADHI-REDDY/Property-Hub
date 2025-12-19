@echo off
setlocal enabledelayedexpansion

REM ===============================================================
REM  RUN_FULLSTACK.BAT
REM  Builds frontend & backend, builds Docker images, creates k8s manifests,
REM  deploys to Kubernetes and starts port-forward for demo.
REM  Place this file in the project root (where Backend\ and Frontend\ exist).
REM ===============================================================

REM === Config - change these if you want different image names ===
set BACKEND_IMAGE=aadhireddy/property-backend:latest
set FRONTEND_IMAGE=aadhireddy/property-frontend:latest
set NAMESPACE=default
set FRONTEND_BUILD_DIR=Frontend\dist

REM === 1) Build backend ===
echo.
echo ======================================================
echo [STEP 1] Building backend (Maven)
echo ======================================================
if not exist Backend (
  echo ERROR: Backend folder 'Backend' not found. Aborting.
  pause
  exit /b 1
)
pushd Backend
call mvn -B -DskipTests package
if %errorlevel% neq 0 (
  echo Maven build failed. Aborting.
  popd
  pause
  exit /b 1
)
popd
echo Backend build completed.
echo.

REM === 2) Build backend docker image ===
echo ======================================================
echo [STEP 2] Building backend Docker image: %BACKEND_IMAGE%
echo ======================================================
pushd Backend
docker build -t %BACKEND_IMAGE% .
if %errorlevel% neq 0 (
  echo Backend docker build failed. Aborting.
  popd
  pause
  exit /b 1
)
popd
echo Backend Docker image built.
echo.

REM === 3) Build frontend (Vite) ===
echo ======================================================
echo [STEP 3] Building frontend (Vite)
echo ======================================================
if not exist Frontend (
  echo ERROR: Frontend folder 'Frontend' not found. Aborting.
  pause
  exit /b 1
)
pushd Frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
  echo Frontend build failed. Aborting.
  popd
  pause
  exit /b 1
)
popd
echo Frontend build completed (output: %FRONTEND_BUILD_DIR%).
echo.

REM === 4) Build frontend docker image ===
echo ======================================================
echo [STEP 4] Building frontend Docker image: %FRONTEND_IMAGE%
echo ======================================================
pushd Frontend
docker build -t %FRONTEND_IMAGE% .
if %errorlevel% neq 0 (
  echo Frontend docker build failed. Aborting.
  popd
  pause
  exit /b 1
)
popd
echo Frontend Docker image built.
echo.

REM === 5) Ensure k8s folder exists and create manifests ===
echo ======================================================
echo [STEP 5] Creating k8s manifests in k8s\ (overwrites existing generated files)
echo ======================================================
if not exist k8s mkdir k8s

REM write mysql deployment+service
> k8s\mysql-deployment.yaml echo apiVersion: v1
>>k8s\mysql-deployment.yaml echo kind: Service
>>k8s\mysql-deployment.yaml echo metadata:
>>k8s\mysql-deployment.yaml echo   name: mysql
>>k8s\mysql-deployment.yaml echo spec:
>>k8s\mysql-deployment.yaml echo   selector:
>>k8s\mysql-deployment.yaml echo     app: mysql
>>k8s\mysql-deployment.yaml echo   ports:
>>k8s\mysql-deployment.yaml echo     - port: 3306
>>k8s\mysql-deployment.yaml echo ---
>>k8s\mysql-deployment.yaml echo apiVersion: apps/v1
>>k8s\mysql-deployment.yaml echo kind: Deployment
>>k8s\mysql-deployment.yaml echo metadata:
>>k8s\mysql-deployment.yaml echo   name: mysql
>>k8s\mysql-deployment.yaml echo spec:
>>k8s\mysql-deployment.yaml echo   replicas: 1
>>k8s\mysql-deployment.yaml echo   selector:
>>k8s\mysql-deployment.yaml echo     matchLabels:
>>k8s\mysql-deployment.yaml echo       app: mysql
>>k8s\mysql-deployment.yaml echo   template:
>>k8s\mysql-deployment.yaml echo     metadata:
>>k8s\mysql-deployment.yaml echo       labels:
>>k8s\mysql-deployment.yaml echo         app: mysql
>>k8s\mysql-deployment.yaml echo     spec:
>>k8s\mysql-deployment.yaml echo       containers:
>>k8s\mysql-deployment.yaml echo         - name: mysql
>>k8s\mysql-deployment.yaml echo           image: mysql:8
>>k8s\mysql-deployment.yaml echo           env:
>>k8s\mysql-deployment.yaml echo             - name: MYSQL_ROOT_PASSWORD
>>k8s\mysql-deployment.yaml echo               value: rootpassword
>>k8s\mysql-deployment.yaml echo             - name: MYSQL_DATABASE
>>k8s\mysql-deployment.yaml echo               value: propertydb
>>k8s\mysql-deployment.yaml echo           ports:
>>k8s\mysql-deployment.yaml echo             - containerPort: 3306

REM write backend deployment+service
> k8s\backend-deployment.yaml echo apiVersion: v1
>>k8s\backend-deployment.yaml echo kind: Service
>>k8s\backend-deployment.yaml echo metadata:
>>k8s\backend-deployment.yaml echo   name: hms-backend-svc
>>k8s\backend-deployment.yaml echo spec:
>>k8s\backend-deployment.yaml echo   selector:
>>k8s\backend-deployment.yaml echo     app: hms-backend
>>k8s\backend-deployment.yaml echo   ports:
>>k8s\backend-deployment.yaml echo     - port: 8081
>>k8s\backend-deployment.yaml echo       targetPort: 8080
>>k8s\backend-deployment.yaml echo ---
>>k8s\backend-deployment.yaml echo apiVersion: apps/v1
>>k8s\backend-deployment.yaml echo kind: Deployment
>>k8s\backend-deployment.yaml echo metadata:
>>k8s\backend-deployment.yaml echo   name: hms-backend
>>k8s\backend-deployment.yaml echo spec:
>>k8s\backend-deployment.yaml echo   replicas: 1
>>k8s\backend-deployment.yaml echo   selector:
>>k8s\backend-deployment.yaml echo     matchLabels:
>>k8s\backend-deployment.yaml echo       app: hms-backend
>>k8s\backend-deployment.yaml echo   template:
>>k8s\backend-deployment.yaml echo     metadata:
>>k8s\backend-deployment.yaml echo       labels:
>>k8s\backend-deployment.yaml echo         app: hms-backend
>>k8s\backend-deployment.yaml echo     spec:
>>k8s\backend-deployment.yaml echo       containers:
>>k8s\backend-deployment.yaml echo         - name: hms-backend
>>k8s\backend-deployment.yaml echo           image: %BACKEND_IMAGE%
>>k8s\backend-deployment.yaml echo           imagePullPolicy: IfNotPresent
>>k8s\backend-deployment.yaml echo           env:
>>k8s\backend-deployment.yaml echo             - name: SPRING_DATASOURCE_URL
>>k8s\backend-deployment.yaml echo               value: jdbc:mysql://mysql:3306/propertydb
>>k8s\backend-deployment.yaml echo             - name: SPRING_DATASOURCE_USERNAME
>>k8s\backend-deployment.yaml echo               value: root
>>k8s\backend-deployment.yaml echo             - name: SPRING_DATASOURCE_PASSWORD
>>k8s\backend-deployment.yaml echo               value: rootpassword
>>k8s\backend-deployment.yaml echo           ports:
>>k8s\backend-deployment.yaml echo             - containerPort: 8080

REM write frontend (nginx) deployment + service
> k8s\frontend-deployment.yaml echo apiVersion: v1
>>k8s\frontend-deployment.yaml echo kind: Service
>>k8s\frontend-deployment.yaml echo metadata:
>>k8s\frontend-deployment.yaml echo   name: nginx
>>k8s\frontend-deployment.yaml echo spec:
>>k8s\frontend-deployment.yaml echo   selector:
>>k8s\frontend-deployment.yaml echo     app: nginx
>>k8s\frontend-deployment.yaml echo   ports:
>>k8s\frontend-deployment.yaml echo     - port: 80
>>k8s\frontend-deployment.yaml echo       targetPort: 80
>>k8s\frontend-deployment.yaml echo   type: LoadBalancer
>>k8s\frontend-deployment.yaml echo ---
>>k8s\frontend-deployment.yaml echo apiVersion: apps/v1
>>k8s\frontend-deployment.yaml echo kind: Deployment
>>k8s\frontend-deployment.yaml echo metadata:
>>k8s\frontend-deployment.yaml echo   name: nginx
>>k8s\frontend-deployment.yaml echo spec:
>>k8s\frontend-deployment.yaml echo   replicas: 1
>>k8s\frontend-deployment.yaml echo   selector:
>>k8s\frontend-deployment.yaml echo     matchLabels:
>>k8s\frontend-deployment.yaml echo       app: nginx
>>k8s\frontend-deployment.yaml echo   template:
>>k8s\frontend-deployment.yaml echo     metadata:
>>k8s\frontend-deployment.yaml echo       labels:
>>k8s\frontend-deployment.yaml echo         app: nginx
>>k8s\frontend-deployment.yaml echo     spec:
>>k8s\frontend-deployment.yaml echo       containers:
>>k8s\frontend-deployment.yaml echo         - name: nginx
>>k8s\frontend-deployment.yaml echo           image: %FRONTEND_IMAGE%
>>k8s\frontend-deployment.yaml echo           imagePullPolicy: IfNotPresent
>>k8s\frontend-deployment.yaml echo           ports:
>>k8s\frontend-deployment.yaml echo             - containerPort: 80

echo Kubernetes manifests written to k8s\

REM show the generated files
dir k8s
echo.

REM === 6) Apply manifests ===
echo ======================================================
echo [STEP 6] Applying k8s manifests
echo ======================================================
kubectl apply -f k8s
if %errorlevel% neq 0 (
  echo kubectl apply failed. Please check kubectl context and Kubernetes status.
  pause
  exit /b 1
)
echo kubectl apply OK
echo.

REM === 7) Wait for pods to be ready (basic wait) ===
echo Waiting for pods to be created (30s)...
timeout /t 30 >nul
kubectl get pods -o wide

REM === 8) Start port-forwards in new cmd windows ===
echo ======================================================
echo [STEP 8] Starting port-forwards (frontend/backend) in new windows
echo ======================================================
start cmd /k "kubectl port-forward svc/nginx 8083:80"
start cmd /k "kubectl port-forward svc/hms-backend-svc 8082:8081"

echo.
echo ======================================================
echo FULL STACK DEPLOY COMPLETE.
echo Frontend: http://localhost:8083
echo Backend:  http://localhost:8082
echo ======================================================

pause
endlocal
