export default function({ store, route, redirect }) {
  const user = store.state.user
  const blockedRoute = /\/admin\/*/g
  const homeRoute = '/'

  if (!user && route.path.match(blockedRoute)) {
    redirect('/')
  }

  if (user && route.path === homeRoute) {
    // redirect('/admin')
  }
}
