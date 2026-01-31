---
sidebar_position: 2
---

# Extract Data

Extract specific data from a URL using AI-powered natural language prompts.

## Endpoint

```
POST /v1/content/extract
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The URL to extract data from |
| `prompt` | string | Yes | Natural language description of data to extract |
| `schema` | object | No | JSON schema for structured output |
| `format` | string | No | Output format: `json`, `csv`, `table` (default: `json`) |

## Example Request

### Simple Extraction

```bash
curl -X POST https://api.scrapebit.com/v1/content/extract \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://news.example.com/articles",
    "prompt": "Extract all article titles, authors, and publication dates from this page"
  }'
```

### With Schema

```bash
curl -X POST https://api.scrapebit.com/v1/content/extract \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://jobs.example.com/listings",
    "prompt": "Extract all job listings",
    "schema": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "company": { "type": "string" },
          "location": { "type": "string" },
          "salary": { "type": "string" },
          "posted_date": { "type": "string" }
        }
      }
    }
  }'
```

## Response

```json
{
  "success": true,
  "data": {
    "id": "extract_xyz789",
    "url": "https://jobs.example.com/listings",
    "extracted": [
      {
        "title": "Senior Software Engineer",
        "company": "TechCorp",
        "location": "San Francisco, CA",
        "salary": "$150,000 - $200,000",
        "posted_date": "2025-01-30"
      },
      {
        "title": "Product Manager",
        "company": "StartupXYZ",
        "location": "Remote",
        "salary": "$120,000 - $160,000",
        "posted_date": "2025-01-29"
      }
    ],
    "items_count": 2,
    "extracted_at": "2025-01-31T10:30:00Z"
  },
  "credits_used": 1,
  "credits_remaining": 98
}
```

## Use Cases

### E-commerce Product Data

```json
{
  "url": "https://shop.example.com/category/electronics",
  "prompt": "Extract all products with their names, prices, ratings, and availability status"
}
```

### Contact Information

```json
{
  "url": "https://company.example.com/team",
  "prompt": "Extract all team members with their names, job titles, email addresses, and LinkedIn profiles"
}
```

### Real Estate Listings

```json
{
  "url": "https://realestate.example.com/listings",
  "prompt": "Extract all property listings including address, price, bedrooms, bathrooms, and square footage"
}
```

### News Articles

```json
{
  "url": "https://news.example.com",
  "prompt": "Extract the top 10 headlines with their summaries and publication times"
}
```

## Output Formats

### JSON (default)

```json
{
  "format": "json"
}
```

### CSV

```json
{
  "format": "csv"
}
```

Response includes a `csv_url` field:

```json
{
  "data": {
    "csv_url": "https://api.scrapebit.com/downloads/extract_xyz789.csv"
  }
}
```

### Table

```json
{
  "format": "table"
}
```

Returns data as a 2D array with headers.

## Credits

This endpoint uses **1 credit** per extraction.
