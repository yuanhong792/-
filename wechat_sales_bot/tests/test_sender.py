from wechat_sales_bot.core.sender import Sender


def test_sender_verify_failed() -> None:
    sender = Sender()
    result = sender.send_text("hello", current_target_ok=True, input_cleared=False, right_bubble_seen=True)
    assert result.success is False
    assert result.reason == "SEND_VERIFY_FAILED"
