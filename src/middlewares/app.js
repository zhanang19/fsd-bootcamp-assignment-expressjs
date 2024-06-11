const baseCors = require("cors");

const whitelistOrigins = ["http://localhost:3000"];
const cors = baseCors({
  origin: function (origin, callback) {
    if (whitelistOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }

    callback(null, true);
  },
  credentials: true,
});

module.exports = { cors };
