const pool = require ('../utils/pool');

module.exports = class WesAndersonMovie {
    id;
    title;
    isThereBillMurray;
    characterMostLikelyToBeReplicatedForHalloween;
    location;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.isThereBillMurray = row.is_there_bill_murray;
      this.characterMostLikelyToBeReplicatedForHalloween = row.character_most_likely_to_be_replicated_for_halloween;
      this.location = row.location;  
    }

    static async insert({ title, isThereBillMurray, characterMostLikelyToBeReplicatedForHalloween, location }) {
      const { rows } = await pool.query(
        'INSERT INTO wes_anderson_movies (title, is_there_bill_murray, character_most_likely_to_be_replicated_for_halloween, location) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, isThereBillMurray, characterMostLikelyToBeReplicatedForHalloween, location]
      );
      return new WesAndersonMovie(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM wes_anderson_movies');

      return rows.map(row => new WesAndersonMovie(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM wes_anderson_movies WHERE id=$1;',
        [id]
      );

      if(!rows[0]) throw new Error(`No character with id ${id}`);
      return new WesAndersonMovie(rows[0]);
    }

    static async update(id, { title, isThereBillMurray, characterMostLikelyToBeReplicatedForHalloween, location }) {
      const { rows } = await pool.query(
        `UPDATE wes_anderson_movies
            SET title=$1,
              is_there_bill_murray=$2,
              character_most_likely_to_be_replicated_for_halloween=$3,
              location=$4
              WHERE id=$5
              RETURNING *
            `,
        [title, isThereBillMurray, characterMostLikelyToBeReplicatedForHalloween, location, id]
      ); 

      return new WesAndersonMovie(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM wes_anderson_movies WHERE id=$1 RETURNING *',
        [id]
      );

      return new WesAndersonMovie(rows[0]);
    }
};
