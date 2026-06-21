"""In-memory menu + a deterministic matcher used by the stub agent.

Mirrors the seed menu. When the real LLM is wired, the model would call a
`find_menu_item` tool backed by Supabase instead of this string matcher.
"""

from __future__ import annotations

MENU: list[dict[str, object]] = [
    {"name": "Margherita", "price": 89},
    {"name": "Pepperoni", "price": 99},
    {"name": "Hawaii", "price": 99},
    {"name": "Capricciosa", "price": 105},
    {"name": "Quattro Stagioni", "price": 115},
    {"name": "Calzone", "price": 110},
    {"name": "Hvidløgsbrød", "price": 45, "aliases": ["hvidloegsbrod", "brød"]},
    {"name": "Pommes frites", "price": 35, "aliases": ["pommes", "fritter"]},
    {"name": "Tiramisu", "price": 55},
    {"name": "Cola 0,5L", "price": 25, "aliases": ["cola"]},
    {"name": "Fanta 0,5L", "price": 25, "aliases": ["fanta"]},
]

_NUMBER_WORDS: dict[str, int] = {
    "en": 1,
    "et": 1,
    "to": 2,
    "tre": 3,
    "fire": 4,
    "fem": 5,
    "seks": 6,
    "syv": 7,
    "otte": 8,
    "ni": 9,
    "ti": 10,
}


def _qty_before(text: str, idx: int) -> int:
    """Read a quantity from the word immediately before position `idx`."""
    prefix = text[:idx].strip().split()
    if not prefix:
        return 1
    last = prefix[-1]
    if last.isdigit():
        return max(1, int(last))
    return _NUMBER_WORDS.get(last, 1)


def match_items(text: str) -> list[dict[str, object]]:
    """Find ordered menu items in a caller utterance.

    Returns a list of {name, price, qty}. Matching is intentionally simple and
    deterministic so the pipeline is testable without any paid API.
    """
    lowered = text.lower()
    found: list[dict[str, object]] = []
    for item in MENU:
        name = str(item["name"])
        candidates = [name.lower()]
        candidates.extend(str(a).lower() for a in item.get("aliases", []))  # type: ignore[arg-type]

        for needle in candidates:
            idx = lowered.find(needle)
            if idx != -1:
                found.append(
                    {
                        "name": name,
                        "price": item["price"],
                        "qty": _qty_before(lowered, idx),
                    }
                )
                break
    return found
