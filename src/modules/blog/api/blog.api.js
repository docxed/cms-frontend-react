const useBlogAPI = () => {
  const create = async (payload) => {
    const res = await $http.post('/blog', payload)
    return res.data
  }
  const getAll = async (params) => {
    const res = await $http.get('/blog', { params })
    return res.data
  }
  const remove = async (id) => {
    await $http.delete(`/blog/${id}`)
    return
  }
  const update = async (id, payload) => {
    const res = await $http.put(`/blog/${id}`, payload)
    return res.data
  }

  return {
    create,
    getAll,
    remove,
    update,
  }
}

export default useBlogAPI
