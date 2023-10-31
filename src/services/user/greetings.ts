export default defineService((ctx) => ({
  hello(name) {
    ctx.audit.update({ event: 'user.greeting.hello', name })
    console.log(`Hello user ${name}`)
  },
}))
