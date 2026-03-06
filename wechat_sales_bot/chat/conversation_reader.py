from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class ParsedMessage:
    direction: str  # left=对方, right=自己
    text: str


class ConversationReader:
    def extract_incremental_messages(self, parsed: list[ParsedMessage], cache: list[str]) -> list[ParsedMessage]:
        new_msgs: list[ParsedMessage] = []
        for msg in parsed:
            digest = f"{msg.direction}:{msg.text.strip()}"
            if digest not in cache and msg.direction == "left":
                new_msgs.append(msg)
                cache.append(digest)
        if len(cache) > 50:
            del cache[:-50]
        return new_msgs

    def can_auto_reply(self, parsed: list[ParsedMessage]) -> bool:
        has_left = any(m.direction == "left" for m in parsed)
        has_right = any(m.direction == "right" for m in parsed)
        return has_left and has_right
