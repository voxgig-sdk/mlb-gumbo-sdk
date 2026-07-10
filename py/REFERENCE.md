# MlbGumbo Python SDK Reference

Complete API reference for the MlbGumbo Python SDK.


## MlbGumboSDK

### Constructor

```python
from mlbgumbo_sdk import MlbGumboSDK

client = MlbGumboSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MlbGumboSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MlbGumboSDK.test()
```


### Instance Methods

#### `GameData(data=None)`

Create a new `GameDataEntity` instance. Pass `None` for no initial data.

#### `Player(data=None)`

Create a new `PlayerEntity` instance. Pass `None` for no initial data.

#### `Schedule(data=None)`

Create a new `ScheduleEntity` instance. Pass `None` for no initial data.

#### `Team(data=None)`

Create a new `TeamEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GameDataEntity

```python
game_data = client.GameData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `game_data` | `dict` | No |  |
| `live_data` | `dict` | No |  |
| `timestamp` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GameData().list()
for game_data in results:
    print(game_data)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GameData().load({"game_pk": "game_pk"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlayerEntity

```python
player = client.Player()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `person` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Player().load({"player_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlayerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScheduleEntity

```python
schedule = client.Schedule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No |  |
| `game` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Schedule().list()
for schedule in results:
    print(schedule)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScheduleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TeamEntity

```python
team = client.Team()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `jersey_number` | `str` | No |  |
| `person` | `dict` | No |  |
| `position` | `dict` | No |  |
| `status` | `dict` | No |  |
| `team` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Team().list()
for team in results:
    print(team)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Team().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TeamEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MlbGumboSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

