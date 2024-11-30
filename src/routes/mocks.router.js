import { Router } from 'express'
import User from '../dao/models/user.model.js'
import Pet from '../dao/models/pet.model.js'
import { mockingUsers, mockingPets } from '../utils.js'

const mocksRouter = Router()

mocksRouter.get('/mockingUsers', async (req, res) => {
    const users = []
    for (let i = 0; i < 50; i++) {
        users.push(await mockingUsers())
    }
    res.send({
        status: 'success',
        payload: users
    })
})

mocksRouter.post('/generateData', async (req, res) => {
    const { users: userCount, pets: petCount } = req.body

    if (!userCount || !petCount) {
        return res.status(400).send({ status: 'error', message: 'users & pets are required' })
    }

    try {
        const pets = []
        for (let i = 0; i < petCount; i++) {
            const pet = new Pet(mockingPets())
            await pet.save()
            pets.push(pet._id)
        }

        for (let i = 0; i < userCount; i++) {
            const user = await mockingUsers()
            user.pets = pets.slice(0, Math.floor(Math.random() * pets.length))
            await User.create(user)
        }

        res.send({ status: 'success', message: 'Data successfully generated.' })
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
})

mocksRouter.get('/mockingPets', (req, res) => {
    const pets = []
    for (let i = 0; i < 10; i++) {
        pets.push(mockingPets())
    }
    res.send({
        status: 'success',
        payload: pets
    })
})

export default mocksRouter
