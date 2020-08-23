import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import Entry from './models/entry'

const app = express()
const router = express.Router()

app.use(cors())
app.use(bodyParser.json())
//Setting up connection to the database via the mongoose library
mongoose.connect('mongodb://localhost:27017/entries')

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB connected')
})

//Router Set-up + Available routes
//Get
router.route('/entries').get((req, res) => {
  Entry.find((err, entries) => {
    if (err) console.log(err)
    else res.json(entries)
  })
})
//Get By ID
router.route('/entries/:id').get((req, res) => {
  Entry.findById(req.params.id, (err, entry) => {
    if (err) console.log(err)
    else res.json(entry)
  })
})
//Post
router.route('/entries/add').post((req, res) => {
  let entry = new Entry(req.body)
  entry
    .save()
    .then((entry) => {
      res.status(200).json({ entry: 'Added successfully' })
    })
    .catch((err) => {
      res.status(400).send('Failed')
    })
})
//Update by ID
router.route('/entries/update/:id').post((req, res) => {
  Entry.findById(req.params.id, (err, entry) => {
    if (!entry) return next(new Error('Error loading document'))
    else {
      entry.number = req.body.number
      entry.ownername = req.body.ownername
      entry
        .save()
        .then((entry) => {
          res.json('Update done')
        })
        .catch((err) => {
          res.status(400).send('Update failed')
        })
    }
  })
})
//Delete by ID
router.route('/entries/delete/:id').get((req, res) => {
  Entry.findByIdAndRemove({ _id: req.params.id }, (err, entry) => {
    if (err) res.json(err)
    else res.json('Removed successfully')
  })
})

app.use('/', router)

app.listen(4000, () => console.log('Express server running - port 4000'))
