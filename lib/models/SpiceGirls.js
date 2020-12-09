const pool = require('../utils/pool');

module.exports = class SpiceGirl {
    id;
    spiceGirlName;
    realLifeName;
    signature;
    bestQuoteFromSpiceWorld;

    constructor(row) {
      this.id = row.id;
      this.spiceGirlName = row.spice_girl_name;
      this.realLifeName = row.real_life_name;
      this.signature = row.signature;
      this.bestQuoteFromSpiceWorld = row.best_quote_from_spice_world;  
    }

    static async insert({ spiceGirlName, realLifeName, signature, bestQuoteFromSpiceWorld }) {
      const { rows } = await pool.query(
        'INSERT INTO spice_girls (spice_girl_name, real_life_name, based_on_real_life_person, best_quote_from_spice_world) VALUES ($1, $2, $3, $4) RETURNING *',
        [spiceGirlName, realLifeName, signature, bestQuoteFromSpiceWorld]
      );
      return new SpiceGirl(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM spice_girls');
  
      return rows.map(row => new SpiceGirl(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM spice_girls WHERE id=$1;',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No character with id ${id}`);
      return new SpiceGirl(rows[0]);
    }

    static async update(id, { spiceGirlName, realLifeName, signature, bestQuoteFromSpiceWorld }) {
      const { rows } = await pool.query(
        `UPDATE spice_girls
              SET spice_girl_name=$1,
                  real_life_name=$2,
                  signature=$3,
                  best_quote_from_spice_world=$4
                WHERE id=$5
                RETURNING *
              `,
        [spiceGirlName, realLifeName, signature, bestQuoteFromSpiceWorld, id]
      ); 
  
      return new SpiceGirl(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM spice_girls WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new SpiceGirl(rows[0]);
    }
};
