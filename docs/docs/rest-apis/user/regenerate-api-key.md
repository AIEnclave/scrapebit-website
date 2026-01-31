---
sidebar_position: 3
---

# Regenerate API Key

Generate a new API key, invalidating the current one.

## Endpoint

```
POST /v1/user/api-key/regenerate
```

## Example Request

```bash
curl -X POST "https://api.scrapebit.com/v1/user/api-key/regenerate" \
  -H "Authorization: Bearer YOUR_CURRENT_API_KEY" \
  -H "Content-Type: application/json"
```

## Response

```json
{
  "success": true,
  "data": {
    "api_key": "sb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "created_at": "2025-01-31T16:00:00Z",
    "previous_key_invalidated": true
  },
  "message": "API key regenerated successfully. Your old key is now invalid."
}
```

:::danger Important
The full API key is **only shown once** in this response. Store it securely immediately. You will not be able to retrieve the full key again.
:::

## What Happens

1. A new API key is generated
2. The old API key is **immediately invalidated**
3. All requests using the old key will fail with `401 Unauthorized`
4. The new key is returned in the response

## When to Regenerate

- **Security breach**: If you suspect your key was compromised
- **Key rotation**: As part of regular security practices
- **Team changes**: When team members with access leave
- **Accidental exposure**: If the key was committed to version control

## After Regenerating

1. **Update your applications** with the new API key
2. **Update environment variables** in all deployments
3. **Test** that everything works with the new key
4. **Remove** any stored copies of the old key

## Error Responses

### Rate Limited

You can only regenerate your API key once per hour:

```json
{
  "success": false,
  "error": {
    "code": "rate_limited",
    "message": "You can only regenerate your API key once per hour. Please try again later.",
    "retry_after": 2400
  }
}
```

## Alternative: Web Dashboard

You can also regenerate your API key from the Scrapebit web dashboard:

1. Log in to [scrapebit.com](https://scrapebit.com/login)
2. Go to **Settings** → **Profile**
3. Click **Regenerate API Key**
4. Copy and save your new key

## Credits

This endpoint does **not** consume credits.
