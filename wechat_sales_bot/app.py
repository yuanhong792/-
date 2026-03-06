from __future__ import annotations

from datetime import datetime

from wechat_sales_bot.business.followup_engine import FollowupEngine
from wechat_sales_bot.business.reply_engine import ReplyEngine
from wechat_sales_bot.chat.conversation_reader import ConversationReader, ParsedMessage
from wechat_sales_bot.core.logger import BotLogger
from wechat_sales_bot.core.sender import Sender
from wechat_sales_bot.core.state_machine import MainState, WeChatStateMachine
from wechat_sales_bot.storage.db import Database
from wechat_sales_bot.storage.repositories import CustomerRepository


def demo_run() -> None:
    logger = BotLogger(log_dir="wechat_sales_bot/logs")
    db = Database("wechat_sales_bot/wechat_sales_bot.db")
    db.init_schema()
    repo = CustomerRepository(db)

    state_machine = WeChatStateMachine()
    reply_engine = ReplyEngine()
    sender = Sender()
    reader = ConversationReader()
    followup = FollowupEngine(repo=repo, silence_days=30)

    state_machine.transit(MainState.SINGLE_CHAT)
    customer_id = repo.upsert_by_name("张三")

    parsed = [ParsedMessage(direction="left", text="请问地址在哪里？"), ParsedMessage(direction="right", text="")]
    if not reader.can_auto_reply(parsed):
        logger.error("左右气泡识别不完整，禁止自动回复")
        return

    cache: list[str] = []
    new_msgs = reader.extract_incremental_messages(parsed, cache)
    for msg in new_msgs:
        decision = reply_engine.generate(message=msg.text, is_group=False, at_me=False)
        result = sender.send_text(
            text=decision.reply,
            current_target_ok=True,
            input_cleared=True,
            right_bubble_seen=True,
        )
        logger.info(f"reply={decision.reply}; hit_rule={decision.hit_rule}; send_ok={result.success}")

    followup_decision = followup.evaluate_silence(customer_id, datetime.now(), datetime.now())
    logger.info(f"followup_decision={followup_decision.next_action}")
    db.close()


if __name__ == "__main__":
    demo_run()
