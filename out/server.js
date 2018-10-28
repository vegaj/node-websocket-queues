"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require('./config/config');
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var fs = __importStar(require("fs"));
var app = express_1.default();
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
if (!fs.existsSync(path_1.default.resolve(__dirname, "./data/data.json"))) {
    fs.writeFileSync(path_1.default.resolve(__dirname, "./data/data.json"), "{}");
}
var server = http_1.default.createServer(app);
module.exports.io = socket_io_1.default(server);
require('./sockets/main');
var port = process.env.PORT;
server.listen(port, function (err) {
    if (err)
        throw err;
    console.log("Listening at port " + port);
});
