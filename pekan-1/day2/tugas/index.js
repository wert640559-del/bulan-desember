import http from 'http'
import { miya } from './hero/miya.js'
import { balmond } from './hero/balmond.js'
import { alice } from './hero/alice.js'
import { nana } from './hero/nana.js'
import { saber } from './hero/saber.js'
import { tigreal } from './hero/tigreal.js'
import { alucard } from './hero/alucard.js'
import { heroes } from './hero/heroes.js'


const server = http.createServer((req, res) => {
    const url = req.url
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    switch (url) {
        case '/heroes':
            res.write(JSON.stringify(heroes))
            break
        case '/heroes/miya': 
            res.write(JSON.stringify(miya))
            break
        case '/heroes/balmond':
            res.write(JSON.stringify(balmond))
            break
        case '/heroes/saber':
            res.write(JSON.stringify(saber))
            break
        case '/heroes/alice':
            res.write(JSON.stringify(alice))
            break
        case '/heroes/nana':
            res.write(JSON.stringify(nana))
            break
        case '/heroes/tigreal':
            res.write(JSON.stringify(tigreal))
            break
        case '/heroes/alucard':
            res.write(JSON.stringify(alucard))
            break
        case '/heroes/saber':
            res.write(JSON.stringify(saber))
            break
        case '/heroes/saber':
            res.write(JSON.stringify(saber))
            break
        case '/heroes/saber':
            res.write(JSON.stringify(saber))
            break
        default:
            res.write('Page Not Found')
            break
    }
    res.end()
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
