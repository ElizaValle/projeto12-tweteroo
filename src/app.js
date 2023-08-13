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
    const usuarioCadastrado = users.find((usuario) => usuario.username === username)
    if (!usuarioCadastrado) return res.send("UNAUTHORIZED")

    // salva tweet no array tweets
    tweets.push({ username, tweet })
    res.send("OK")
})


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))