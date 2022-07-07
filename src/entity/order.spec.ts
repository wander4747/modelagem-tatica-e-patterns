import Order from "./order"
import OrderItem from "./order_item"


describe("Order unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() =>{
            new Order("", "", [])
        }).toThrowError("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() =>{
            new Order("123", "", [])
        }).toThrowError("CustomerId is required")
    })

    it("should throw error when items is empty", () => {
        expect(() =>{
            new Order("123", "123", [])
        }).toThrowError("Items are required")
    })

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 100)
        const item2 = new OrderItem("2", "Item 2", 150)

        const order = new Order("1", "123", [item1, item2])

        expect(order.total()).toBe(250);
    })
})
