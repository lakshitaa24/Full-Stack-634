const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = [];

function showMenu() {
    console.log(`
Please choose an option:
1. Add Employee
2. List Employees
3. Remove Employee
4. Exit`);
    rl.question('> ', handleMenu);
}

function handleMenu(option) {
    switch (option.trim()) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Try again.');
            showMenu();
    }
}

function addEmployee() {
    rl.question('Enter Employee Name: ', name => {
        rl.question('Enter Employee ID: ', id => {
            if (!name || !id) {
                console.log('Name and ID cannot be empty.');
                return showMenu();
            }

            // Optional: Check for duplicate ID
            if (employees.find(emp => emp.id === id.trim())) {
                console.log('Employee ID already exists.');
                return showMenu();
            }

            employees.push({ id: id.trim(), name: name.trim() });
            console.log('Employee added successfully!');
            showMenu();
        });
    });
}

function listEmployees() {
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        console.log('\nCurrent Employees:');
        employees.forEach((emp, index) => {
            console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}`);
        });
    }
    showMenu();
}

function removeEmployee() {
    rl.question('Enter Employee ID to remove: ', id => {
        const index = employees.findIndex(emp => emp.id === id.trim());
        if (index !== -1) {
            employees.splice(index, 1);
            console.log('Employee removed successfully!');
        } else {
            console.log('Employee not found.');
        }
        showMenu();
    });
}

console.log('Welcome to the Employee Management System!');
showMenu();
