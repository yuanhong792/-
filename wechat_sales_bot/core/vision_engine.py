from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class ChatItemFeature:
    nickname: str
    latest_summary: str
    time_text: str
    unread: bool
    has_at_me: bool
    highlighted: bool
    avatar_hash: str


class VisionEngine:
    """纯视觉接口层，第一版留好输入输出结构。"""

    def ocr(self, image_bytes: bytes) -> str:
        return ""

    def split_chat_list(self, image_bytes: bytes) -> list[ChatItemFeature]:
        return []

    def detect_at_me(self, message_text: str, my_name: str) -> bool:
        return (f"@{my_name}" in message_text) or ("@我" in message_text)
