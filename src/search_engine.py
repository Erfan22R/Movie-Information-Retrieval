from sklearn.metrics.pairwise import cosine_similarity

from src.preprocessing import preprocess


def search(query, vectorizer, tfidf_matrix, movies, top_k=5):
    """
    Search for movies using TF-IDF and cosine similarity.

    Parameters:
        query (str): User search query.
        vectorizer: Trained TF-IDF vectorizer.
        tfidf_matrix: TF-IDF matrix of movies.
        movies (DataFrame): Movie dataset.
        top_k (int): Number of top results to return.

    Returns:
        tuple:
            top_results (DataFrame): Top matching movies.
            total_results (int): Total number of matching movies.
    """

    # Preprocess query
    processed_query = preprocess(query)

    # Convert query into TF-IDF vector
    query_vector = vectorizer.transform([processed_query])

    # Calculate cosine similarity
    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()

    # Create results dataframe
    results = movies.copy()
    results["Score"] = similarities

    # Remove unrelated movies
    results = results[results["Score"] > 0]

    # Sort by similarity
    results = results.sort_values(by="Score", ascending=False)

    # Count all matching movies
    total_results = len(results)

    # Return only top K results
    top_results = results.head(top_k)

    return top_results, total_results