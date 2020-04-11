const genarateUniqueId = require('../../src/Utils/genarateUniqueId');

describe('Generate Unique ID', () => {
    
    it('should generate an unique ID', () => {
        const id = genarateUniqueId();

        expect(id).toHaveLength(8);
    });
});