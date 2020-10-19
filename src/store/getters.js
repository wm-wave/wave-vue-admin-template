const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routes,
  sidebarLoading: state => state.permission.sidebarLoading,
  baseSrc: state => state.upload.baseSrc,
  topBarActiveIndex: state => state.app.topbar.activeIndex
}

export default getters
