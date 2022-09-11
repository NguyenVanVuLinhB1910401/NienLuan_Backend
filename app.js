const express = require('express')
const authNhanVienRouter = require("./app/routes/authNhanVien.route");
// const userRouter = require("./app/routes/user.route");
// const productRouter = require("./app/routes/product.route");
// const authRouter = require("./app/routes/auth.route");
const ApiError = require("./app/api-error");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin: [
        "http://localhost:3001",
        "http://localhost:3000",
      ],
    credentials: true,
    // exposedHeaders: ["set-cookie"],
  }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static(__dirname+"/app/uploads"));

app.use("/api", authNhanVienRouter);
// app.use("/api", productRouter);
// app.use("/api", authRouter);


// handle 404 response
app.use((req, res, next) => {
    // Code o day se chay khi khong co route duoc dinh nghia nao khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
    });
});
    
module.exports = app;