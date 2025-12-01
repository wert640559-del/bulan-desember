import http from 'http'
import { hello } from './hello.js'
import moment from 'moment'

// const server = http.createServer((req, res) => {  // ada createServer dan listen
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')   //gunakan application/json untuk menampilkan bentuk json
//     res.write('Hello World!')   // ini kontennya dia akan menampilkan Hello World tapi dalam json, bentuknya adalah object
//     res.end()   // ini untuk mengakhiri reponse
// })
// .listen(3000)

// const server = http.createServer((req, res) => {  // ada createServer dan listen
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')   //gunakan application/json untuk menampilkan bentuk json
//     res.write(moment().calendar())   // ini kontennya dia akan menampilkan Hello World tapi dalam json, bentuknya adalah object
//     res.end()   // ini untuk mengakhiri reponse
// })

const server = http.createServer((req, res) => {  // ada createServer dan listen
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')   //gunakan application/json untuk menampilkan bentuk json
    res.write(JSON.stringify({
        status: 'success',
        data: {
            message: hello,
            time: moment().calendar()
        }
    }))   // ini kontennya dia akan menampilkan Hello World tapi dalam json, bentuknya adalah object
    res.end()   // ini untuk mengakhiri reponse
})

// const server = http.createServer((req, res) => {  // ada createServer dan listen
//     const url = req.url
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'application/json')   //gunakan application/json untuk menampilkan bentuk json   // ini kontennya dia akan menampilkan Hello World tapi dalam json, bentuknya adalah object
//     // if (url === '/ucup') {
//     //     res.write('Muhammad Yusuf Ramadhani')
//     // } else if (url === '/zidan') {
//     //     res.write('Zidan Albani')
//     // } else {
//     //     res.write('Page Not Found')
    
//     // }
//     switch (url) {
//         case '/ucup':
//             res.write('Muhammad Yusuf Ramadhani')
//             break
//     }
//     res.end()   // ini untuk mengakhiri reponse
// })

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {                     // disini hanya ada 1 argumen, semua console.log dijalankan dalam 1 argumen
    console.log(`Server running at ${hostname}: ${port} on ${moment().calendar()}`)
    // console.log('woii')
    // console.log('haii')
})

// server.listen(
//     port, 
//     hostname, 
//     console.log(`Server running at http://${hostname}:${port}`),  // sedangkan yang ini ada 3 argumen console.log 
//     console.log('woii'), 
//     console.log('haii')
// )