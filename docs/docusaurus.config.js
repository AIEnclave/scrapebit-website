// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Scrapebit API',
  tagline: 'AI-Powered Web Scraping API Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.scrapebit.com',
  baseUrl: '/',

  organizationName: 'scrapebit',
  projectName: 'scrapebit-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/scrapebit-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Scrapebit',
        logo: {
          alt: 'Scrapebit Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Reference',
          },
          {
            href: 'https://scrapebit.com',
            label: 'Back to App',
            position: 'right',
          },
          {
            href: 'https://github.com/scrapebit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/',
              },
              {
                label: 'Authentication',
                to: '/authentication',
              },
              {
                label: 'API Reference',
                to: '/category/rest-apis',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Scrapebit App',
                href: 'https://scrapebit.com',
              },
              {
                label: 'Pricing',
                href: 'https://scrapebit.com/pricing',
              },
              {
                label: 'Support',
                href: 'https://scrapebit.com/support',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Terms of Service',
                href: 'https://scrapebit.com/terms-of-service',
              },
              {
                label: 'Privacy Policy',
                href: 'https://scrapebit.com/privacy-policy',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Scrapebit. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'python', 'javascript', 'typescript'],
      },
    }),
};

module.exports = config;
