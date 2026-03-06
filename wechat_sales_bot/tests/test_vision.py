from wechat_sales_bot.core.vision_engine import VisionEngine


def test_detect_at_me() -> None:
    engine = VisionEngine()
    assert engine.detect_at_me("大家看下 @我 这个问题", "小王") is True
