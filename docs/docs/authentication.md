---
sidebar_position: 2
---

# Authentication

All Scrapebit API requests require authentication using an API key. This page explains how to obtain and use your API key.

## Getting Your API Key

1. Log in to your [Scrapebit account](https://scrapebit.com/login)
2. Navigate to **Settings** or click on your profile
3. Click the **Full Screen** button to access your complete profile
4. Find the **API Key** section
5. Click **Generate API Key** or **Regenerate** if you already have one

:::caution
Keep your API key secure! Never share it publicly or commit it to version control. If compromised, regenerate it immediately from your dashboard.
:::

## Using Your API Key

Include your API key in the `Authorization` header of every request:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl -X GET https://api.scrapebit.com/v1/user/profile \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Using with JavaScript

```javascript
const response = await fetch('https://api.scrapebit.com/v1/user/profile', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### Using with Python

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.scrapebit.com/v1/user/profile',
    headers=headers
)

data = response.json()
```

## API Key Format

Scrapebit API keys follow this format:

- **Live keys**: `sb_live_` followed by 32 characters
- **Test keys**: `sb_test_` followed by 32 characters (for sandbox testing)

Example: `sb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Regenerating Your API Key

If your API key is compromised or you need a new one:

1. Go to your [profile settings](https://scrapebit.com/dashboard/settings)
2. Click **Regenerate API Key**
3. Confirm the action
4. Update your applications with the new key

:::warning
Regenerating your API key will immediately invalidate the old key. All requests using the old key will fail with a `401 Unauthorized` error.
:::

## Authentication Errors

| Status Code | Error | Description |
|-------------|-------|-------------|
| `401` | `unauthorized` | Missing or invalid API key |
| `401` | `api_key_expired` | API key has been regenerated |
| `403` | `insufficient_credits` | Not enough credits for this operation |
| `429` | `rate_limit_exceeded` | Too many requests |

### Error Response Example

```json
{
  "success": false,
  "error": {
    "code": "unauthorized",
    "message": "Invalid or missing API key. Please check your Authorization header."
  }
}
```

## Best Practices

1. **Use environment variables** to store your API key
2. **Never hardcode** API keys in your source code
3. **Rotate keys periodically** for enhanced security
4. **Use separate keys** for development and production
5. **Monitor usage** to detect unauthorized access

### Environment Variable Example

```bash
# .env file
SCRAPEBIT_API_KEY=sk_live_abc123xyz789
```

```javascript
// JavaScript
const apiKey = process.env.SCRAPEBIT_API_KEY;
```

```python
# Python
import os
api_key = os.environ.get('SCRAPEBIT_API_KEY')
```
