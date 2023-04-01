import express from 'express'

const app = express()
app.use('/', (req, res)=> {
    res.send("pawpaw")
})

app.listen(3001, () => {
    console.log("Server connected")
})