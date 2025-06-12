const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// 모든 라우트에 인증 미들웨어 적용(인증보호호)
router.use(authMiddleware);

router.get('/', bookController.getBooks);              // 전체 목록
router.get('/:id', bookController.getBookById);        // 단일 도서 조회
router.post('/', bookController.createBook);           // 등록 (기존)
router.put('/:id', bookController.updateBook);         // 수정
router.delete('/:id', bookController.deleteBook);      // 삭제

module.exports = router;
