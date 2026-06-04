# MlbGumbo SDK

Real-time Major League Baseball game feeds, schedules, players, and team data via MLB's public Stats API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About MLB GUMBO API

The **MLB GUMBO API** is the public face of the [MLB Stats API](https://statsapi.mlb.com/api/v1.1), run by MLB Advanced Media. GUMBO (Grand Unified Master Baseball Object) is the JSON document format MLB uses internally to describe a live game — every pitch, play, substitution, and box-score line — and the same feed powers MLB.com and the official MLB app.

What you typically get from the API:

- Live and historical **game feeds** in GUMBO format, including play-by-play, line scores, and box scores
- **Schedule** data by date, team, or season, with probable pitchers and game status
- **Team** rosters, venues, divisions, and league affiliations
- **Player** biographical information and season/career statistics

The API is read-only over HTTPS and returns JSON. CORS is enabled, so browser clients can call it directly. There is no documented authentication step and no published rate limit, but the service is shared infrastructure — keep request volume reasonable and cache where you can.

## Try it

**TypeScript**
```bash
npm install mlb-gumbo
```

**Python**
```bash
pip install mlb-gumbo-sdk
```

**PHP**
```bash
composer require voxgig/mlb-gumbo-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/mlb-gumbo-sdk/go
```

**Ruby**
```bash
gem install mlb-gumbo-sdk
```

**Lua**
```bash
luarocks install mlb-gumbo-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MlbGumboSDK } from 'mlb-gumbo'

const client = new MlbGumboSDK({})

// List all gamedatas
const gamedatas = await client.GameData().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o mlb-gumbo-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "mlb-gumbo": {
      "command": "/abs/path/to/mlb-gumbo-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GameData** | A live or completed game in MLB's GUMBO JSON format, covering line score, box score, and play-by-play; typically served from `/game/{gamePk}/feed/live`. | `/game/{game_pk}/feed/live/timestamps` |
| **Player** | A Major League Baseball player resource with biographical details and statistics, typically served from `/people/{personId}`. | `/people/{playerId}` |
| **Schedule** | Game schedules filterable by date, team, sportId, or season, typically served from `/schedule`. | `/schedule` |
| **Team** | An MLB club resource with league, division, venue, and roster references, typically served from `/teams/{teamId}`. | `/teams/{teamId}/roster` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from mlbgumbo_sdk import MlbGumboSDK

client = MlbGumboSDK({})

# List all gamedatas
gamedatas, err = client.GameData(None).list(None, None)

# Load a specific gamedata
gamedata, err = client.GameData(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'mlbgumbo_sdk.php';

$client = new MlbGumboSDK([]);

// List all gamedatas
[$gamedatas, $err] = $client->GameData(null)->list(null, null);

// Load a specific gamedata
[$gamedata, $err] = $client->GameData(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mlb-gumbo-sdk/go"

client := sdk.NewMlbGumboSDK(map[string]any{})

// List all gamedatas
gamedatas, err := client.GameData(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "MlbGumbo_sdk"

client = MlbGumboSDK.new({})

# List all gamedatas
gamedatas, err = client.GameData(nil).list(nil, nil)

# Load a specific gamedata
gamedata, err = client.GameData(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("mlb-gumbo_sdk")

local client = sdk.new({})

-- List all gamedatas
local gamedatas, err = client:GameData(nil):list(nil, nil)

-- Load a specific gamedata
local gamedata, err = client:GameData(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MlbGumboSDK.test()
const result = await client.GameData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MlbGumboSDK.test(None, None)
result, err = client.GameData(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MlbGumboSDK::test(null, null);
[$result, $err] = $client->GameData(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GameData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MlbGumboSDK.test(nil, nil)
result, err = client.GameData(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GameData(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the MLB GUMBO API

- Upstream: [https://statsapi.mlb.com/api/v1.1](https://statsapi.mlb.com/api/v1.1)
- API docs: [https://statsapi.mlb.com/docs/](https://statsapi.mlb.com/docs/)

- The MLB Stats API is operated by MLB Advanced Media and is publicly reachable, but no formal open-data licence is published.
- Data and trademarks (team names, logos, player likenesses) remain property of MLB and its clubs.
- Treat as best-effort: endpoints, fields, and availability can change without notice.
- Check MLB's terms of service before using the data in a commercial product.

---

Generated from the MLB GUMBO API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
