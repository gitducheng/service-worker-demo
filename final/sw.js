self.skipWaiting()

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('api').then(
      cache => cache.add('/api/user')
    )
  )
})

self.addEventListener('message', e => {
  if (e.data === 'delete cache') {
    caches.open('api').then(cache => {
      return cache.delete('/api/user')
    })
  }
})


// =============================================== 使用缓存处理请求 =======================================================
// self.addEventListener('fetch', e => {
//   if (e.request.url.endsWith('/api/user')) {
//     e.respondWith(
//       caches.match(e.request.clone())
//     )
//   }
// })
// self.addEventListener('fetch', e => {
//   if (e.request.url.endsWith('/api/user')) {
//     e.respondWith(
//       caches.open('api').then(cache => cache.match(e.request.clone()))
//     )
//   }
// })


// =============================================== Cache First =======================================================
// self.addEventListener('fetch', e => {
//   if (e.request.url.endsWith('/api/user')) {
//     e.respondWith(
//       caches.match(e.request.clone()).then(cache => {
//         if (cache) {
//           return cache
//         }
//         return fetch(e.request.clone())
//       })
//     )
//   }
// })

// // =============================================== Dynamic Cache =======================================================
// self.addEventListener('fetch', e => {
//   if (e.request.url.endsWith('/api/user')) {
//     e.respondWith(
//       caches.match(e.request.clone()).then(async cache => {
//         if (cache) {
//           return cache
//         }
//         const response = await fetch(e.request.clone())
//         caches.open('api').then(cache => {
//           cache.add(e.request.clone())
//         })
//         return response
//       })
//     )
//   }
// })

// =============================================== Network First =======================================================
self.addEventListener('fetch', e => {
  const { request } = e
  if (request.url.endsWith('/api/user')) {
    e.respondWith(
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(request.clone())
          caches.open('api').then(cache => {
            cache.put('/api/user', response.clone())
          })
          resolve(response.clone())
        } catch (e) {
          caches.match(request).then(cache => {
            if (cache) {
              resolve(cache)
            } else {
              reject(e)
            }
          })
        }
      })
    )
  }
})

