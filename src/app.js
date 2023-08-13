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


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))