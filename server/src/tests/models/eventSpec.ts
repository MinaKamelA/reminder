import EventStore from '../../models/event';
import UserStore from '../../models/user';

const store = new EventStore();
let userId: number = -1;

describe('Event model', () => {
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
    it('should have eventsByUser', () => {
      expect(store.eventsByUser).toBeDefined();
    });
  });
  describe('CRUD functional tests', () => {
    beforeAll(async () => {
      const userStore = new UserStore();
      const user = {
        first_name: 'Test',
        last_name: 'User',
        email: 'm@server.com',
        password: 'test'
      };
      const result = await userStore.create(user);
      userId = result[0].id as number;
    });
    afterAll(async () => {
      const userStore = new UserStore();
      await userStore.delete('1');
    });
    it('should add event when call create', async () => {
      const event = {
        event_name: 'Test',
        event_description: 'description',
        user: userId
      };
      const result = await store.create(event);
      expect(result[0].event_name).toEqual('Test');
    });
    it('should display all events', async () => {
      const result = await store.index();
      expect(result[0].event_name).toEqual('Test');
    });
    it('should display event with id=1', async () => {
      const result = await store.show('1');
      expect(result[0].event_name).toEqual('Test');
    });
    it('should edit event with id=1', async () => {
      const event = {
        id: 1,
        event_name: 'Testnew',
        event_description: 'description',
        user: userId
      };
      const result = await store.edit(event);
      expect(result[0].event_name).toEqual('Testnew');
    });
    it('should get event with id=1 by user', async () => {
      const result = await store.eventsByUser(userId.toString());
      expect(result[0].id).toEqual(1);
    });
    it('should delete event with id=1', async () => {
      const result = await store.delete('1');
      expect(result[0].event_name).toEqual('Testnew');
    });
  });
});
