import { validateParams } from '../../middleware/validateParams.js';
describe('validateParams Middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            query: {},
        };
        res = {
            status: jasmine.createSpy().and.returnValue({
                json: jasmine.createSpy(),
            }),
            json: jasmine.createSpy(),
        };
        next = jasmine.createSpy('next');
    });
    // Test cases
    it('should return 400 if filename is missing', () => {
        req.query = {};
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Invalid or missing filename parameter.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should call next() if only filename is provided', () => {
        req.query = { filename: 'palmtunnel.jpg' };
        validateParams(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it('should call next() if all params are valid', () => {
        req.query = {
            filename: 'palmtunnel.jpg',
            width: '200',
            height: '300',
            format: 'jpg',
        };
        validateParams(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    //Width Tests
    it('should return 400 if width is invalid', () => {
        req.query = { filename: 'palmtunnel.jpg', width: '0' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Width must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 if width is negative', () => {
        req.query = { filename: 'palmtunnel.jpg', width: '-100' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Width must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 if width is not a number', () => {
        req.query = { filename: 'palmtunnel.jpg', width: 'leen' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Width must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    //height tests
    it('should return 400 if height is invalid', () => {
        req.query = { filename: 'palmtunnel.jpg', height: '0' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Height must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 if height is negative', () => {
        req.query = { filename: 'palmtunnel.jpg', height: '-100' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Height must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 if height is not a number', () => {
        req.query = { filename: 'palmtunnel.jpg', height: 'leen' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Height must be a positive integer not exceeding 2000.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 if format is invalid', () => {
        req.query = { filename: 'palmtunnel.jpg', format: 'leen' };
        validateParams(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status.calls.mostRecent().returnValue.json).toHaveBeenCalledWith({ error: 'Format must be one of the following: jpg, jpeg, png, bmp, tiff, gif.' });
        expect(next).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=validateParams.spec.js.map