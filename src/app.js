import express from 'express'
import { engine } from 'express-handlebars'
import mocksRouter from './routes/mocks.router.js'
import __dirname from './utils.js'
import './config/dB.config.js'


const app = express()
const PORT = 8080

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/', mocksRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

export default app