---
sidebar_position: 3
---

# Delete Schedule

Delete an existing schedule.

## Endpoint

```
DELETE /v1/schedules/{id}
```

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The schedule ID |

## Example Request

```bash
curl -X DELETE "https://api.scrapebit.com/v1/schedules/schedule_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "message": "Schedule deleted successfully"
}
```

## What Happens When You Delete

- The schedule is immediately deactivated
- No future runs will occur
- Historical run data is retained for 30 days
- Any in-progress runs will complete

## Error Responses

### Not Found

```json
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "Schedule with ID 'schedule_abc123' not found"
  }
}
```

### Already Deleted

```json
{
  "success": false,
  "error": {
    "code": "already_deleted",
    "message": "This schedule has already been deleted"
  }
}
```

## Credits

This endpoint does **not** consume credits.
