/**
 * Scrapebit API Documentation Sidebars
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  apiSidebar: [
    'intro',
    'authentication',
    {
      type: 'category',
      label: 'REST APIs',
      collapsed: false,
      items: [
        'rest-apis/overview',
        {
          type: 'category',
          label: 'Content API',
          items: [
            'rest-apis/content/scrape',
            'rest-apis/content/extract-data',
            'rest-apis/content/get-scraped-data',
          ],
        },
        {
          type: 'category',
          label: 'PDF API',
          items: [
            'rest-apis/pdf/generate',
            'rest-apis/pdf/get-pdfs',
          ],
        },
        {
          type: 'category',
          label: 'Screenshot API',
          items: [
            'rest-apis/screenshot/capture',
            'rest-apis/screenshot/get-screenshots',
          ],
        },
        {
          type: 'category',
          label: 'Scheduling API',
          items: [
            'rest-apis/scheduling/create-schedule',
            'rest-apis/scheduling/list-schedules',
            'rest-apis/scheduling/delete-schedule',
          ],
        },
        {
          type: 'category',
          label: 'Deep Research API',
          items: [
            'rest-apis/deep-research/create',
            'rest-apis/deep-research/ask-question',
            'rest-apis/deep-research/list',
            'rest-apis/deep-research/delete',
          ],
        },
        {
          type: 'category',
          label: 'User API',
          items: [
            'rest-apis/user/profile',
            'rest-apis/user/usage',
            'rest-apis/user/regenerate-api-key',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdks/javascript',
        'sdks/python',
      ],
    },
    'rate-limits',
    'errors',
  ],
};

module.exports = sidebars;
