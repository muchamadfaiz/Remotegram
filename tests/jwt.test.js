import jwt from 'jsonwebtoken'
import { verifyToken } from '../api/middlewares/jwt.js'

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
});