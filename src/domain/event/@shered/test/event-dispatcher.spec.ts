import EventDispatcher from '../event.dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/product-created.event';
import Product from '../../../entity/product';
import SendConsoleLog1Handler from '../../customer/handler/send-console-log-1.handler';
import SendConsoleLog2Handler from '../../customer/handler/send-console-log-2.handler';
import CustomerCreatedEvent from '../../customer/customer-created.event';

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

  it('should notify when a customer is created', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const consoleLog1Handler = new SendConsoleLog1Handler();
    const consoleLog2Handler = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', consoleLog1Handler);
    eventDispatcher.register('CustomerCreatedEvent', consoleLog2Handler);

    jest.spyOn(consoleLog1Handler, 'handle');
    jest.spyOn(consoleLog2Handler, 'handle');

    const customerCreatedEvent = new CustomerCreatedEvent({});

    // ACT
    eventDispatcher.notify(customerCreatedEvent);

    // ASSERT
    expect(consoleLog1Handler.handle).toHaveBeenCalled();
    expect(consoleLog2Handler.handle).toHaveBeenCalled();

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenNthCalledWith(1, 'Esse é o primeiro console.log do evento: CustomerCreatedEvent');
    expect(console.log).toHaveBeenNthCalledWith(2, 'Esse é o segundo console.log do evento: CustomerCreatedEvent');
  });
});
