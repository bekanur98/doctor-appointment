/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('users').del()
      .then(function () {
        return knex('users').insert([
          {name: 'Иван Иванов', phone: '+7 900 123 45 67'},
          {name: 'Мария Петрова', phone: '+7 900 765 43 21'},
          {name: 'Алексей Смирнов', phone: '+7 900 456 78 90'}
        ]);
      });
};
