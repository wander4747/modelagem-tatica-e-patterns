import Customer from "./entity/customer"
import Address from "./entity/address"
import OrderItem from "./entity/order_item"
import Order from "./entity/order"


let customer = new Customer ("123", "Wander")
const address = new Address("Rua 1", 2, "12345-678", "Minas Gerais")

customer.Address = address
customer.activate()


const item1 = new OrderItem("1", "Item 1", 10, "p1", 1)
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2)

let order = new Order("1", "123", [item1, item2])