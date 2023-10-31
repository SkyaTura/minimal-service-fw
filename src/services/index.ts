import user from './user'
import pet from './pet'
import audit from './audit'

export default defineService(() => ({
  audit,
  user,
  pet,
}))
