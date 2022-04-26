// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Cthunline',
    tagline: 'Role playing game app',
    url: 'https://doc.cthunline.com',
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
                specs: [{
                    route: '/api/',
                    spec: './openapi/api.yaml'
                }]
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
                    docId: 'introduction',
                    position: 'left',
                    label: 'Documentation'
                },
                {
                    position: 'left',
                    label: 'API',
                    to: '/api'
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
                            label: 'Getting started',
                            to: '/docs/getting-started'
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
                            href: 'https://hub.docker.com/repository/docker/cthunline'
                        },
                        {
                            label: 'Official Website',
                            href: 'https://cthunline.com/'
                        }
                    ]
                }
            ],
            copyright: 'Built with Docusaurus.'
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme
        }
    })
};

module.exports = config;
