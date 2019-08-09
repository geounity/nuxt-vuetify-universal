export default function({ store, redirect, route }) {
  if (store.state.user !== null) {
    if (route.name === 'login') {
      redirect('/admin')
    }
  } else if (isAdminRoute(route)) {
    redirect('/login')
  }
}

function isAdminRoute(route) {
  if (route.matched.some((record) => record.path === '/admin')) {
    return true
  }
}
