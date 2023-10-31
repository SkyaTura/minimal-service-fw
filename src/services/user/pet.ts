export default defineService((ctx) => ({
  hello: (user, pet) => {
    ctx.audit.update({ event: 'user.pet.hello', pet, user })
    ctx.pet.greetings.helloFromUser(pet, user)
  }
}))
