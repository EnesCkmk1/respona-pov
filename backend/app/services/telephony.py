"""Telephony. Real target: Twilio Programmable Voice with Media Streams.

The stub builds the TwiML you'd return on an inbound call. With Media Streams,
Twilio opens a WebSocket to this backend and streams the caller's audio, which
we forward to STT.
"""

from __future__ import annotations


def incoming_call_twiml(websocket_url: str) -> str:
    """TwiML that greets the caller and starts a media stream to our WS.

    Returned as `application/xml` from the Twilio voice webhook.
    """
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        "<Response>"
        "<Say language=\"da-DK\">Et øjeblik, jeg stiller dig om til assistenten.</Say>"
        f'<Connect><Stream url="{websocket_url}" /></Connect>'
        "</Response>"
    )
