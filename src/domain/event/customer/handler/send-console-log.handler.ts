import EventHandlerInterface from '../../@shered/event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';
import CustomerAddressChangedEvent from '../customer-address-chenged.event';

export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle({ eventData: { id, name, Address } }: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${Address}`);
  }
}
