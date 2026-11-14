// Builds dist/index.html: one self-contained file (libraries inlined) that any static host can serve.
const fs = require("fs"), path = require("path");
const read = p => fs.readFileSync(path.join(__dirname, p), "utf8");
const libs = ["node_modules/mqtt/dist/mqtt.min.js", "node_modules/qrcode-generator/dist/qrcode.js", "node_modules/jszip/dist/jszip.min.js"];
const vendor = libs.map(p => "<script>" + read(p).replace(/<\/script/gi, "<\\/script") + "</script>").join("\n");
const html = read("src/index.html").replace("<!--VENDOR-->", () => vendor);
fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "dist/index.html"), html);
console.log("dist/index.html", (html.length / 1024).toFixed(0) + " KB");
