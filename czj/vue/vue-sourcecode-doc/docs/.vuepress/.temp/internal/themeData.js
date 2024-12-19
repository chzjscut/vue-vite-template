export const themeData = {
  "docsDir": "docs",
  "navbar": [
    {
      "text": "文档",
      "children": [
        {
          "text": "前言",
          "link": "/preface/introduction"
        }
      ]
    },
    {
      "text": "多语言",
      "link": "#",
      "children": [
        {
          "text": "English",
          "link": "https://v3.vuejs.org/",
          "isTranslation": true
        },
        {
          "text": "한국어",
          "link": "https://v3.ko.vuejs.org/",
          "isTranslation": true
        },
        {
          "text": "日本語",
          "link": "https://v3.ja.vuejs.org/",
          "isTranslation": true
        },
        {
          "text": "Русский",
          "link": "https://v3.ru.vuejs.org/ru/",
          "isTranslation": true
        },
        {
          "text": "更多翻译",
          "link": "/guide/contributing/translations#community-translations"
        }
      ]
    }
  ],
  "sidebarDepth": 2,
  "sidebar": {
    "collapsable": false,
    "/guide/": [
      {
        "text": "前言",
        "collapsible": false,
        "children": [
          "/guide/preface/introduction",
          "/guide/preface/aboutme"
        ]
      },
      {
        "text": "主流程",
        "collapsible": false,
        "children": [
          "/guide/mainprocess/introduction",
          "/guide/mainprocess/entrance",
          "/guide/mainprocess/new-vue"
        ]
      }
    ]
  },
  "repo": "vuejs/docs-next-zh-cn",
  "editLink": true,
  "editLinkText": "在 GitHub 上编辑此页",
  "lastUpdated": true,
  "lastUpdatedText": "最近更新时间",
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "logo": null,
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
