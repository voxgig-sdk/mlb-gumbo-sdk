# MlbGumbo SDK



Available for [Golang](go/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GameData** |  | `/game/{game_pk}/feed/live/timestamps` |
| **Player** |  | `/people/{playerId}` |
| **Schedule** |  | `/schedule` |
| **Team** |  | `/teams/{teamId}/roster` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/mlb-gumbo-sdk"

client := sdk.NewMlbGumboSDK(map[string]any{
    "apikey": os.Getenv("MLB-GUMBO_APIKEY"),
})

// List all gamedatas
gamedatas, err := client.GameData(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("mlb-gumbo_sdk")

local client = sdk.new({
  apikey = os.getenv("MLB-GUMBO_APIKEY"),
})

-- List all gamedatas
local gamedatas, err = client:GameData(nil):list(nil, nil)

-- Load a specific gamedata
local gamedata, err = client:GameData(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'mlbgumbo_sdk.php';

$client = new MlbGumboSDK([
    "apikey" => getenv("MLB-GUMBO_APIKEY"),
]);

// List all gamedatas
[$gamedatas, $err] = $client->GameData(null)->list(null, null);

// Load a specific gamedata
[$gamedata, $err] = $client->GameData(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from mlbgumbo_sdk import MlbGumboSDK

client = MlbGumboSDK({
    "apikey": os.environ.get("MLB-GUMBO_APIKEY"),
})

# List all gamedatas
gamedatas, err = client.GameData(None).list(None, None)

# Load a specific gamedata
gamedata, err = client.GameData(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "MlbGumbo_sdk"

client = MlbGumboSDK.new({
  "apikey" => ENV["MLB-GUMBO_APIKEY"],
})

# List all gamedatas
gamedatas, err = client.GameData(nil).list(nil, nil)

# Load a specific gamedata
gamedata, err = client.GameData(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { MlbGumboSDK } from 'mlb-gumbo'

const client = new MlbGumboSDK({
  apikey: process.env.MLB-GUMBO_APIKEY,
})

// List all gamedatas
const gamedatas = await client.GameData().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GameData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GameData(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = MlbGumboSDK::test(null, null);
[$result, $err] = $client->GameData(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = MlbGumboSDK.test(None, None)
result, err = client.GameData(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = MlbGumboSDK.test(nil, nil)
result, err = client.GameData(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = MlbGumboSDK.test()
const result = await client.GameData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

