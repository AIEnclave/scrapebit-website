---
sidebar_position: 1
---

# Get Profile

Retrieve your user profile and account information.

## Endpoint

```
GET /v1/user/profile
```

## Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/user/profile" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "data": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": {
      "name": "Pro",
      "credits_included": 1000,
      "features": [
        "Unlimited scrapes",
        "PDF generation",
        "Screenshot capture",
        "Scheduling",
        "Deep research",
        "Priority support"
      ]
    },
    "credits": {
      "balance": 850,
      "used_this_month": 150,
      "expires_at": null
    },
    "api_key": {
      "prefix": "sk_live_abc",
      "created_at": "2025-01-15T10:30:00Z",
      "last_used_at": "2025-01-31T15:45:00Z"
    },
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Your unique user ID |
| `email` | string | Your email address |
| `name` | string | Your display name |
| `plan.name` | string | Your current plan name |
| `plan.credits_included` | integer | Credits included with plan |
| `plan.features` | array | List of available features |
| `credits.balance` | integer | Current credit balance |
| `credits.used_this_month` | integer | Credits used this billing cycle |
| `credits.expires_at` | string/null | Credit expiration date (null = never) |
| `api_key.prefix` | string | First 11 characters of your API key |
| `api_key.created_at` | string | When the API key was created |
| `api_key.last_used_at` | string | Last API key usage timestamp |

## Credits

This endpoint does **not** consume credits.
