// =========================================== 看看 fetch event 有什么 ======================================================
// self.addEventListener('fetch', (event) => {
//   console.log('event', event)
// })

// =========================================== 直接修改 response（同步）======================================================
// self.addEventListener('fetch',(event) => {
//   if(event.request.url.endsWith('/api/user')){
//     event.respondWith(new Response(JSON.stringify({
//       username: '我固定了'
//     })))
//   }
// })

// =========================================== 直接修改 response（异步）==================================================
// function sleep(rtn, ms) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(rtn)
//     }, ms)
//   })
// }
//
// self.addEventListener('fetch', (event) => {
//   if (event.request.url.endsWith('/api/user')) {
//     event.respondWith(
//       sleep(
//           new Response(JSON.stringify({
//             username: '我固定了'
//           })),
//         3000
//       ),
//     )
//   }
// })


// =============================================== 直接修改 response（异步, 错误示范）=======================================================
// function sleep(rtn, ms) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(rtn)
//     }, ms)
//   })
// }
//
// self.addEventListener('fetch', async (event) => {
//   if (event.request.url.endsWith('/api/user')) {
//     const res = await sleep(
//       new Response(JSON.stringify({
//         username: '我固定了'
//       })),
//       3000
//     )
//     event.respondWith(res)
//   }
// })



// =============================================== waitUntil =======================================================
function sleep(rtn, ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(rtn)
      }, ms)
    })
  }
  
  self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('/api/user')) {
  
      event.waitUntil(async () => {
        const res = await sleep(
          new Response(JSON.stringify({
            username: '我固定了'
          })),
          3000
        )
        event.respondWith(res)
      })
    }
  })
  