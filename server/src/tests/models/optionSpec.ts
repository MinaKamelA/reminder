import OptionStore from '../../models/option';
import UserStore from '../../models/user';
import EventStore from '../../models/event';

const store = new OptionStore();
let userId: number = -1;
let eventId: number = -1;
let optionId: number = -1;

describe('Option model', () => {
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
    it('should have optionsByEvent', () => {
      expect(store.optionsByEvent).toBeDefined();
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
      const eventStore = new EventStore();
      const event = {
        event_name: 'Test',
        event_description: 'description',
        user: userId
      };
      const eResult = await eventStore.create(event);
      eventId = eResult[0].id as number;
    });
    afterAll(async () => {
      const eventStore = new EventStore();
      await eventStore.delete(eventId.toString());
      const userStore = new UserStore();
      await userStore.delete(userId.toString());
    });
    it('should add option when call create', async () => {
      const option = {
        option_name: 'Test',
        option_description: 'description',
        periodic: false,
        event: eventId
      };
      const result = await store.create(option);
      optionId = result[0].id as number;
      expect(result[0].option_name).toEqual('Test');
    });
    it('should display all options', async () => {
      const result = await store.index();
      expect(result[0].option_name).toEqual('Test');
    });
    it('should display option with id', async () => {
      const result = await store.show(optionId.toString());
      expect(result[0].option_name).toEqual('Test');
    });
    it('should edit option with id', async () => {
      const option = {
        id: optionId,
        option_name: 'Testnew',
        option_description: 'description',
        periodic: false,
        event: eventId
      };
      const result = await store.edit(option);
      expect(result[0].option_name).toEqual('Testnew');
    });
    it('should get option by event', async () => {
      const result = await store.optionsByEvent(eventId.toString());
      expect(result[0].option_name).toEqual('Testnew');
    });
    it('should delete option with id', async () => {
      const result = await store.delete(optionId.toString());
      expect(result[0].option_name).toEqual('Testnew');
    });
  });
});
