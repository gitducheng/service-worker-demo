self.skipWaiting()

// =============================================== 缓存 /api/user 接口 =======================================================
caches.open('api').then(cache => {
  return cache.add('/api/user')
})

// =============================================== 同时添加多个缓存 =======================================================
// caches.open('api').then(cache => {
//   return cache.addAll([
//     '/',
//     '/api/user'
//   ])
// })


// =============================================== 删除缓存 =======================================================
// self.addEventListener('message', e => {
//   if (e.data === 'delete cache') {
//     caches.open('api').then(cache => {
//       return cache.delete('/api/user')
//     })
//   }
// })
