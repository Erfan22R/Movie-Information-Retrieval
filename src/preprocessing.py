import re
import string

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


def download_nltk_resources():
    """
    Download required NLTK resources only if they are missing.
    """

    resources = [
        ("corpora/stopwords", "stopwords"),
        ("corpora/wordnet", "wordnet"),
        ("corpora/omw-1.4", "omw-1.4"),
    ]

    for resource_path, resource_name in resources:
        try:
            nltk.data.find(resource_path)
        except LookupError:
            nltk.download(resource_name, quiet=True)


download_nltk_resources()

stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()


def clean_text(text):
    """
    Clean and normalize text.
    """

    if text is None:
        return ""

    text = str(text)

    # Lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)

    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))

    # Remove numbers
    text = re.sub(r"\d+", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text


def remove_stopwords(text):
    """
    Remove English stop words.
    """

    words = text.split()
    words = [word for word in words if word not in stop_words]

    return " ".join(words)


def lemmatize_text(text):
    """
    Lemmatize words.
    """

    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words]

    return " ".join(words)


def preprocess(text):
    """
    Complete preprocessing pipeline.
    """

    text = clean_text(text)
    text = remove_stopwords(text)
    text = lemmatize_text(text)

    return text