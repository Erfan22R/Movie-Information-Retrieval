import sqlite3
import pandas as pd

DATABASE_PATH = "data/movies.db"


def load_movies():
    """
    Load movie information from SQLite database.
    """

    connection = sqlite3.connect(DATABASE_PATH)

    query = """
    SELECT
        rowid AS id,
        Title,
        Year,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Poster,
        imdbRating
    FROM movies
    """

    movies = pd.read_sql_query(query, connection)

    connection.close()

    return movies