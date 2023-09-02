import EventDispatcherInterface from './event-dispatcher.interface';
import EventInterface from './event.interface';
import EventHandlerInterface from './event-handler.interface';

type EventHandlersType = { [eventName: string]: EventHandlerInterface[] };

export default class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: EventHandlersType = {};

  get getEventHandlers(): EventHandlersType {
    return this._eventHandlers;
  }

  register(eventName: string, handler: EventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(handler);
  }

  unregister(eventName: string, handler: EventHandlerInterface): void {
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(handler);

      if (index !== -1) {
        this._eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach(handler => handler.handle(event));
    }
  }
}
