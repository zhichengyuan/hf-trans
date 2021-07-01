const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    storename: state => state.user.storename,
    parent: state => state.user.parent,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    linkSid: state => state.user.linkSid,
    totalM: state => state.user.totalM,
    useM: state => state.user.useM,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    username: state => state.user.username,
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs
}
export default getters