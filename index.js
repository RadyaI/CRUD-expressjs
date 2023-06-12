const express = require('express')
const app = express()
const port = 3000
const parser = require('body-parser')
const DB = require('./connection')
const response = require('./response')

app.use(parser.json())

app.get('/getMahasiswa', (req, res) => {
    DB.query("SELECT * FROM mahasiswa", (error, result) => {
        // Hasilnya
        if (error) {
            response(500, error, "Kayaknya ada yang error cuy", res)
        }
        if (result == '') {
            response(404, error, "Datanya Kayaknya ga ada deh", res)
        } else {
            response(200, result, "Get All Mahasiswa Data", res)
        }
    })
})

app.get('/getMahasiswa/:nim', (req, res) => {
    DB.query(`SELECT nama_siswa FROM mahasiswa WHERE nim = ${req.params.nim}`, (error, result) => {
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

app.post('/createMahasiswa', (req, res) => {
    const { nim, nama_siswa, alamat, kelas } = req.body
    console.log(req.body)
    const query = `INSERT INTO mahasiswa (nim, nama_siswa, alamat, kelas) VALUES (${nim}, '${nama_siswa}', '${alamat}', '${kelas}')`
    DB.query(query, (err, result) => {
        console.log(result)
        if (result) {
            response(200, "WOW", "Berhasil ini mah", res)
        } else if (err) {
            res.send(422, err)
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
