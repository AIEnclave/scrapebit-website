---
sidebar_position: 1
---

# JavaScript SDK

The official Scrapebit SDK for JavaScript and TypeScript.

## Installation

```bash
npm install @scrapebit/sdk
```

Or with yarn:

```bash
yarn add @scrapebit/sdk
```

## Quick Start

```javascript
import { Scrapebit } from '@scrapebit/sdk';

const scrapebit = new Scrapebit('YOUR_API_KEY');

// Scrape a webpage
const result = await scrapebit.content.scrape({
  url: 'https://example.com',
  extract: {
    title: 'The page title',
    description: 'The meta description'
  }
});

console.log(result.data);
```

## Configuration

```javascript
const scrapebit = new Scrapebit('YOUR_API_KEY', {
  baseUrl: 'https://api.scrapebit.com/v1', // Optional
  timeout: 30000, // Request timeout in ms
  retries: 3, // Number of retries on failure
});
```

## Content API

### Scrape URL

```javascript
const result = await scrapebit.content.scrape({
  url: 'https://example.com/products',
  extract: {
    products: 'List of all product names and prices'
  },
  pagination: {
    nextButtonSelector: '.load-more',
    maxPages: 5
  }
});
```

### Extract Data

```javascript
const result = await scrapebit.content.extract({
  url: 'https://example.com/team',
  prompt: 'Extract all team members with names and roles'
});
```

### Get Scraped Data

```javascript
// List all
const list = await scrapebit.content.list({ page: 1, limit: 20 });

// Get specific
const data = await scrapebit.content.get('scrape_abc123');

// Delete
await scrapebit.content.delete('scrape_abc123');
```

## PDF API

### Generate PDF

```javascript
const pdf = await scrapebit.pdf.generate({
  url: 'https://example.com/report',
  format: 'a4',
  orientation: 'portrait'
});

console.log(pdf.data.pdfUrl);
```

### List PDFs

```javascript
const pdfs = await scrapebit.pdf.list();
```

## Screenshot API

### Capture Screenshot

```javascript
const screenshot = await scrapebit.screenshot.capture({
  url: 'https://example.com',
  fullPage: true,
  type: 'png'
});

console.log(screenshot.data.imageUrl);
```

### Mobile Screenshot

```javascript
const screenshot = await scrapebit.screenshot.capture({
  url: 'https://example.com',
  viewportPreset: 'mobile'
});
```

## Scheduling API

### Create Schedule

```javascript
const schedule = await scrapebit.schedules.create({
  name: 'Daily Price Check',
  type: 'scrape',
  url: 'https://shop.example.com/product',
  frequency: 'daily',
  time: '09:00',
  timezone: 'America/New_York',
  config: {
    extract: {
      price: 'Current product price'
    }
  }
});
```

### Manage Schedules

```javascript
// List all
const schedules = await scrapebit.schedules.list();

// Pause
await scrapebit.schedules.pause('schedule_abc123');

// Resume
await scrapebit.schedules.resume('schedule_abc123');

// Delete
await scrapebit.schedules.delete('schedule_abc123');
```

## Deep Research API

### Create Research Session

```javascript
const research = await scrapebit.research.create({
  name: 'Competitor Analysis',
  dataSources: ['scrape_abc123', 'scrape_def456']
});
```

### Ask Questions

```javascript
const answer = await scrapebit.research.ask('research_abc123', {
  question: 'What are the main differences between competitors?'
});

console.log(answer.data.answer);
```

## User API

### Get Profile

```javascript
const profile = await scrapebit.user.profile();
console.log(profile.data.credits.balance);
```

### Get Usage

```javascript
const usage = await scrapebit.user.usage({ period: 'month' });
console.log(usage.data.summary.totalCreditsUsed);
```

## Error Handling

```javascript
import { Scrapebit, ScrapebitError } from '@scrapebit/sdk';

try {
  const result = await scrapebit.content.scrape({ url: 'https://example.com' });
} catch (error) {
  if (error instanceof ScrapebitError) {
    console.error('API Error:', error.code, error.message);

    if (error.code === 'insufficient_credits') {
      // Handle insufficient credits
    }
  }
}
```

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import { Scrapebit, ScrapeResult, ExtractConfig } from '@scrapebit/sdk';

const config: ExtractConfig = {
  url: 'https://example.com',
  extract: {
    title: 'Page title'
  }
};

const result: ScrapeResult = await scrapebit.content.scrape(config);
```

## Examples

### Price Monitoring

```javascript
async function monitorPrice(productUrl) {
  const result = await scrapebit.content.scrape({
    url: productUrl,
    extract: {
      price: 'The current price',
      inStock: 'Whether the item is in stock'
    }
  });

  return {
    price: result.data.extracted.price,
    inStock: result.data.extracted.inStock,
    scrapedAt: new Date()
  };
}
```

### Bulk Scraping

```javascript
async function bulkScrape(urls) {
  const results = await Promise.all(
    urls.map(url => scrapebit.content.scrape({ url }))
  );
  return results;
}
```
