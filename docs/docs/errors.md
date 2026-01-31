---
sidebar_position: 11
---

# Error Handling

All Scrapebit API errors follow a consistent format to help you handle them effectively.

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Insufficient permissions or credits |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Something went wrong |
| `503` | Service Unavailable - Temporary outage |

## Common Error Codes

### Authentication Errors

| Code | Message | Solution |
|------|---------|----------|
| `unauthorized` | Invalid or missing API key | Check your API key is correct |
| `api_key_expired` | API key has been regenerated | Use your new API key |
| `api_key_revoked` | API key has been revoked | Generate a new API key |

### Validation Errors

| Code | Message | Solution |
|------|---------|----------|
| `invalid_url` | The provided URL is not valid | Check URL format |
| `invalid_parameter` | Invalid parameter value | Check parameter requirements |
| `missing_parameter` | Required parameter missing | Include all required fields |
| `url_not_accessible` | Cannot access the URL | Verify URL is publicly accessible |

### Credit Errors

| Code | Message | Solution |
|------|---------|----------|
| `insufficient_credits` | Not enough credits | Purchase more credits |
| `credits_expired` | Your credits have expired | Purchase new credits |

### Rate Limit Errors

| Code | Message | Solution |
|------|---------|----------|
| `rate_limit_exceeded` | Too many requests | Slow down and retry later |
| `concurrent_limit_exceeded` | Too many concurrent requests | Wait for current requests to complete |

### Resource Errors

| Code | Message | Solution |
|------|---------|----------|
| `not_found` | Resource not found | Check the resource ID |
| `already_exists` | Resource already exists | Use a different identifier |
| `already_deleted` | Resource has been deleted | Cannot operate on deleted resource |

### Processing Errors

| Code | Message | Solution |
|------|---------|----------|
| `timeout` | Request timed out | Increase timeout or simplify request |
| `blocked` | Access was blocked | Try with proxy enabled |
| `page_too_large` | Content exceeds size limit | Scrape smaller sections |
| `extraction_failed` | AI extraction failed | Refine your extraction prompt |

## Error Handling Examples

### JavaScript

```javascript
import { Scrapebit, ScrapebitError } from '@scrapebit/sdk';

const client = new Scrapebit('YOUR_API_KEY');

try {
  const result = await client.content.scrape({ url: 'https://example.com' });
} catch (error) {
  if (error instanceof ScrapebitError) {
    switch (error.code) {
      case 'unauthorized':
        console.error('Invalid API key');
        break;
      case 'insufficient_credits':
        console.error('Need more credits');
        // Redirect to purchase page
        break;
      case 'rate_limit_exceeded':
        console.error(`Rate limited. Retry in ${error.retryAfter}s`);
        await sleep(error.retryAfter * 1000);
        // Retry request
        break;
      case 'timeout':
        console.error('Request timed out');
        // Retry with longer timeout
        break;
      default:
        console.error(`Error: ${error.message}`);
    }
  }
}
```

### Python

```python
from scrapebit import Scrapebit, ScrapebitError

client = Scrapebit(api_key="YOUR_API_KEY")

try:
    result = client.content.scrape(url="https://example.com")
except ScrapebitError as e:
    if e.code == "unauthorized":
        print("Invalid API key")
    elif e.code == "insufficient_credits":
        print("Need more credits")
    elif e.code == "rate_limit_exceeded":
        print(f"Rate limited. Retry in {e.retry_after}s")
        time.sleep(e.retry_after)
        # Retry request
    elif e.code == "timeout":
        print("Request timed out")
    else:
        print(f"Error: {e.message}")
```

### cURL

```bash
response=$(curl -s -w "\n%{http_code}" -X POST https://api.scrapebit.com/v1/content/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}')

http_code=$(echo "$response" | tail -1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" != "200" ]; then
  error_code=$(echo "$body" | jq -r '.error.code')
  echo "Error: $error_code"
fi
```

## Retry Strategy

For transient errors, implement a retry strategy:

```javascript
async function withRetry(fn, maxRetries = 3) {
  const retryableErrors = ['timeout', 'rate_limit_exceeded', 'service_unavailable'];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!retryableErrors.includes(error.code) || attempt === maxRetries) {
        throw error;
      }

      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

## Getting Help

If you encounter persistent errors:

1. Check the [API Status Page](https://status.scrapebit.com)
2. Review your request parameters
3. Contact [support@scrapebit.com](mailto:support@scrapebit.com) with:
   - The error code and message
   - Your request details (without API key)
   - Timestamp of the error
