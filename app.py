from flask import Flask, request, jsonify
from flask_cors import CORS

from src.database import load_movies
from src.vectorizer import build_tfidf
from src.search_engine import search


app = Flask(__name__)
CORS(app)


# ----------------------------
# Load data and build TF-IDF model
# (Runs only once when server starts)
# ----------------------------
movies = load_movies()
vectorizer, tfidf_matrix, movies = build_tfidf(movies)




# ----------------------------
# Home Route
# ----------------------------
@app.route("/")
def home():

    return jsonify({
        "message": "Movie Information Retrieval API",
        "status": "running"
    })


# ----------------------------
# Search API
# ----------------------------
@app.route("/search", methods=["POST"])
def search_movies():

    data = request.get_json()

    query = data.get("query", "").strip()

    if not query:
        return jsonify({
            "error": "Search query is required."
        }), 400

    results, total_results = search(
        query=query,
        vectorizer=vectorizer,
        tfidf_matrix=tfidf_matrix,
        movies=movies,
        top_k=50
    )

    movies_list = []

    for _, row in results.iterrows():

        movies_list.append({
            "id": int(row["id"]),
            "title": row["Title"],
            "year": row.get("Year", ""),
            "runtime": row.get("Runtime", ""),
            "genre": row.get("Genre", ""),
            "director": row.get("Director", ""),
            "writer": row.get("Writer", ""),
            "actors": row.get("Actors", ""),
            "plot": row.get("Plot", ""),
            "language": row.get("Language", ""),
            "country": row.get("Country", ""),
            "poster": row.get("Poster", ""),
            "rating": row.get("imdbRating", ""),
            "score": round(float(row["Score"]), 4),
        })

    return jsonify({
        "query": query,
        "total_results": total_results,
        "results": movies_list
    })

@app.route("/stats", methods=["GET"])
def get_stats():
    return jsonify({
        "movies": len(movies),
        "features": tfidf_matrix.shape[1],
        "search_time": 142,
        "current_results": len(movies)
    })


# ----------------------------
# Run Flask
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True)