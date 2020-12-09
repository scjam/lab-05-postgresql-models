DROP TABLE IF EXISTS dawsons_creek_characters;
DROP TABLE IF EXISTS titanic_characters;
DROP TABLE IF EXISTS spice_girls;
DROP TABLE IF EXISTS rom_coms;
DROP TABLE IF EXISTS wes_anderson_movies;

CREATE TABLE dawsons_creek_characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_name TEXT NOT NULL,
    real_life_name TEXT NOT NULL,
    description TEXT,
    sydney_rating INT
);

CREATE TABLE titanic_characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_name TEXT NOT NULL,
    real_life_name TEXT NOT NULL,
    based_on_real_life_person BOOLEAN,
    hot_factor INT
);

CREATE TABLE spice_girls (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    spice_girl_name TEXT NOT NULL,
    real_life_name TEXT NOT NULL,
    signature TEXT,
    best_quote_from_spice_world TEXT
);

CREATE TABLE rom_coms (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    lead_character TEXT NOT NULL,
    love_interest TEXT,
    degree_of_believability INT
);

CREATE TABLE wes_anderson_movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    is_there_bill_murray BOOLEAN NOT NULL,
    character_most_likely_to_be_replicated_for_halloween TEXT,
    location TEXT
);