const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// panggil file response
const response = require("./response");

// panggil root untuk connect database
const db = require("./connection");

app.use(bodyParser.json());

// test konseksi API
app.get("/", (req, res) => {
  response(200, "API v1 Connected", "Succes", res);
});

// melakukan get semau mahasiswa dari backend ke database
app.get("/mahasiswa", (req, res) => {
  const sqlConnect = "select * from tbl_mahasiswa";
  db.query(sqlConnect, (err, fields) => {
    if (err) throw err;
    response(200, fields, `GET semua data mahasiswa`, res);
  });
});

// GET data mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sqlConnect = `select * from tbl_mahasiswa where nim = ${nim}`;
  db.query(sqlConnect, (err, fields) => {
    if (err) throw err;
    response(200, fields, "GET detail mahasiswa ByNIM", res);
  });
});

// melakukan insert data dari backend ke database
app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sqlConnect = `insert into tbl_mahasiswa (nim, nama_lengkap, kelas, alamat) values (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}')`;
  db.query(sqlConnect, (err, fields) => {
    if (err) response(500, "server error", "data tidak bisa di post", res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Berhasil post data", res);
    }
  });
});

// Melakukan update nama mahasiswa dari backend ke database, berdasarkan nim dari tabel mahasiswa
app.put("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sqlConnect = `update tbl_mahasiswa set nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' where nim = ${nim} `;
  db.query(sqlConnect, (err, fields) => {
    if (err) response(500, "invalid", "gagal update data", res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        message: fields.info,
      };
      response(200, data, `Berhasil melakukan update data`, res);
    } else {
      response(404, "data tidak dapat di temukan", "not found", res);
    }
  });
});
app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sqlConnect = `delete from tbl_mahasiswa where nim = ${nim} `;
  db.query(sqlConnect, (err, fields) => {
    if (err) response(500, "invalid", "gagal delete data", res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, `Berhasil melakukan delete data`, res);
    } else {
      response(404, "data tidak dapat di temukan", "not found", res);
    }
  });
});
app.listen(port, () => {
  console.log(`Port sedang berjalan pada ${port}`);
});
