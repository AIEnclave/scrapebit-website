---
sidebar_position: 4
---

# Delete Research

Delete a deep research session.

## Endpoint

```
DELETE /v1/research/{id}
```

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The research session ID |

## Example Request

```bash
curl -X DELETE "https://api.scrapebit.com/v1/research/research_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "message": "Research session deleted successfully"
}
```

## What Happens When You Delete

- The research session is immediately deleted
- All indexed data is removed
- Question history is deleted
- The underlying data sources (scrapes, PDFs, etc.) are **not** deleted

## Error Responses

### Not Found

```json
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "Research session with ID 'research_abc123' not found"
  }
}
```

## Credits

This endpoint does **not** consume credits.
