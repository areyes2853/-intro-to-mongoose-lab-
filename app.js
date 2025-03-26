/*------------------------------- Starter Code -------------------------------*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const prompt = require('prompt-sync')();
const Customer = require('./models/customer')

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await mainMenu()
    
  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
};


connect()
/*------------------------------ Query Functions -----------------------------*/

//functioins that will handle the calls of delete, update and create
const createCustomer = async () =>{
    const name = prompt('Enter customer name: ');
    const age = parseInt(prompt('Enter customer age: '));

    const customer = new Customer({ name, age });
    await customer.save();
    console.log('Customer created successfully.');

}

const viewCustomers = async ()=>{
    const customers = await Customer.find();
    if (customers.length === 0) {
        console.log('No customers found.');
    } else {
        customers.forEach(customer => {
            console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
        });
    }

}

const updateCustomer = async ()=>{
    const customers = await Customer.find();
    if (customers.length === 0) {
        console.log('No customers found.');
        return;
    }

    customers.forEach(customer => {
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
    });

    const id = prompt('Enter the ID of the customer to update: ');
    const customer = await Customer.findById(id);

    if (!customer) {
        console.log('Customer not found.');
        mainMenu();
        return;
    }

    const name = prompt(`Enter new name (${customer.name}): `) || customer.name;
    const age = parseInt(prompt(`Enter new age (${customer.age}): `)) || customer.age;

    await Customer.findByIdAndUpdate(id, { name, age });
    console.log('Customer updated successfully.');
    mainMenu();


}

const deleteCustomer = async ()=>{
    const customers = await Customer.find();
    if (customers.length === 0) {
        console.log('No customers found.');
        return;
    }

    customers.forEach(customer => {
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
    });

    const id = prompt('Enter the ID of the customer to delete: ');
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
        console.log('Customer not found.');
        return;
    }

    console.log('Customer deleted successfully.');

}
 // The functions calls to run queries in our db will go here as we write them.

 const mainMenu = async () => {
    let exit = false;
    while (!exit) {
      console.log(`\nHello, this is a Customer Relationship Management (CRM).
        A tool that allows a company to keep track of its customers\n`);
      console.log('1. Create Customer');
      console.log('2. View Customers');
      console.log('3. Update Customer');
      console.log('4. Delete Customer');
      console.log('5. Quit');
  
      const choice = prompt('Enter your choice: ');
  
      switch (choice) {
        case '1':
          await createCustomer();
          break;
        case '2':
          await viewCustomers();
          break;
        case '3':
          await updateCustomer();
          break;
        case '4':
          await deleteCustomer();
          break;
        case '5':
          exit = true;
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    }
  };
  





