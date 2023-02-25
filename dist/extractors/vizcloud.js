"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
class VizCloud extends models_1.VideoExtractor {
    constructor() {
        super(...arguments);
        this.serverName = 'VizCloud';
        this.sources = [];
        this.host = 'https://vidstream.pro';
        this.keys = {
            cipher: '',
            encrypt: '',
            main: '',
            operations: new Map(),
            pre: [],
            post: [],
        };
        this.extract = async (videoUrl, vizCloudHelper) => {
            var _a;
            const vizID = videoUrl.href.split("/");
            let url;
            if (!vizID.length) {
                throw new Error('Video not found');
            }
            else {
                url = `${vizCloudHelper}/vizcloud?query=${vizID.pop()}`;
            }
            const { data } = await axios_1.default.get(url);
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.media))
                throw new Error('Video not found');
            this.sources = [
                ...this.sources,
                ...data.data.media.sources.map((source) => {
                    var _a;
                    return ({
                        url: source.file,
                        isM3U8: (_a = source.file) === null || _a === void 0 ? void 0 : _a.includes('.m3u8'),
                    });
                }),
            ];
            return this.sources;
        };
    }
}
exports.default = VizCloud;
//# sourceMappingURL=vizcloud.js.map