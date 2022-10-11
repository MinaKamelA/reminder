import UserStore from '../../models/user';

const store = new UserStore();
let userId: number = -1;
describe('User model', () => {
  describe('Structural tests', () => {
    it('should have index', () => {
      expect(store.index).toBeDefined();
    });
    it('should have show', () => {
      expect(store.show).toBeDefined();
    });
    it('should have create', () => {
      expect(store.create).toBeDefined();
    });
    it('should have delete', () => {
      expect(store.delete).toBeDefined();
    });
    it('should have edit', () => {
      expect(store.edit).toBeDefined();
    });
    it('should have login', () => {
      expect(store.login).toBeDefined();
    });
  });
  describe('CRUD functional tests', () => {
    it('should add user when call create', async () => {
      const user = {
        first_name: 'Test',
        last_name: 'User',
        email: 'm@server.com',
        password: 'test'
      };
      const result = await store.create(user);
      userId = result[0].id as number;
      expect(result[0].first_name).toEqual('Test');
    });
    it('should display all users', async () => {
      const result = await store.index();
      expect(result[0].first_name).toEqual('Test');
    });
    it('should display user with id', async () => {
      const result = await store.show(userId.toString());
      expect(result[0].first_name).toEqual('Test');
    });
    it('should edit user with id', async () => {
      const user = {
        id: userId,
        first_name: 'Testnew',
        last_name: 'User',
        email: 'm@server.com',
        password: 'test'
      };
      const result = await store.edit(user);
      expect(result[0].first_name).toEqual('Testnew');
    });
    it('should login user with correct Credentials', async () => {
      const result = await store.login('m@server.com', 'test');
      expect(result).toEqual({ id: userId, email: 'm@server.com' });
    });
    it('should throw error when login with incorrect Credentials', async () => {
      await expectAsync(store.login('m', 'test')).toBeRejectedWithError();
    });
    it('should delete user with id', async () => {
      const result = await store.delete(userId.toString());
      expect(result[0].first_name).toEqual('Testnew');
    });
  });
});
