from __future__ import annotations


def build_private_chat_prompt(system_prompt: str, customer_stage: str, user_message: str) -> str:
    return (
        f"系统要求: {system_prompt}\n"
        f"客户阶段: {customer_stage}\n"
        f"用户消息: {user_message}\n"
        "请给出口语化、简洁且不过度承诺的回复。"
    )
