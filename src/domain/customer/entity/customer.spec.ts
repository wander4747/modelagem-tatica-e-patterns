import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() =>{
            let customer = new Customer("", "Wander")
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() =>{
            let customer = new Customer("123", "")
        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("123", "Wander")
        customer.changeName("Wander Douglas")

        expect(customer.name).toBe("Wander Douglas")
    })

    it("should activate customer", () => {
        const customer = new Customer("123", "Wander")
        const address = new Address("Rua 1", 2, "12345-678", "Minas Gerais")

        customer.Address = address
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it("should deactivate customer", () => {
        const customer = new Customer("123", "Wander")

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it("should throw error when address is undefined you activate a customer", () => {
        expect(() =>{
            const customer = new Customer("123", "Wander")
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
    
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
    
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
})