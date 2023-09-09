import EventDispatcher from '../event.dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../../product/event/product-created.event';
import Product from '../../../product/entity/product';
import SendConsoleLog1Handler from '../../../customer/event/customer/handler/send-console-log-1.handler';
import SendConsoleLog2Handler from '../../../customer/event/customer/handler/send-console-log-2.handler';
import CustomerCreatedEvent from '../../../customer/event/customer/customer-created.event';
import SendConsoleLogHandler from '../../../customer/event/customer/handler/send-console-log.handler';
import Customer from '../../../customer/entity/customer';
import Address from '../../../customer/value-object/address';
import CustomerAddressChangedEvent from '../../../customer/event/customer/customer-address-chenged.event';

describe('Domain events tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
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

  it('should notify when a customer address is changed', async () => {
    // ARRANGE
    const eventDispatcher = new EventDispatcher();
    const consoleLogHandler = new SendConsoleLogHandler();

    eventDispatcher.register('CustomerAddressChangedEvent', consoleLogHandler);

    jest.spyOn(consoleLogHandler, 'handle');

    const customer = new Customer('id_i', 'John');
    customer.changeAddress(new Address('street', 123, 'zip', 'city'));

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    // ACT
    eventDispatcher.notify(customerAddressChangedEvent);

    // ASSERT
    expect(consoleLogHandler.handle).toHaveBeenCalled();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Endereço do cliente: id_i, John alterado para: street, 123, zip city');
  });
});
