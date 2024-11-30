import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

// Pets generator
export const mockingPets = () => ({
    name: faker.animal.petName(),
    type: faker.animal.type()
})

// user generator with encrypted password
export const mockingUsers = async () => {
    const password = await bcrypt.hash('coder123', 10)
    const role = Math.random() > 0.5 ? 'admin' : 'user'

    return {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password,
        role,
        pets: []
    }
}
