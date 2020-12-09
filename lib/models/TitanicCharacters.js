const pool = require('../utils/pool');

module.exports = class TitanicCharacter {
    id;
    characterName;
    realLifeName;
    basedOnRealLifePerson;
    hotFactor;

    constructor(row) {
      this.id = row.id;
      this.characterName = row.character_name;
      this.realLifeName = row.real_life_name;
      this.basedOnRealLifePerson = row.based_on_real_life_person;
      this.hotFactor = row.hot_factor;  
    }

    static async insert({ characterName, realLifeName, basedOnRealLifePerson, hotFactor }) {
      const { rows } = await pool.query(
        'INSERT INTO titanic_characters (character_name, real_life_name, based_on_real_life_person, hot_factor) VALUES ($1, $2, $3, $4) RETURNING *',
        [characterName, realLifeName, basedOnRealLifePerson, hotFactor]
      );
      return new TitanicCharacter(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM titanic_characters');
  
      return rows.map(row => new TitanicCharacter(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM titanic_characters WHERE id=$1;',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No character with id ${id}`);
      return new TitanicCharacter(rows[0]);
    }

    static async update(id, { characterName, realLifeName, basedOnRealLifePerson, hotFactor }) {
      const { rows } = await pool.query(
        `UPDATE titanic_characters
              SET character_name=$1,
                  real_life_name=$2,
                  based_on_real_life_person=$3,
                  hot_factor=$4
                WHERE id=$5
                RETURNING *
              `,
        [characterName, realLifeName, basedOnRealLifePerson, hotFactor, id]
      ); 
  
      return new TitanicCharacter(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM titanic_characters WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new TitanicCharacter(rows[0]);
    }
};
