---
sidebar_position: 10
---

# Rate Limits

Scrapebit applies rate limits to ensure fair usage and API stability for all users.

## Default Limits

| Plan | Requests/Minute | Requests/Hour | Concurrent |
|------|-----------------|---------------|------------|
| Free | 10 | 100 | 2 |
| Starter | 30 | 500 | 5 |
| Pro | 60 | 2,000 | 10 |
| Enterprise | 200 | 10,000 | 50 |

## Rate Limit Headers

Every API response includes rate limit information in the headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706716800
```

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests per minute for your plan |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `X-RateLimit-Reset` | Unix timestamp when the rate limit resets |

## Rate Limit Exceeded

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "success": false,
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please slow down your requests.",
    "retry_after": 32
  }
}
```

The `Retry-After` header indicates how many seconds to wait:

```
Retry-After: 32
```

## Best Practices

### 1. Implement Exponential Backoff

```javascript
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.code === 'rate_limit_exceeded') {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw error;
      }
    }
  }
}
```

### 2. Monitor Rate Limit Headers

```javascript
const response = await fetch(url, { headers });
const remaining = response.headers.get('X-RateLimit-Remaining');

if (parseInt(remaining) < 5) {
  // Slow down requests
  await new Promise(r => setTimeout(r, 5000));
}
```

### 3. Use Bulk Endpoints

Instead of multiple individual requests, use batch operations when available:

```javascript
// Bad: Multiple requests
for (const url of urls) {
  await scrapebit.content.scrape({ url });
}

// Good: Single batch request
await scrapebit.content.scrapeBatch({ urls });
```

### 4. Cache Results

Cache scraped data to avoid redundant requests:

```javascript
const cache = new Map();

async function getCachedScrape(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const result = await scrapebit.content.scrape({ url });
  cache.set(url, result);
  return result;
}
```

### 5. Use Webhooks for Schedules

Instead of polling for schedule results, use webhooks:

```javascript
await scrapebit.schedules.create({
  name: 'Daily Scrape',
  url: 'https://example.com',
  frequency: 'daily',
  webhook_url: 'https://your-server.com/webhook'
});
```

## Endpoint-Specific Limits

Some endpoints have additional limits:

| Endpoint | Limit |
|----------|-------|
| `/pdf/generate` | 20/minute |
| `/screenshot/capture` | 30/minute |
| `/research/ask` | 10/minute |
| `/user/api-key/regenerate` | 1/hour |

## Increasing Limits

Need higher limits? Contact us:

- **Enterprise plans** include significantly higher limits
- **Custom limits** available for specific use cases
- Email: [enterprise@scrapebit.com](mailto:enterprise@scrapebit.com)
