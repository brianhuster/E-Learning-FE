export default defineNuxtRouteMiddleware(async (to, from) => {
  const logged = sessionStorage.getItem('logged')
  if (
    ['/login', '/signup', '/auth'].includes(to.path) ||
    from.path === '/auth' ||
    Boolean(logged)
  )
    return
  return navigateTo(
    {
      path: '/auth',
      query: { redirect: to.path, ...to.query },
    },
    { redirectCode: 301 }
  )
})
