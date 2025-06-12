const { AppDataSource } = require('../data-source');
const Book = require('../entities/Book');

const bookRepo = AppDataSource.getRepository('Book');

exports.getBooks = async (req, res) => {
  const books = await bookRepo.find();
  res.json(books);
};

exports.createBook = async (req, res) => {
  const { title, author, isbn } = req.body;
  try {
    const newBook = bookRepo.create({ title, author, isbn });
    await bookRepo.save(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create book', details: err.message });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await bookRepo.update(id, data);
    const updated = await bookRepo.findOneBy({ id: parseInt(id) });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await bookRepo.delete(id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err.message });
  }
};

// 기존 코드 위에 이미 존재함:
// const { AppDataSource } = require('../data-source');
// const Book = require('../entities/Book');
// const bookRepo = AppDataSource.getRepository('Book');

// 📘 전체 도서 목록 조회
exports.getBooks = async (req, res) => {
  const books = await bookRepo.find();
  res.json(books);
};

// 📘 특정 도서 상세 조회
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookRepo.findOneBy({ id: parseInt(id) });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

// ✏️ 도서 수정
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await bookRepo.update(id, data);
    const updated = await bookRepo.findOneBy({ id: parseInt(id) });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
};

// ❌ 도서 삭제
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await bookRepo.delete(id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err.message });
  }
};
