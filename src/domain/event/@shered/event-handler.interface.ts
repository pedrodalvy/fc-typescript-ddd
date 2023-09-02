import EventInterface from './event.interface';

export default interface EventHandlerInterface<EventType extends EventInterface = EventInterface> {
  handle(event: EventType): void;
}
