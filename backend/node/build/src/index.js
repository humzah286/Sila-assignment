"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "You hit the home route" });
});
app.use('/api', index_1.default);
app.listen(port, () => {
    console.log(`Listening on PORT : ${port}`);
});
