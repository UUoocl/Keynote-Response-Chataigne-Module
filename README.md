# Keynote Response Custom Module (WebSocket Server)

A Chataigne community custom module based on `WebSocket Server` that receives and parses Apple Keynote slide telemetry JSON sent by the companion [Keynote-Chataigne-Module](https://github.com/UUoocl/Keynote-Chataigne-Module).

## Architecture

```
Chataigne (Keynote / OS Module)
  └──▶ WebSocket client (JSON text frame)
        ▼
Chataigne (Keynote Response / WebSocket Server, Protocol: JSON)
  ├──▶ Auto-parses JSON into pre-declared & dynamic Chataigne Values
  └──▶ keynoteResponse.js
        ├── fires responseReceived / slideChanged triggers
        └── logs Keynote errors via script.logWarning
```

## Features

- Pre-configured `WebSocket Server` in `JSON` mode on port `8080` (`ws://127.0.0.1:8080`).
- Pre-declared read-only Chataigne Values for immediate Mapping and State binding:
  - `ok`, `action`, `running`, `playing`, `documentName`, `totalSlides`, `slideNumber`, `slideTitle`, `slideNotes`, `skipped`, `error`
- Convenience Triggers:
  - `responseReceived` — fires on every incoming WebSocket message.
  - `slideChanged` — fires when `slideNumber` or `documentName` changes.
- Automatic dynamic Values for any Keynote slide shape containing `key|||||value` (via Chataigne's `Auto Add` JSON parser).

## Installation

Copy or symlink this folder into Chataigne's custom modules directory:

```bash
ln -s "$(pwd)" ~/Documents/Chataigne/modules/Keynote-Response
```

(Or place it in a `modules/Keynote-Response` folder next to your `.noisette` project file.)

## Setup in Chataigne

1. Add **Software → Keynote Response**:
   - Default **Local Port** is `8080` (adjust if needed to match your Keynote module).
2. Add **Software → Keynote**:
   - Ensure **WebSocket URL** matches (default `ws://127.0.0.1:8080`).
