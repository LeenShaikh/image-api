var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import app from '../../app.js';
describe('Image API Endpoint', () => {
    it('should return 200 for valid image params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get('/api/images').query({
            filename: 'palmtunnel.jpg',
            width: 200,
            height: 300,
            format: 'jpg',
        });
        expect(res.status).toBe(200);
    }));
    it('should return 400 for invalid params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/api/images')
            .query({ filename: 'palmtunnel.jpg', width: -10 });
        expect(res.status).toBe(400);
    }));
    it('should return 404 if original image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/api/images')
            .query({ filename: 'nonexistent.jpg' });
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=imageEndpoint.spec.js.map