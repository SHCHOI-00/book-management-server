const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Borrow',
  tableName: 'borrows',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    borrowDate: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    returnDate: {
      type: 'timestamp',
      nullable: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      eager: true,
    },
    book: {
      type: 'many-to-one',
      target: 'Book',
      joinColumn: true,
      eager: true,
    },
  },
});
