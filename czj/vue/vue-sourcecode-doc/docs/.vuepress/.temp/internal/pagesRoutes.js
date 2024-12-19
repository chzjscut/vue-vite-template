import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-3fce4c4c","/second.html",{"title":"页面的标题"},["/second","/second.md"]],
  ["v-4c03e684","/guide/mainprocess/entrance.html",{"title":"入口"},["/guide/mainprocess/entrance","/guide/mainprocess/entrance.md"]],
  ["v-50f5cf4c","/guide/mainprocess/introduction.html",{"title":"介绍"},["/guide/mainprocess/introduction","/guide/mainprocess/introduction.md"]],
  ["v-32b2e736","/guide/mainprocess/new-vue.html",{"title":"创建Vue实例"},["/guide/mainprocess/new-vue","/guide/mainprocess/new-vue.md"]],
  ["v-74212345","/guide/mainprocess/",{"title":"介绍"},["/guide/mainprocess/index.html","/guide/mainprocess/README.md"]],
  ["v-1a6d932f","/guide/preface/aboutme.html",{"title":"关于"},["/guide/preface/aboutme","/guide/preface/aboutme.md"]],
  ["v-c36f1678","/guide/preface/introduction.html",{"title":"简介"},["/guide/preface/introduction","/guide/preface/introduction.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
