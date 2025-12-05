import random

# Level 1: simple CVC words
LEVEL_WORDS = {
    1: [
        "cat", "dog", "sun", "hat", "cup", "red", "bus", "map", "bed", "fox",
    ],
    # Level 2: blends / slightly longer words
    2: [
        "frog", "swim", "ship", "chat", "brick", "drum", "stop", "plan", "trap", "flag",
    ],
    # Level 3: digraphs / trickier patterns
    3: [
        "ring", "thin", "chin", "shop", "boat", "moon", "rain", "feet", "tear", "night",
    ],
}


def get_random_word(level: int = 1) -> str:
    """Return a random word for the given level."""
    words = LEVEL_WORDS.get(level, LEVEL_WORDS[1])
    return random.choice(words)