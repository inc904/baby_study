import {
  DashBoadrd,
  Login,
  ArticleList,
  NotFound,
  Settings,
  ArticleEdit
} from '../views'
export const mainRouter = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]
export const adminRoutes = [
  {
    pathname: '/admin/dashboard',
    component: DashBoadrd,
    title: '仪表板',
    isNav: true,
    icon: 'dashboard'
  },

  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: '文章管理',
    isNav: true,
    icon: 'book'
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '编辑文章'
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: 'setting'
  }
]
