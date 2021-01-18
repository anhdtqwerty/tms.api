# Hướng dẫn Cài đặt

Hệ thống TMS Thiên An.

## Installation

Các môi trường cần sử dụng.
SQL Server
Node.Js: 12+, Npm 6+

Sau khi cài đặt cấu hình SQL server thì donw code và giải nén

### Step 1: Cài đặt thư viện cần thiết

```bash
cd tms
npm install
```

### Step 2: Khởi chạy hệ thống

```bash
npm start
```

## Lưu ý cấu hình hệ thống:

### Email:

Cấu hình email server gửi email:
Tại folder: config/plugins.js
Cấu hình email account và mật khẩu. Lưu ý phải enable lessecure email trong trường hợp sử dụng gmail
Tại link: https://myaccount.google.com/lesssecureapps

## Contributing
