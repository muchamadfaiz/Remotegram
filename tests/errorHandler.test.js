import { createError } from "../api/utils/createError.js"

describe('createError', () => {
    it('should create an error object with the given status and message', () => {
        const status = 404;
        const message = 'Not found';
        const error = createError(status, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
    });
});

