from datetime import datetime, timedelta

from wechat_sales_bot.business.followup_engine import FollowupEngine
from wechat_sales_bot.storage.db import Database
from wechat_sales_bot.storage.repositories import CustomerRepository


def test_followup_disable_private_chat_on_silence() -> None:
    db = Database(":memory:")
    db.init_schema()
    repo = CustomerRepository(db)
    customer_id = repo.upsert_by_name("李四")

    engine = FollowupEngine(repo, silence_days=30)
    decision = engine.evaluate_silence(
        customer_id,
        last_interaction_at=datetime.now() - timedelta(days=40),
        now=datetime.now(),
    )

    customer = repo.get_customer(customer_id)
    assert decision.private_chat_disabled is True
    assert decision.next_action == "moments_only"
    assert customer is not None and customer.private_chat_disabled is True
    db.close()
