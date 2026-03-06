from __future__ import annotations


class KnowledgeBase:
    def __init__(self) -> None:
        self.standard_facts = {
            "地址": "门店地址：XX路XX号",
            "营业时间": "营业时间：09:00-18:30",
            "联系方式": "电话/微信同号：13XXXXXXXXX",
        }

    def search(self, query: str) -> str:
        for k, v in self.standard_facts.items():
            if k in query:
                return v
        return ""
