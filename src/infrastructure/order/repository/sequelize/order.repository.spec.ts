import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
// import Address from "../../domain/entity/address";
// import Customer from "../../domain/entity/customer";
// import Order from "../../domain/entity/order";
// import OrderItem from "../../domain/entity/order_item";
// import Product from "../../domain/entity/product";
// import CustomerModel from "../db/sequelize/model/customer.model";
// import OrderItemModel from "../db/sequelize/model/order-item.model";
// import OrderModel from "../db/sequelize/model/order.model";
// import ProductModel from "../db/sequelize/model/product.model";
// import CustomerRepository from "./customer.repository";
// import OrderRepository from "./order.repository";
// import ProductRepository from "./product.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
    
        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
    
        const order = new Order("123", "123", [ordemItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
    
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });
    
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    quantity: ordemItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            product.id,
            2,
        );
        const orderItem2 = new OrderItem(
            '2',
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        order.items.push(orderItem2)
       
        await orderRepository.update(order);

        const orderResult = await orderRepository.find('123');

        expect(orderResult.items.length).toBe(2);
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
    
        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );
    
        const order = new Order("22", "123", [ordemItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);
        expect(orderResult).toStrictEqual(order);
    });

    it("should findAll orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
    
        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );

        const ordemItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            1
        );
    
        const orderRepository = new OrderRepository();

        const order = new Order("24", "123", [ordemItem]);
        await orderRepository.create(order);

        const order2 = new Order("25", "123", [ordemItem2]);
        await orderRepository.create(order2);

        const orderResult = await orderRepository.findAll();
        expect(orderResult).toEqual([order, order2]);
    
    })
});