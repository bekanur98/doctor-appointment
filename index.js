import express from 'express'
import doctorRoutes from "./src/routes/doctorRoutes.js";
// import userRoutes from './src/routes/userRoutes.js'
import scheduleRoutes from './src/routes/scheduleRoutes.js'
import knex from 'knex'
import knexConfig from './knexfile.js'
import chalk from 'chalk'
import userRoutes from "./src/routes/userRoutes.js";

const port = process.env.PORT || 3000

const app = express()

const db = knex(knexConfig['development'])
export default db

app.get('/', (req, res) => {
    res.send('Welcome to doctor appointment server!')
})

app.use(express.json())
app.use('/api/schedules', scheduleRoutes)
app.use('/api/users', userRoutes)
app.use('/api/doctors', doctorRoutes)

app.listen(port, () => {
    console.log(chalk.bgBlue(`🚀 Server running on port ${port}`))
})
