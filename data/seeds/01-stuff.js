
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stuff').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('stuff').insert([
        {id: 1, thing: 'person'},
        {id: 2, thing: 'place'},
        {id: 3, thing: 'apple'}
      ]);
    });
};
