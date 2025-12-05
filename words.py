import random

CVC_WORDS = [
    "cat",
    "dog",
    "sun",
    "hat",
    "cup",
    "bed",
    "fox",
    "jam",
    "red",
    "bus",
]

def get_random_word() -> str:
    return random.choice(CVC_WORDS)