const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const ROOT = __dirname;

app.disable("x-powered-by");
app.use(compression());

const ONE_YEAR = 60 * 60 * 24 * 365;
const ONE_MONTH = 60 * 60 * 24 * 30;
const ONE_HOUR = 60 * 60;

app.use(
  express.static(ROOT, {
    extensions: ["html"],
    setHeaders(res, filePath) {
      const ext = path.extname(filePath).toLowerCase();
      const now = Date.now();
      let maxAge;
      let immutable = false;

      if ([".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".ico", ".mp4", ".webm", ".woff", ".woff2", ".ttf", ".otf"].includes(ext)) {
        maxAge = ONE_YEAR;
        immutable = true;
      } else if ([".css", ".js", ".mjs"].includes(ext)) {
        maxAge = ONE_MONTH;
      } else {
        maxAge = ONE_HOUR;
      }

      res.setHeader(
        "Cache-Control",
        `public, max-age=${maxAge}${immutable ? ", immutable" : ""}`
      );
      res.setHeader("Expires", new Date(now + maxAge * 1000).toUTCString());
    },
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
