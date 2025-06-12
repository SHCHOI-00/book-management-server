const { AppDataSource } = require('../data-source');
const borrowRepo = AppDataSource.getRepository('Borrow');
const bookRepo = AppDataSource.getRepository('Book');
const userRepo = AppDataSource.getRepository('User');
const { IsNull } = require('typeorm');


exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  const book = await bookRepo.findOneBy({ id: bookId });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (!book.available) {
    return res.status(400).json({ error: 'Book is already borrowed' });
  }

  // 🔒 이미 이 사용자가 이 책을 빌린 적 있는지 확인 (반납 안 한 상태)
  const existingBorrow = await borrowRepo.findOne({
    where: {
      user: { id: userId },
      book: { id: bookId },
      returnDate: IsNull(),
    },
  });

  if (existingBorrow) {
    return res.status(400).json({ error: 'You have already borrowed this book' });
  }

  const borrow = borrowRepo.create({
    book,
    user: { id: userId },
  });

  book.available = false;

  await bookRepo.save(book);
  await borrowRepo.save(borrow);

  res.status(201).json({
    message: 'Book borrowed successfully',
    borrow,
  });
};

exports.returnBook = async (req, res) => {
  const { id } = req.params;
  const borrow = await borrowRepo.findOneBy({ id: parseInt(id) });
  if (!borrow || borrow.returnDate) return res.status(400).json({ error: 'Invalid borrow ID' });

  borrow.returnDate = new Date();
  borrow.book.available = true;

  await bookRepo.save(borrow.book);
  await borrowRepo.save(borrow);

  res.json({ message: 'Book returned successfully' });
};

exports.getBorrows = async (req, res) => {
  const userId = req.user.id;
  const borrows = await borrowRepo.find({
    where: { user: { id: userId } },
    relations: ['book'], // 필요한 경우 book 정보 포함
  });
  res.json(borrows);
};

