CREATE TABLE dawsons_creek_characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_name TEXT NOT NULL,
    real_life_name TEXT NOT NULL,
    description TEXT,
    sydney_rating INT
);