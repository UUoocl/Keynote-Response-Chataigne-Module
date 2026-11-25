/*
  Keynote Response Custom Module (WebSocket Server + JSON Telemetry)
  Receives JSON slide telemetry from the Keynote Chataigne module over WebSocket.
  WebSocketServerModule parses incoming JSON into local.values when Protocol is JSON;
  this script fires convenience triggers and logs Keynote errors.
*/

var lastSlideNumber = -1;
var lastDocumentName = "";

function init()
{
	lastSlideNumber = local.values.slideNumber.get();
	lastDocumentName = local.values.documentName.get();
}

function wsMessageReceived(connectionId, message)
{
	if (local.values.responseReceived)
	{
		local.values.responseReceived.trigger();
	}
}

function moduleValueChanged(value)
{
	if (value.name == "slideNumber" || value.name == "documentName")
	{
		var currentSlide = local.values.slideNumber.get();
		var currentDoc = local.values.documentName.get();

		if (currentSlide != lastSlideNumber || currentDoc != lastDocumentName)
		{
			lastSlideNumber = currentSlide;
			lastDocumentName = currentDoc;

			if (local.values.slideChanged)
			{
				local.values.slideChanged.trigger();
			}
		}
	}
	else if (value.name == "error")
	{
		var err = value.get();
		if (err != "")
		{
			script.logWarning("Keynote error: " + err);
		}
	}
}
