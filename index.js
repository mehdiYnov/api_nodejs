const express = require("express");
const fs = require("fs");
const app = express();
const wydads = require("./data/wydad.json");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/wydads", (req, res) => {
  res.status(200).json(wydads);
});

// app.get('/wydad/:id', (req, res) =>{
//     const id = parseInt(req.params.id)
//     const wydad = wydads.find(wydad => wydad.id === id)
//     res.status(200).json(wydad)
// })

// app.post("/wydads", (req, res) => {
//     console.log(req.body)
//     wydads.push(req.body)
//     res.status(201).json()
// })

// app.get('/wydads', (req, res ) =>{
//   res.status(200).json(wydads)
// })

// app.put("/wydads/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const wydad = wydads.find((wydad) => wydad.id === id);

//   if (!wydad) {
//     return res.status(404).json({ error: 'Wydad not found' });
// }

//   wydad.matr = req.body.matr;
//   wydad.date = req.body.date;

//   fs.writeFileSync('./data/wydad.json', JSON.stringify(wydads, null, 2));

//   res.status(303).json(wydads);
// });

// app.delete("/wydads/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const wydad = wydads.find((wydad) => wydad.id === id);

//   if (!wydad) {
//     return res.status(404).json({ error: "Wydad not found" });
//   }

//   wydads.splice(wydads.indexOf(wydad), 1);
//   fs.writeFileSync("./data/wydad.json", JSON.stringify(wydads, null, 2));

//   res.status(200).json(wydads);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("looool");
});
