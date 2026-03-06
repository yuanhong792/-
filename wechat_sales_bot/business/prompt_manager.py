from __future__ import annotations

from pathlib import Path

import json


class PromptManager:
    def __init__(self, path: str = "wechat_sales_bot/config/prompts.json") -> None:
        self.path = Path(path)
        self._prompts = self._load()

    def _load(self) -> dict[str, str]:
        raw = json.loads(self.path.read_text(encoding="utf-8"))
        result: dict[str, str] = {}
        for p in raw.get("prompts", []):
            if p.get("enabled", True):
                key = f"{p['prompt_type']}:{p['prompt_name']}"
                result[key] = p["content"]
        return result

    def get(self, prompt_type: str, prompt_name: str, fallback: str = "") -> str:
        return self._prompts.get(f"{prompt_type}:{prompt_name}", fallback)
