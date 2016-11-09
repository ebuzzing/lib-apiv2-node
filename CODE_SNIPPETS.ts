
// let requestMiddleware = {
//   name: 'add-cats-to-request',
//   req: (payload)=> {
//     console.log(JSON.stringify(payload.req.data));
//     return payload
//   }
// }

// let responseMiddleware = {
//   name: 'only-cats-please',
//   res: (payload) => {
//     payload.res.data = ['Cats', 'Cats', 'Cats']
//     return payload
//   }
// }

// let errorMiddleware = {
//   name: 'nothing-to-see-here',
//   error: function (payload) {
//     return { errors: [] }
//   }
// }

// jsonApi.insertMiddlewareBefore('axios-request', requestMiddleware)
// jsonApi.insertMiddlewareAfter('response', responseMiddleware)
// jsonApi.replaceMiddleware('errors', errorMiddleware)
