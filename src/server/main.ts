import express from 'express'
import bodyParser from 'body-parser'
// @ts-ignore
import { dockStart } from '@nlpjs/basic'

const dock = await dockStart({ use: ['Basic'] })
const nlp = dock.get('nlp')
const texts = [
  { value: 'spłata długu', category: 'loan' },
  { value: 'umowa pożyczki', category: 'loan' },
  { value: 'pożyczka', category: 'loan' },
  { value: 'dług', category: 'loan' },
  { value: 'wierzytelność', category: 'loan' },
  { value: 'wierzyciel', category: 'loan' },
  { value: 'pozew o spłatę długu', category: 'loan' },
  { value: 'istnienie stosunku pracy', category: 'employmentStatus' },
  { value: 'praca', category: 'employmentStatus' },
  { value: 'niewłaściwa umowa o pracę', category: 'employmentStatus' },
  { value: 'umowa o pracę', category: 'employmentStatus' },
  { value: 'umowa o pracę pracodawca', category: 'employmentStatus' },
  { value: 'niewłaściwy stosunek pracy', category: 'employmentStatus' },
  { value: 'obowiązki w pracy', category: 'employmentStatus' },
  {
    value: 'pozew istnientie stosuneku pracy',
    category: 'employmentStatus',
  },
  {
    value: 'ustalenie istnienia stosunku pracy',
    category: 'employmentStatus',
  },
]

nlp.addLanguage('pl')
texts.forEach((text) => {
  nlp.addDocument('pl', text.value, text.category)
})

await nlp.train()

const app = express()
const PORT = 5174

app.use('*', (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/case', bodyParser.json(), async (request, response) => {
  const nlpResponse = await nlp.process('pl', request.body.question)

  response.setHeader('Content-Type', 'application/json')
  response.status(200)
  response.send(JSON.stringify({ case: nlpResponse.intent }))
  response.end()
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
