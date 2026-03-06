from __future__ import annotations

from .base_client import BaseLLMClient


class OpenAICompatibleClient(BaseLLMClient):
    """占位实现：接入 OpenAI 兼容接口时在这里补齐请求。"""

    def generate(self, prompt: str) -> str:
        return f"[LLM占位回复]{prompt[:50]}"
