const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { AppDataSource } = require('./data-source');

// 🔹 라우터 임포트는 여기!
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔹 라우터는 미들웨어보다 아래에 있어야 함
app.use('/auth', authRoutes);

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
