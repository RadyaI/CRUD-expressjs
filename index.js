const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcryptjs')
const saltRounds = 10
const parser = require('body-parser')
const DB = require('./connection')
const cors = require('cors')
const response = require('./response')

app.use(parser.json())
app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}))



app.get('/getuser', (req, res) => {
    const query = `SELECT * FROM users`
    DB.query(query, (error, result) => {
        if (error) {
            response(500, error, "Internal Server Error", res)
        } else if (result == '') {
            response(404, error, "Data Not Found", res)
        } else {
            response(200, result, "Get All User Data", res)
        }
    })
})


app.get('/getuser/:id', (req, res) => {
    DB.query(`SELECT name FROM users WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            response(500, error, "Ada yang error coy", res)
        }
        if (result == '') {
            response(404, error, "Hmm data nya gk ada coy", res)
        } else {
            response(200, result, "Find Mahasiswa By ID", res)
        }
    })
})

app.post('/createUser', (req, res) => {
    const { name, email, password, level } = req.body
    console.log(req.body)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            response(500, "No", "Failed Hash", res)
        } else {
            const query = `INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)`
            DB.query(query, [name, email, hash, level], (err, result) => {
                console.log(result)
                if (result) {
                    response(200, "WOW", "Berhasil ini mah", res)
                } else if (err) {
                    res.send(422, err)
                }
            })
        }
    })
})

app.put('/updateMahasiswa/:nim', (req, res) => {
    const { nama_siswa, alamat, kelas } = req.body
    const query = `UPDATE mahasiswa SET nim = ${req.params.nim}, nama_siswa = '${nama_siswa}', alamat = '${alamat}', kelas = '${kelas}' WHERE nim = ${req.params.nim}`
    DB.query(query, (error, result) => {
        if (result) {
            response(200, "ok", "Berhasil Update Mahasiswa", res)
        } else {
            response(500, error, "Failed Update Mahasiswa", res)
        }
    })
})

app.delete('/deleteMahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const query = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    DB.query(query, (error, result) => {
        if (result) {
            response(200, "Berhasil GK SEh", "Berhasil ternyata coy", res)
        } else if (error) {
            res.send(500, error)
        }
    })
})

app.get('/getDosen', (req, res) => {
    DB.query("SELECT * FROM dosen", (error, result) => {
        response(200, result, "Get All Data From Dosen", res)
    })
})

app.get('/getDosen/:id', (req, res) => {
    DB.query(`SELECT nama_dosen FROM dosen where id_dosen = ${req.params.id}`, (error, result) => {
        if (error) {
            response(500, error, "Ada Yang error kayaknya", res)
        }
        if (result == '') {
            response(404, error, "DataNya Mana?", res)
        } else {
            response(200, result, "Find Dosen By ID", res)
        }
    })
})

app.post('/createDosen', (req, res) => {
    const { nama_dosen, alamat } = req.body
    const query = `INSERT INTO dosen (nama_dosen, alamat) VALUES ('${nama_dosen}', '${alamat}')`

    DB.query(query, (error, result) => {
        if (error) {
            response(500, error, "Waduh", res)
        } else if (result) {
            response(200, req.body, "Yee Berhasil", res)
        }
    })
})

app.put('/updateDosen/:id', (req, res) => {
    const { nama_dosen, alamat } = req.body
    const query = `UPDATE dosen SET nama_dosen = '${nama_dosen}', alamat = '${alamat}' WHERE id_dosen = ${req.params.id}`

    DB.query(query, (error, result) => {
        if (error) {
            response(500, error, "Failed UpdateDosen", res)
        } else if (result) {
            response(200, "OK", "Berhasil Update Dosen", res)
        }
    })
})

app.delete('/deleteDosen/:id', (req, res) => {
    DB.query(`DELETE FROM dosen WHERE id_dosen = ${req.params.id}`, (err, result) => {
        if (err) throw err
        if (result) {
            response(200, result, "Berhasil Delete Dosen", res)
        }
    })
})

app.post('/insert', (req, res) => {
    res.send("Ini halaman untuk request")
    console.log({ DataFromOutSide: req.body })
})

app.post('/getuser', (req, res) => {
    res.send({ DataNya: req.query })
    console.log({ userData: req.query })
})

app.post('/login', (req, res) => {
    console.log({ requestFromOutSide: req.body })
    // Kalo ini buat ngambil request-an dari body 
    res.send('Berhasil login cuyyyy')
})


app.listen(port, () => {
    console.log(`Aplikasi sedang berjalan di port ${port}`)
})
