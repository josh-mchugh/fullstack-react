import Modash from './Modash';

describe('Modash', () => {
    describe('`truncate()`', () => {
        const string = 'there was one catch, and that was CATCH-22';

        it('truncates a string', () => {
            const expected = 'there was one catch...';
            expect(Modash.truncate(string, 19)).toEqual(expected);
        });

        it('no-ops if <= length', () => {
            expect(Modash.truncate(string, string.length)).toEqual(string);
        });
    });

    describe('`capitalize()`', () => {
        it('captializes first letter, lowercase rest', () => {
            const string = 'there was one catch, and that was CATCH-22';
            const expected = 'There was one catch, and that was catch-22';
            expect(Modash.capitalize(string)).toEqual(expected);
        });
    });

    describe('`camelCase()`', () => {
        it('camelized string with spaces', () => {
            const string = 'customer responded at';
            const expected = 'customerRespondedAt';
            expect(Modash.camelCase(string)).toEqual(expected);
        });

        it('camelizes string with underscores', () => {
            const string = 'customer_responded_at';
            const expected = 'customerRespondedAt';
            expect(Modash.camelCase(string)).toEqual(expected);
        });
    });
});
