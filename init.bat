@echo off
cls

echo "Installing Docker and Docker Compose..."
# 下載 Docker Desktop 安裝檔
Invoke-WebRequest -Uri https://desktop.docker.com/win/Docker%20Desktop%20Installer.exe -OutFile DockerDesktopInstaller.exe

# 安裝 Docker Desktop
Start-Process -Wait -FilePath .\DockerDesktopInstaller.exe
Remove-Item -Force -Path .\DockerDesktopInstaller.exe

# 下載 Docker Compose
Invoke-WebRequest -Uri https://github.com/docker/compose/releases/latest/download/docker-compose-Windows-x86_64.exe -OutFile docker-compose.exe

# 移動 Docker Compose 到 Docker 安裝目錄
Move-Item -Force -Path .\docker-compose.exe -Destination "$env:ProgramFiles\Docker\docker-compose.exe"

echo "Docker and Docker Compose installed successfully."

echo "Cloning your GitHub repository..."
# 請替換以下 URL 為你的 GitHub 專案 URL
git clone https://github.com/williamhuang910520/DBClass-final-assignment.git

echo "Starting Docker Compose..."
cd DBClass-final-assignment
docker-compose up -d

echo "Installation and setup completed."
