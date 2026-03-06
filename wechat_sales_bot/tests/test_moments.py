from wechat_sales_bot.business.moments_engine import MomentsEngine


def test_moments_sensitive_no_comment() -> None:
    engine = MomentsEngine()
    assert engine.should_comment("敏感内容") is False
