# 練習用 Restful API

由於原本要串接的 API 已停止服務，所以改用 [json-server](https://github.com/typicode/json-server) 來仿製一個類似的 Restful API。

## API 文件

| 說明         | Method | path       | 參數                     | 範例             |
| ------------ | ------ | ---------- | ------------------------ | ---------------- |
| 獲取所有書籍 | GET    | /books     | \_limit:限制回傳資料數量 | /books?\_limit=5 |
| 獲取單一書籍 | GET    | /books/:id | 無                       | /books/10        |
| 新增書籍     | POST   | /books     | name: 書名               | 無               |
| 刪除書籍     | DELETE | /books/:id | 無                       | 無               |
| 更改書籍資訊 | PATCH  | /books/:id | name: 書名               | 無               |

## 使用方式

**註：Node 版本為 v14.21.2**

1\. 安裝相依項目

```bash
npm install
```

2\. 開啟伺服器

```
npm run server
```

3\. 以 `http://localhost:3000/books` 的方式來呼叫 API 即可。

## 檔案說明

- `db.json`：它是用來儲存所以有資料的資料庫
- `reset.sh`：需要重設資料庫的資料時，可以執行這個 shell script（`sh reset.sh`），會重新寫入預設的 20 本書籍
- `example1.js` 和 `example2.js` 為 JavaScript 串接 API 的範例，題目是參考 [這邊](https://github.com/Lidemy/mentor-program-5th/tree/master/homeworks/week4) 來撰寫的。
