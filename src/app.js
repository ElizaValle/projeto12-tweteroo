import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

// variáveis globais
const users = []
const tweets = []

// endpoints
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    users.push({ username, avatar })
    console.log(users)
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    console.log(req.body)

    // para encontrar usuário na lista users[]
    const userExists = users.find((user) => user.username === username)

    if (!userExists) return res.send("UNAUTHORIZED")

    tweets.push({ username, tweet })
    res.send("OK")
})



const PORT = 5000
app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`))
