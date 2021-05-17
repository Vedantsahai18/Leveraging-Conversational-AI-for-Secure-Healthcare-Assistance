"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const vault_1 = require("./services/vault");
const config = __importStar(require("./config"));
const Passport_1 = __importDefault(require("./services/Passport"));
const passport_1 = __importDefault(require("passport"));
const Mongo = __importStar(require("./services/mongo"));
async function App() {
    const app = express_1.default();
    app.use(express_1.default.static('./public'));
    app.set('views', './views');
    app.set('view engine', 'ejs');
    app.engine('.html', require('ejs').renderFile);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(cors_1.default());
    app.use(connect_flash_1.default());
    await Mongo.Connect();
    if (Mongo.client != null)
        app.use(express_session_1.default({
            store: connect_mongo_1.default.create({ client: Mongo.client, dbName: 'session-db' }),
            secret: config.SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    await Passport_1.default();
    app.use('/', routes_1.default);
    app.get('/dashboard', (_req, res) => {
        res.render('dashboard.html');
    });
    await vault_1.Vault.Setup();
    return app;
}
App()
    .then(app => {
    app.listen(config.PORT, function () {
        console.log(`App listening on port ${config.PORT}`);
    });
})
    .catch(err => console.error(err));
//# sourceMappingURL=server.js.map