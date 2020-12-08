const pool = require ('../utils/pool');

module.exports = class DawsonsCreekCharacter {
    id;
    characterName;
    realLifeName;
    description;
    sydneyRating;

    constructor(row) {
      this.id = row.id;
      this.characterName = row.character_name;
      this.realLifeName = row.real_life_name;
      this.description = row.description;
      this.sydneyRating = row.sydney_rating;  
    }

    static async insert({ characterName, realLifeName, description, sydneyRating }) {
      const { rows } = await pool.query(
        'INSERT INTO dawsons_creek_characters (character_name, real_life_name, description, sydney_rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [characterName, realLifeName, description, sydneyRating]
      );
      return new DawsonsCreekCharacter(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM dawsons_creek_characters');

      return rows.map(row => new DawsonsCreekCharacter(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dawsons_creek_characters WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No character with id ${id}`);
      return new DawsonsCreekCharacter(rows[0]);
    }

    static async update(id, { characterName, realLifeName, description, sydneyRating }) {
      const { rows } = await pool.query(
        `UPDATE dawsons_creek_characters
            SET character_name=$1,
                real_life_name=$2,
                description=$3
                sydney_rating=$4
              WHERE id=$5
              RETURNING *
            `,
        [characterName, realLifeName, description, sydneyRating, id]
      ); 

      return new DawsonsCreekCharacter(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dawsons_creek_characters WHERE id=$1 RETURNING *',
        [id]
      );

      return new DawsonsCreekCharacter(rows[0]);
    }
};
