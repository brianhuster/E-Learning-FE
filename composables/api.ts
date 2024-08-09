interface FetchError extends Error {
  data: {
    error: string
    message: string
  }
}
export async function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
) {
  const token = localStorage.getItem('token') || ''
  try {
    const response = await $fetch<T>(request, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        ...opts?.headers,
      },
    })
    return response
  } catch (error) {
    const fetchError = error as FetchError
    notification.error({
      message: fetchError.data?.error || 'No internet',
      description: fetchError.data?.message,
      duration: 10,
    })
    throw error
  }
}
