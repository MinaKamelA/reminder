import EventStore from '../../models/event';
import UserStore from '../../models/user';

const store = new EventStore();
let userId: number = -1;
let eventId: number = -1;

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
      await userStore.delete(userId.toString());
    });
    it('should add event when call create', async () => {
      const event = {
        event_name: 'Test',
        event_description: 'description',
        user: userId
      };
      const result = await store.create(event);
      eventId = result[0].id as number;
      expect(result[0].event_name).toEqual('Test');
    });
    it('should display all events', async () => {
      const result = await store.index();
      expect(result[0].event_name).toEqual('Test');
    });
    it('should display event with id', async () => {
      const result = await store.show(eventId.toString());
      expect(result[0].event_name).toEqual('Test');
    });
    it('should edit event with id', async () => {
      const event = {
        id: eventId,
        event_name: 'Testnew',
        event_description: 'description',
        user: userId
      };
      const result = await store.edit(event);
      expect(result[0].event_name).toEqual('Testnew');
    });
    it('should get event by user', async () => {
      const result = await store.eventsByUser(userId.toString());
      expect(result[0].id).toEqual(eventId);
    });
    it('should delete event with id', async () => {
      const result = await store.delete(eventId.toString());
      expect(result[0].event_name).toEqual('Testnew');
    });
  });
});
