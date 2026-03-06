from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta

from wechat_sales_bot.storage.repositories import CustomerRepository


@dataclass(slots=True)
class FollowupDecision:
    private_chat_disabled: bool
    next_action: str


class FollowupEngine:
    def __init__(self, repo: CustomerRepository, silence_days: int = 30) -> None:
        self.repo = repo
        self.silence_days = silence_days

    def evaluate_silence(self, customer_id: int, last_interaction_at: datetime | None, now: datetime) -> FollowupDecision:
        if last_interaction_at is None:
            return FollowupDecision(private_chat_disabled=False, next_action="collect_more_data")

        if now - last_interaction_at >= timedelta(days=self.silence_days):
            self.repo.mark_private_chat_disabled(customer_id, True)
            return FollowupDecision(private_chat_disabled=True, next_action="moments_only")

        return FollowupDecision(private_chat_disabled=False, next_action="normal_followup")
