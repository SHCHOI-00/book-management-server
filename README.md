# 📚 도서 아나바다 - 백엔드 서버

Node.js + Express + TypeORM + PostgreSQL 기반의 RESTful API 백엔드 서버입니다.

## ✅ 프로젝트 개요

- 누구나 도서를 등록할 수 있고,
- 관리자는 도서를 삭제할 수 있으며,
- JWT를 이용해 인증과 권한을 관리합니다.

## ✅ 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정
.env 파일을 생성하고 다음 예시를 참고해 작성합니다:

```bash
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=book_management

JWT_SECRET=your_jwt_secret_key
```
참고: .env.example 파일을 제공합니다.

### 3. 서버 실행
```bash
npm start
```

## ✅ 주요 기능

사용자 회원가입 및 로그인 (JWT 발급)

도서 등록, 조회, 수정, 삭제

도서 대출 및 반납

관리자만 도서 삭제 가능

## ✅ 기술 스택

Node.js, Express

TypeORM (PostgreSQL)

JWT 인증

dotenv 환경설정
