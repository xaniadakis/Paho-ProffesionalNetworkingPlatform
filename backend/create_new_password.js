const bcrypt = require("bcrypt");

bcrypt.hash("atha1234", 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    console.log("hash "+hash)
})

