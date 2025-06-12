const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { AppDataSource } = require('./data-source');

// 라우터 임포트
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: (origin, callback) => {
    // 개발용: 모든 로컬 주소 허용
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// 라우터
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/borrows', borrowRoutes);

// DB 연결 및 서버 시작
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database', err);
  });
