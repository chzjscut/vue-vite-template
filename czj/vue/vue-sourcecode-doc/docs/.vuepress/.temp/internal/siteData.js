export const siteData = {
  "base": "/",
  "lang": "zh-CN",
  "title": "文档",
  "description": "站点11",
  "head": [
    [
      "link",
      {
        "href": "https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap",
        "rel": "stylesheet"
      }
    ],
    [
      "link",
      {
        "href": "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        "rel": "stylesheet"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo.png"
      }
    ],
    [
      "meta",
      {
        "name": "theme-color",
        "content": "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-capable",
        "content": "yes"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-status-bar-style",
        "content": "black"
      }
    ],
    [
      "link",
      {
        "rel": "apple-touch-icon",
        "href": "/images/icons/apple-icon-152x152.png"
      }
    ],
    [
      "meta",
      {
        "name": "msapplication-TileImage",
        "content": "/images/icons/ms-icon-144x144.png"
      }
    ],
    [
      "meta",
      {
        "name": "msapplication-TileColor",
        "content": "#000000"
      }
    ],
    [
      "script",
      {
        "src": "https://player.youku.com/iframeapi"
      }
    ]
  ],
  "locales": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
