import PeriodStore from '../../models/period';
import UserStore from '../../models/user';
import EventStore from '../../models/event';
import OptionStore from '../../models/option';

const store = new PeriodStore();
let userId: number = -1;
let eventId: number = -1;
let optionId: number = -1;
let periodId: number = -1;

describe('Period model', () => {
  describe('Structural Days', () => {
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
    it('should have periodsByOption', () => {
      expect(store.periodsByOption).toBeDefined();
    });
  });
  describe('CRUD functional Days', () => {
    beforeAll(async () => {
      const userStore = new UserStore();
      const user = {
        first_name: 'Day',
        last_name: 'User',
        email: 'm@server.com',
        password: 'Day'
      };
      const result = await userStore.create(user);
      userId = result[0].id as number;
      const eventStore = new EventStore();
      const event = {
        event_name: 'Day',
        event_description: 'description',
        user: userId
      };
      const eResult = await eventStore.create(event);
      eventId = eResult[0].id as number;
      const optionStore = new OptionStore();
      const option = {
        option_name: 'Day',
        option_description: 'description',
        periodic: false,
        event: eventId
      };
      const oResult = await optionStore.create(option);
      optionId = oResult[0].id as number;
    });
    afterAll(async () => {
      const optionStore = new OptionStore();
      await optionStore.delete(optionId.toString());
      const eventStore = new EventStore();
      await eventStore.delete(eventId.toString());
      const userStore = new UserStore();
      await userStore.delete(userId.toString());
    });
    it('should add period when call create', async () => {
      const period = {
        interval: 'Day',
        every: 30,
        option: optionId
      };
      const result = await store.create(period);
      periodId = result[0].id as number;
      expect(result[0].interval).toEqual('Day');
    });
    it('should display all periods', async () => {
      const result = await store.index();
      expect(result[0].interval).toEqual('Day');
    });
    it('should display period with id', async () => {
      const result = await store.show(periodId.toString());
      expect(result[0].interval).toEqual('Day');
    });
    it('should edit option with id', async () => {
      const period = {
        id: periodId,
        interval: 'Month',
        every: 30,
        option: optionId
      };
      const result = await store.edit(period);
      expect(result[0].interval).toEqual('Month');
    });
    it('should get periods by option', async () => {
      const result = await store.periodsByOption(optionId.toString());
      expect(result[0].interval).toEqual('Month');
    });
    it('should delete period with id', async () => {
      const result = await store.delete(periodId.toString());
      expect(result[0].interval).toEqual('Month');
    });
  });
});
