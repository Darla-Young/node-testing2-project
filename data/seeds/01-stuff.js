const things = [
  {id: 1, thing: 'person'},
  {id: 2, thing: 'place'},
  {id: 3, thing: 'apple'}
]

exports.things = things

exports.seed = function(knex) {
  return knex('stuff').truncate()
    .then(function () {
      return knex('stuff').insert(things);
    });
};
