from __future__ import annotations


class MomentsEngine:
    def should_comment(self, content_type: str, is_negative: bool = False) -> bool:
        if content_type in {"敏感内容", "广告刷屏"}:
            return False
        if is_negative:
            return False
        return content_type in {"日常生活", "工作动态", "车相关内容", "节日庆祝", "情绪表达"}

    def build_comment(self, level: str, content_type: str) -> str:
        base = {
            "S": "状态不错，继续保持。",
            "A": "看起来挺充实，赞。",
            "B": "👍",
        }
        return base.get(level, "👍") if content_type != "节日庆祝" else "节日快乐呀。"
