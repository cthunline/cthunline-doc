// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Cthunline',
    tagline: 'Role playing game web app',
    url: 'https://cthunline.org',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'cthunline',
    projectName: 'cthunline-doc',
    trailingSlash: false,
    deploymentBranch: 'gh-pages',

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            })
        ],
        [
            'redocusaurus',
            {
                specs: [
                    {
                        route: '/api/',
                        spec: './openapi/api.yaml'
                    }
                ]
            }
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark'
            },
            navbar: {
                title: 'Cthunline',
                logo: {
                    alt: 'Cthunline logo',
                    src: 'img/logo.png'
                },
                items: [
                    {
                        type: 'doc',
                        label: 'Documentation',
                        docId: 'documentation/introduction',
                        position: 'left'
                    },
                    {
                        position: 'left',
                        label: 'API',
                        to: '/api'
                    },
                    {
                        type: 'doc',
                        label: 'WebSockets',
                        docId: 'websockets/about',
                        position: 'left'
                    },
                    {
                        href: 'https://github.com/cthunline',
                        label: 'GitHub',
                        position: 'right'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Documentation',
                                to: '/docs/documentation/introduction'
                            },
                            {
                                label: 'API reference',
                                to: '/api'
                            }
                        ]
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/cthunline'
                            },
                            {
                                label: 'Docker Hub',
                                href: 'https://hub.docker.com/r/cthunline/cthunline'
                            }
                        ]
                    }
                ],
                copyright: 'Built with Docusaurus.'
            },
            prism: {
                theme: themes.github,
                darkTheme: themes.dracula
            }
        })
};

module.exports = config;
