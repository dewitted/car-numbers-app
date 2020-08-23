import express from 'express'

const app = express()
app.get('/', (req, res) => res.send('BackEnd Works!'))
app.listen(4000, () => console.log('Express server running - port 4000'))
