/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('doctors').del()
      .then(function () {
        return knex('doctors').insert([
          {name: 'Доктор Айболит', spec: 'Терапевт'},
          {name: 'Доктор Ватсон', spec: 'Хирург'},
          {name: 'Доктор Болодя', spec: 'Уролог'},
        ]);
      });
};
