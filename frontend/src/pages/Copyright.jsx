import React from 'react'

import { Icon } from '@iconify/react';

const Copyright = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[60rem] mx-16">
        <div className="mt-16"></div>
        <section>
          <p className="text-h1 mt-12 mb-8">這是什麼?</p>
          <p className="text-p">這是雲林科技大學 112-1 資料庫系統期末作業。其實只要完成前端呼叫後端使用 SQL 語法與資料庫溝通就好，但是一個不小心就做了一整個系統出來了OAO。</p>
          </section>

        <section>
          <p className="text-h1 mt-12 mb-8">使用工具</p>
          <p className="text-p">專案架構遵循前後端資料庫分離的設計原則，並充分利用 Docker 容器化技術實現整合。</p>
          <p className="text-p">後端部分以 Python Flask 框架進行開發，以確保系統效能與可擴展性。資料庫方面採用了教授指定的 MariaDB，以保障資料的穩定儲存和高效查詢。</p>
          <p className="text-p">前端選擇 Vite + React 的組合，以提高開發效率。同時使用 Tailwind CSS 優化網頁介面並提供更好的使用者體驗。</p>
          <div className="flex flex-wrap gap-8 mt-8">
            <ToolsLogo icon="logos:docker" link="https://www.docker.com/"/>
            <ToolsLogo icon="logos:mariadb" link="https://mariadb.org/"/>
            <ToolsLogo icon="logos:python" link="https://www.python.org/"/>
            <ToolsLogo icon="logos:vitejs" link="https://vitejs.dev/"/>
            <ToolsLogo icon="logos:react" link="https://react.dev/"/>
            <ToolsLogo icon="logos:tailwindcss-icon" link="https://tailwindcss.com/"/>
          </div>
        </section>
        
        <section>
          <p className="text-h1 mt-12 mb-8">版權聲明</p>
          <p className="text-p">版權所有 © 2024 Husky Movie. All Rights Reserved.</p>
          <p className="text-p">本專案採用 MIT 授權。</p>
          <p className="text-p">本專案可能會不定期更新。使用者應該定期檢查最新版本。</p>
          <p className="text-p">免責聲明：本專案是按照「現狀」提供，沒有任何明示或暗示的擔保。作者不對使用本專案造成的任何損失或損害負責。</p>
        </section>

        <section>
          <p className="text-h1 mt-12 mb-8">作者</p>
          <div className="flex w-full justify-center">
            <div className="flex gap-12">
              <div className="size-32">
                <div className="h-full bg-white rounded-full overflow-hidden">
                  <img src="https://yt3.googleusercontent.com/M8n9pCuCYMbWFENasXrUdD8TbtXVfyyyGowvrHF4982kDFq1MYepg3BokwfMjzyePDe1_amu=s176-c-k-c0x00ffffff-no-rj" />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5 flex-grow">
                <p className="text-h1">Hanchi Huang</p>
                <p className="text-white text-lg">我是憨吉，我是一顆番薯</p>
              </div>
            </div>
          </div>
        </section>

        <p className="text-zinc-500 mt-16 text-center">© 2024 Husky Movie. All Rights Reserved.</p>
        <div className="mt-16"></div>
      </div>
    </div>
  )
}

const ToolsLogo = ({icon, link}) => {
  return (
    <a href={link} target="_blank">
      <div className="p-6 cursor-pointer outline outline-1 outline-zinc-500 rounded-xl">
        <Icon icon={icon} height="1.75rem"/>
      </div>
    </a>
  )
}

export default Copyright