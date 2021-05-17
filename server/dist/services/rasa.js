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
exports.getRASACharts = exports.getRasaHistory = exports.RASARequest = void 0;
const mongodb_1 = require("mongodb");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config = __importStar(require("../config"));
const RASARequest = async (message, sender, metadata) => {
    let data;
    if (metadata) {
        data = { message: message, sender: sender, metadata: metadata };
    }
    else {
        data = { message: message, sender: sender };
    }
    const response = await node_fetch_1.default(`${config.RASA_URL}/webhooks/rest/webhook`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const reply = await response.json();
    if (reply) {
        return reply;
    }
    else {
        return {};
    }
};
exports.RASARequest = RASARequest;
const getRasaHistory = async (username) => {
    const db = await mongodb_1.MongoClient.connect(config.MONGO_URL);
    try {
        const result = await db.db('rasa').collection('conversations').findOne({ sender_id: username });
        const filteredEvents = [];
        let interEvents = {};
        for (const event of result.events) {
            if (event.event == 'user') {
                interEvents = {
                    text: event.text,
                    intent: event.parse_data.intent.name,
                    entities: event.parse_data.entities,
                    message_time: new Date(event.timestamp * 1000)
                };
            }
            if (event.event == 'bot') {
                interEvents = {
                    ...interEvents,
                    reply: event.text,
                    reply_time: new Date(event.timestamp * 1000)
                };
                filteredEvents.push(interEvents);
                interEvents = {};
            }
        }
        return filteredEvents;
    }
    catch {
        return [];
    }
};
exports.getRasaHistory = getRasaHistory;
const getRASACharts = async (username) => {
    const db = await mongodb_1.MongoClient.connect(config.MONGO_URL);
    const result = await db.db('rasa').collection('conversations').findOne({ sender_id: username });
    const exclude = [
        'slot',
        'session_started',
        'action_session_start',
        'action_listen',
        'action_restart',
        'action',
        'bot'
    ];
    const filteredEvents = [];
    for (const event of result.events) {
        if (event.event == 'user' && !exclude.includes(event.name)) {
            for (const entity of event.parse_data.entities) {
                if (entity.entity === 'emotion') {
                    filteredEvents.push({
                        time: new Date(event.timestamp),
                        emotion: entity.value
                    });
                }
            }
        }
    }
    return filteredEvents;
};
exports.getRASACharts = getRASACharts;
//# sourceMappingURL=rasa.js.map