const server = require("./api/server.js");
const accountRoutes = require('./accounts/accountRouter')

const PORT = process.env.PORT || 5000;

server.use('/api/accounts', accountRoutes)

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Somethings wrong",
  })
})

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
