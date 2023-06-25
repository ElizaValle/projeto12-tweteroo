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

    // bônus
    if (!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    users.push({ username, avatar })
    //console.log(users)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    //console.log(req.body)

     // bônus
     if (!username || typeof username !== "string" || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    // para encontrar usuário na lista users[]
    const userExists = users.find((user) => user.username === username)

    if (!userExists) return res.status(401).send("UNAUTHORIZED")

    tweets.push({ username, tweet })
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    // bônus 4
    const page = Number(req.query.page)

    if (req.query.pag && (isNaN(page) || page < 1)) {
        return res.status(400).send("Informe uma página válida!")
    }

    // criação dos tweets completos
    // pegar as informações dos arrays e transformar em outro array com map()
    const completeTweets = tweets.map((tweet) => {
        const user = users.find((u) => u.username === tweet.username)
        return { ...tweet, avatar: user.avatar }
    })

    // paginação
    if (page) {
        const limit = 10
        const start = (page - 1) * limit
        const end = page * limit

        return res.send(completeTweets.slice(start, end))
    }

    res.send(completeTweets.slice(-10))
})

// bônus 3
app.get("/tweets/:username", (req, res) => {
    const { username } = req.params

    const filteredTweets = tweets
        .filter4((tweet) => tweet.username === username)
        .map((tweet) => {
            const user = users.find((u) => u.username === tweet.username)
            return { ...tweet, avatar: user.avatar }
        })

    res.send(filteredTweets)
})




const PORT = 5000
app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`))
