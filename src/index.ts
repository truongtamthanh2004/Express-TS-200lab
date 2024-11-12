import express, { Request, Response } from 'express'
import { config } from 'dotenv'

import { CategoryStatus, Category } from './modules/category/model/model'
import { CategoryCreateSchema, CategoryUpdateDTO } from './modules/category/model/dto'
import { v7 } from 'uuid'
import { setupCategoryHexagon } from './modules/category'
import { sequelize } from './share/component/sequelize'

console.log('Hello, World!')

config()
;(async () => {
  await sequelize.authenticate()
  console.log('Connected to database')

  const app = express()
  const port = process.env.PORT || 3002
  app.use(express.json())

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
  })

  app.use('/v1', setupCategoryHexagon(sequelize))

  // CRUDL: Create, Read, Update, Delete, List
  //          POST, GET, PUT/PATCH, DELETE, GET

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
})()

// const app = express()
// const port = process.env.PORT || 3002
// app.use(express.json())

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, World!')
// })

// app.use('/v1', setupCategoryModule())

// // CRUDL: Create, Read, Update, Delete, List
// //          POST, GET, PUT/PATCH, DELETE, GET

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })
