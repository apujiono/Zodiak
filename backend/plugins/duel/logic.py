import random

def calculate_duel(user: str, opponent: str):
    zodiacs = {"Aries": 80, "Scorpio": 75, "Leo": 85}  # Tambah stats lain
    user_score = zodiacs.get(user.split("_")[0], 50) + random.randint(1, 20)
    opponent_score = zodiacs.get(opponent.split("_")[0], 50) + random.randint(1, 20)
    return f"{user} wins!" if user_score > opponent_score else f"{opponent} wins!"