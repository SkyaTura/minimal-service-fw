import './define-service'

import ServiceFactory from './services'

const route = (path, req, next) => {
  console.log(`\n<---------- Start req ${path} ---------->\n`)

  const ctx = { req }
  req.ctx = ctx
  ServiceFactory(ctx)

  ctx.audit.start({ origin: req.origin ?? null, user: req.user ?? null })

  next(req)

  console.log(`\n<------ Audit ----->\n`)

  ctx.audit.report()

  console.log(`\n<----------- End req ${path} ----------->\n`)
}

route(
  '/user/greetings/hello',
  {
    origin: 'tablet',
    user: { name: 'John' }
  },
  (req) => {
    req.ctx.user.greetings.hello('Doe')
  }
)

route(
  '/user/greetings/hello-to-pet',
  {
    origin: 'celular',
    user: { name: 'Wick' }
  },
  (req) => {
    req.ctx.user.pet.hello(req.user.name, 'rex')
  }
)



