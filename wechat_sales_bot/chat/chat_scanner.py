from __future__ import annotations

from dataclasses import dataclass

from wechat_sales_bot.core.vision_engine import ChatItemFeature


@dataclass(slots=True)
class ScanCandidate:
    nickname: str
    chat_type: str
    priority: int
    unread: bool
    has_at_me: bool


class ChatScanner:
    def build_queue(self, items: list[ChatItemFeature], group_name_hints: set[str]) -> list[ScanCandidate]:
        candidates: list[ScanCandidate] = []
        for item in items:
            is_group = item.nickname in group_name_hints
            chat_type = "group" if is_group else "single"
            priority = self._priority(item, is_group)
            candidates.append(
                ScanCandidate(
                    nickname=item.nickname,
                    chat_type=chat_type,
                    priority=priority,
                    unread=item.unread,
                    has_at_me=item.has_at_me,
                )
            )
        return sorted(candidates, key=lambda c: c.priority)

    def _priority(self, item: ChatItemFeature, is_group: bool) -> int:
        if item.unread and not is_group:
            return 10
        if item.unread and is_group and item.has_at_me:
            return 20
        if is_group:
            return 80
        return 50
