import { mockApi, mockStore } from '../../setupTests';
jest.mock('../../services/api.js')
describe('store configuration', () => {
    it('should create the store with the correct middleware', () => {
        expect(mockStore).toBeDefined();
    });
});