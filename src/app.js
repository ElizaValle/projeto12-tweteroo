import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    // salva usuário no array users
    users.push({ username, avatar })
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body

    // verifica se usuário está cadastrado comparando username do tweet com username da conta
    if (!users.some(user => user.username === username)) return res.send("UNAUTHORIZED")

    // salva tweet no array tweets
    tweets.push({ username, tweet })
    res.send("OK")
})

app.get("/tweets", (req, res) => {
    // retorna os 10 últimos tweets publicados
    const last10Tweets = tweets.slice(-10).map(tweet => ({
        username: tweet.username,
        avatar: users.find(user => user.username === tweet.username)?.avatar || null,
        tweet: tweet.tweet
    }))

    res.json(last10Tweets) 
})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))