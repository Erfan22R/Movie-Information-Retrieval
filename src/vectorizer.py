from sklearn.feature_extraction.text import TfidfVectorizer

from src.preprocessing import preprocess


def build_tfidf(movies):
    """
    Build TF-IDF matrix from movie information.
    """

    movies["Text"] = (
        movies["Title"].fillna("") + " " +
        movies["Genre"].fillna("") + " " +
        movies["Plot"].fillna("")
    )

    movies["Processed_Text"] = movies["Text"].apply(preprocess)

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(movies["Processed_Text"])

    return vectorizer, tfidf_matrix, movies