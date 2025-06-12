const { AppDataSource } = require('../data-source');
const borrowRepo = AppDataSource.getRepository('Borrow');
const bookRepo = AppDataSource.getRepository('Book');
const userRepo = AppDataSource.getRepository('User');

exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  const book = await bookRepo.findOneBy({ id: bookId });
  if (!book || !book.available) return res.status(400).json({ error: 'Book unavailable' });

  const borrow = borrowRepo.create({ book, user: { id: userId } });
  book.available = false;

  await bookRepo.save(book);
  await borrowRepo.save(borrow);

  res.status(201).json({ message: 'Book borrowed successfully', borrow });
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
  const borrows = await borrowRepo.find();
  res.json(borrows);
};
