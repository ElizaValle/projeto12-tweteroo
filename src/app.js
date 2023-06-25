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

app.get("/tweets", (req, res) => {
    // criação dos tweets completos
    // pegar as informações dos arrays e transformar em outro array com map()
    const completeTweets = tweets.map((tweet) => {
        const user = users.find((u) => u.username === tweet.username)
        return { ...tweet, avatar: user.avatar }
    })
    res.send(completeTweets.slice(-10))
})



const PORT = 5000
app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`))
