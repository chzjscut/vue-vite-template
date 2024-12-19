import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('@vuepress/theme-default')

const sidebar = {
  guide: [
    {
      text: '前言',
      collapsible: false,
      children: [
        '/guide/preface/introduction',
        '/guide/preface/aboutme',
      ]
    },
    {
      text: '主流程',
      collapsible: false,
      children: [
        '/guide/mainprocess/introduction',
        '/guide/mainprocess/entrance',
        '/guide/mainprocess/new-vue',
      ]
    }
  ]
}

export default defineUserConfig({
  lang: 'zh-CN',
  title: '文档',
  description: '站点11',
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    // localization for china
    [
      'script',
      {
        src: 'https://player.youku.com/iframeapi'
      }
    ]
  ],
  theme: defaultTheme({
    //logo: '/logo.png',
    docsDir: 'docs',
    navbar: [
      {
        text: '文档',
        children: [
          {
            text: '前言',
            link: '/preface/introduction'
          },
        ]
      },
      {
        text: '多语言',
        link: '#',
        children: [
          // Translation maintainers: Please include the link below to the English documentation
          {
            text: 'English',
            link: 'https://v3.vuejs.org/',
            isTranslation: true
          },
          // {
          //   text: '中文',
          //   link: 'https://v3.cn.vuejs.org/',
          //   isTranslation: true
          // },
          {
            text: '한국어',
            link: 'https://v3.ko.vuejs.org/',
            isTranslation: true
          },
          {
            text: '日本語',
            link: 'https://v3.ja.vuejs.org/',
            isTranslation: true
          },
          {
            text: 'Русский',
            link: 'https://v3.ru.vuejs.org/ru/',
            isTranslation: true
          },
          {
            text: '更多翻译',
            link: '/guide/contributing/translations#community-translations'
          }
        ]
      }
    ],
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': sidebar.guide,
    },
    repo: 'vuejs/docs-next-zh-cn',
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: true,
    lastUpdatedText: '最近更新时间',
  }),
  // plugins: [
  //   [
  //     '@vuepress/last-updated',
  //     {
  //       transformer(timestamp) {
  //         const date = new Date(timestamp)

  //         const digits = [
  //           date.getUTCFullYear(),
  //           date.getUTCMonth() + 1,
  //           date.getUTCDate(),
  //           date.getUTCHours(),
  //           date.getUTCMinutes(),
  //           date.getUTCSeconds()
  //         ].map(num => String(num).padStart(2, '0'))

  //         return '{0}-{1}-{2}, {3}:{4}:{5} UTC'.replace(
  //           /{(\d)}/g,
  //           (_, num) => digits[num]
  //         )
  //       }
  //     }
  //   ],
  //   [
  //     '@vuepress/pwa',
  //     {
  //       serviceWorker: true,
  //       updatePopup: {
  //         '/': {
  //           message: '内容有更新',
  //           buttonText: '刷新'
  //         }
  //       }
  //     }
  //   ],
  //   [
  //     'vuepress-plugin-container',
  //     {
  //       type: 'info',
  //       before: info =>
  //         `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
  //       after: '</div>'
  //     }
  //   ]
  // ],
  // markdown: {
  //   lineNumbers: true,
  //   /** @param {import('markdown-it')} md */
  //   extendMarkdown: md => {
  //     md.options.highlight = require('./markdown/highlight')(
  //       md.options.highlight
  //     )
  //   }
  // }
})
