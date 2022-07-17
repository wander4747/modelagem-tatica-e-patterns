import EventHandlerInterface from "../../event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class SendConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        const address = `${event.eventData.Address._street} ${event.eventData.Address._number} ${event.eventData.Address._zip} ${event.eventData.Address._city}`
        console.log(`customer address: ${event.eventData.id}, ${event.eventData.name} changed to: ${address}`);
    }
}