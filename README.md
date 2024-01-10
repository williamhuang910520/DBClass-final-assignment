# DBClass-final-assignment
這是雲科大 112-1 資料庫系統期末作業。其實只要完成前端呼叫後端使用 SQL 語法與資料庫溝通就好，但是一個不小心就做了一整個系統出來了OAO。

### 目錄
* [Husky Movie](/README.md#Husky-Movie)
* [使用技術](/README.md#使用技術)
* [如何安裝](/README.md#如何安裝)

# Husky Movie
![Alt text](frontend/public/LOGO.png)
> ### _電影快閃，娛樂簡單！_
歡迎來到 Husky Movie，不只是一個影片租借服務，更是你影迷夢寐以求的租片天堂！我們的系統不僅功能強大，而且比一杯熱咖啡還要熱情！現在，讓我們向你展示這個讓你忍不住尖叫的奇蹟。


# 使用技術
專案架構遵循前後端資料庫分離的設計原則，並充分利用 Docker 容器化技術實現整合。

後端部分以 Python Flask 框架進行開發，以確保系統效能與可擴展性。資料庫方面採用了教授指定的 MariaDB，以保障資料的穩定儲存和高效查詢。

前端選擇 Vite + React 的組合，以提高開發效率。同時使用 Tailwind CSS 優化網頁介面並提供更好的使用者體驗。

## 容器化
* Docker

## 後端 & 資料庫
* Python Flask
* MariaDB

## 前端
* Vite + React
* Tailwind CSS 

# 如何安裝
這邊會手把手教你在本地端用 Docker 建構這個專案。

### 下載並安裝 Docker Desktop
到 [Docker 官網](https://www.docker.com/get-started/) 下載 Docker Desktop

### 啟動 Docker Desktop
啟動 Docker Desktop 確保 Docker Engine 正在運作中

### clone 專案
將本專案 clone 至目的地資料夾，請確保你的電腦已安裝 `git`
```sh
git clone https://github.com/williamhuang910520/DBClass-final-assignment.git
cd DBClass-final-assignment
```

### 執行 Docker Compose
```sh
docker-compose up 
```
