import fs from "fs"
import path from "path"

export default (req, res) => {
  
  const boundary = req.headers["content-type"].split("; ")[1].split("=")[1]
  const arr = req.body.split(`--${boundary}`).slice(1, -1)

  let result = {}
  arr.forEach(field => {
    if (field.indexOf("Content-Type") > 0) {
      const index = field.indexOf("\r\n\r\n")
      const fieldKey = field.slice(0, index)
      const fieldContent = field.slice(index + 4, -2)

      const key = fieldKey.trim().split("\r\n")[0].split("; ")[2].split("=")[1].slice(1, -1)
      const dir = path.resolve(__dirname, "../../upload")
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }

      // 写文件
      fs.writeFile(`${dir}/${key}`, fieldContent, (err) => {
        if(err) {
          console.log("write file error", err)
        }
      })
    } else {
      const [unhandleKey, value] = field.trim().split("; ")[1].split("\r\n\r\n")
      const key = unhandleKey.split("=")[1].slice(1, -1)
      result[key] = value
    }
  })

  res.status(200).json({success: "ok"})
};