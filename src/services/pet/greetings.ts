export default defineService((ctx) => ({
  hello(name) {
    ctx.audit.update({ event: 'pet.greetings.hello', name })
    console.log(`Hello pet ${name}`)
  },
  helloFromUser(name, user) {
    ctx.audit.update({ event: 'pet.greetings.helloFromUser', name, user })
    console.log(`User ${user} says:`)
    this.hello(name)
  },
}))
