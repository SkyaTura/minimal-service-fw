const ServiceSymbol = Symbol('Service')
const RootCtxInjected = Symbol('RootCtx')

const _defineService = (cb) => {
  const serviceFactory = (ctx) => {
    const service = cb(ctx)
    const isRoot = ctx[RootCtxInjected] === undefined
    if (isRoot) ctx[RootCtxInjected] = true
    const injected = Object.fromEntries(
      Object.entries(service).map(([key, value]) => {
        if (value[ServiceSymbol]) {
          return [key, value(ctx)]
        }
        return [key, value]
      })
    )
    if (isRoot) Object.assign(ctx, injected)
    return injected
  }
  serviceFactory[ServiceSymbol] = true
  return serviceFactory
}

declare global {
  var defineService: typeof _defineService
}
globalThis.defineService = _defineService

export { }
