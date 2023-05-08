import jwt from 'jsonwebtoken'
import { verifyToken } from '../api/middlewares/jwt.js'
import dotenv from 'dotenv';

dotenv.config();

describe('JWT Middleware - verifyToken', () => {
    it('should call next with an error if if no token is provided', () => {
        // siapkan header otorisasi kosong
        const req = {
            headers: {
                authorization: '',
            },
            cookies: {
                accessToken: '',
            },
        };
        const res = {}
        const next = jest.fn()

        verifyToken(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'You are not authenticated' }))
    })

    it('should call next with an error if the token is invalid', () => {
        const invalidToken = 'invalid_token';
        const req = {
            cookies: {
                accessToken: invalidToken,
            },
        };
        const res = {};
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Token is not valid!' }));
    })

    it('should call next with an error if the token is valid but expired', () => {
        const expiredToken = jwt.sign({ id: '123' }, process.env.JWT_KEY, { expiresIn: '-10s' });
        const req = {
            cookies: {
                accessToken: expiredToken,
            },
        };
        const res = {};
        const next = jest.fn();
    
        verifyToken(req, res, next);
    
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Token expired' }));
    })

    it("should call next with an error if the token is valid but contains an unexpected or wrong payload", () => {
        // Create a valid JWT with a wrong payload
        const wrongPayload = {
            invalidProp: "some_value",
        };
        const validTokenWithWrongPayload = jwt.sign(wrongPayload, process.env.JWT_KEY, { expiresIn: '1h' });
    
        const req = {
            cookies: {
                accessToken: validTokenWithWrongPayload,
            },
        };
        const res = {};
        const next = jest.fn();
    
        verifyToken(req, res, next);
    
        // Check if next has been called with an error
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: "Invalid token payload" }));
    });

    it("should successfully call next if the token is valid and contains the expected payload", () => {
        const validPayload = {
            id: 1,
            isSeller: false,
            username: "testuser",
        };

        const validToken = jwt.sign(validPayload, process.env.JWT_KEY, { expiresIn: '1h' });

        const req = {
            cookies: {
                accessToken: validToken,
            },
        };
        const res = {};
        const next = jest.fn();

        verifyToken(req, res, next);

        // Check if next has been called without an error
        expect(next).toHaveBeenCalledWith();

        // Check if the expected payload values are set in the req object
        expect(req.user_id).toBe(validPayload.id);
        expect(req.isSeller).toBe(validPayload.isSeller);
        expect(req.username).toBe(validPayload.username);
    });
    
});