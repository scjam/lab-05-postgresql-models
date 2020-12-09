const pool = require('../utils/pool');

module.exports = class RomCom {
    id;
    title;
    leadCharacter;
    loveInterest;
    degreeOfBelievability;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.leadCharacter = row.lead_character;
      this.loveInterest = row.love_interest;
      this.degreeOfBelievability = row.degree_of_believability;  
    }

    static async insert({ title, leadCharacter, loveInterest, degreeOfBelievability }) {
      const { rows } = await pool.query(
        'INSERT INTO rom_coms (title, lead_character, love_interest, degree_of_believability) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, leadCharacter, loveInterest, degreeOfBelievability]
      );
      return new RomCom(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM rom_coms');
  
      return rows.map(row => new RomCom(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM rom_coms WHERE id=$1;',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No character with id ${id}`);
      return new RomCom(rows[0]);
    }

    static async update(id, { title, leadCharacter, loveInterest, degreeOfBelievability }) {
      const { rows } = await pool.query(
        `UPDATE rom_coms
              SET title=$1,
                  lead_character=$2,
                  love_interest=$3,
                  degree_of_believability=$4
                WHERE id=$5
                RETURNING *
              `,
        [title, leadCharacter, loveInterest, degreeOfBelievability, id]
      ); 
  
      return new RomCom(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM rom_coms WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new RomCom(rows[0]);
    }
};
