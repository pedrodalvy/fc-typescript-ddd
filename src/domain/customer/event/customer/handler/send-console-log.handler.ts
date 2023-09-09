import EventHandlerInterface from '../../../../@shared/event/event-handler.interface';
import CustomerAddressChangedEvent from '../customer-address-chenged.event';

export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle({ eventData: { id, name, Address } }: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${Address}`);
  }
}
