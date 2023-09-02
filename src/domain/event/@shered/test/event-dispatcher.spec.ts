import EventDispatcher from '../event.dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/product-created.event';
import Product from '../../../entity/product';

describe('Domain events tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should register an event handler', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    // ACT
    eventDispatcher.register('AnyEvent', eventHandler);

    // ASSERT
    expect(eventDispatcher.getEventHandlers['AnyEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['AnyEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['AnyEvent'][0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('EventName', eventHandler);

    // ACT
    eventDispatcher.unregister('EventName', eventHandler);

    // ASSERT
    expect(eventDispatcher.getEventHandlers['EventName']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['EventName'].length).toBe(0);
  });

  it('should unregister all event handlers', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('EventName', eventHandler);

    // ACT
    eventDispatcher.unregisterAll();

    // ASSERT
    expect(eventDispatcher.getEventHandlers['EventName']).toBeUndefined();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it('should notify all event handlers', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    const product = new Product('id_1', 'Product 1', 100);
    const productCreatedEvent = new ProductCreatedEvent(product);

    // ACT
    eventDispatcher.notify(productCreatedEvent);

    // ASSERT
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
