import EventHandlerInterface from "../../event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
    handle(event: ProductCreatedEvent): void {
        console.log(`sending email to ...`)
    }
}
