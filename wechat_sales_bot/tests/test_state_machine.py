from wechat_sales_bot.core.state_machine import MainState, WeChatStateMachine


def test_state_identification_chat_list() -> None:
    sm = WeChatStateMachine()
    state = sm.identify_state("聊天 通讯录")
    assert state == MainState.MAIN_CHAT_LIST
    assert sm.can_execute("scan_chat_list") is True
