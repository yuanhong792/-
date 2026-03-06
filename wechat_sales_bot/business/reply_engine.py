from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import json

from .knowledge_base import KnowledgeBase
from .prompt_manager import PromptManager


@dataclass(slots=True)
class ReplyDecision:
    reply: str
    hit_rule: str
    intent: str


class ReplyEngine:
    def __init__(self, keyword_path: str = "wechat_sales_bot/config/keyword_rules.json") -> None:
        self.keyword_rules = sorted(
            (json.loads(Path(keyword_path).read_text(encoding="utf-8")).get("rules", [])),
            key=lambda x: x.get("priority", 999),
        )
        self.kb = KnowledgeBase()
        self.prompts = PromptManager()

    def generate(self, message: str, is_group: bool, at_me: bool) -> ReplyDecision:
        if is_group and not at_me:
            return ReplyDecision(reply="", hit_rule="GROUP_NOT_AT_ME", intent="ignore")

        if "退款" in message or "保证100%" in message:
            return ReplyDecision(reply="这个问题我需要先核实下，避免给你错误承诺。", hit_rule="RISK_BLOCK", intent="risk")

        for rule in self.keyword_rules:
            if rule.get("enabled", True) and rule["keyword"] in message:
                return ReplyDecision(reply=rule["reply_text"], hit_rule=f"KEYWORD:{rule['keyword']}", intent="faq")

        kb_answer = self.kb.search(message)
        if kb_answer:
            return ReplyDecision(reply=kb_answer, hit_rule="KNOWLEDGE_BASE", intent="faq")

        if is_group:
            return ReplyDecision(reply="收到你@我了，这个细节我私聊你说更清楚。", hit_rule="GROUP_BRIEF", intent="group_reply")

        base = self.prompts.get("system", "base", "简洁回复")
        return ReplyDecision(reply=f"{base} 先说下你的车型和具体症状，我给你更准建议。", hit_rule="FALLBACK", intent="clarify")
