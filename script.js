// Global variable
let todoList = [];

// Function to render todo list
function renderTodoList() {
    const listElement = document.getElementById('todoList');
    listElement.innerHTML = '';
    todoList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.task;
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";

        // Add due date display
        if (item.dueDate) {
            listItem.innerHTML += `<span class="badge bg-secondary">${item.dueDate}</span>`;
        }

        listItem.innerHTML += `
            <div>
                <button class="deleteBtn btn btn-danger" data-id="${index}">Delete</button>
                <button class="editBtn btn btn-warning" data-id="${index}">Edit</button>
            </div>
        `;

        listItem.classList.add('fadeIn'); // Add fadeIn animation class
        listElement.appendChild(listItem);
    });
}

// Function to add todo
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const task = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (task !== '') {
        const newTodo = { task, dueDate };
        todoList.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todoList));
        renderTodoList();
        todoInput.value = '';
        dueDateInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

// Event listener for adding todo
document.getElementById('addBtn').addEventListener('click', addTodo);

// Event listener for deleting todo
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBtn')) {
        const todoIndex = e.target.dataset.id;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                todoList.splice(todoIndex, 1);
                localStorage.setItem('todos', JSON.stringify(todoList));
                renderTodoList();
                Swal.fire(
                    'Deleted!',
                    'Your todo has been deleted.',
                    'success'
                );
            }
        });
    }
});

// Event listener for editing todo
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('editBtn')) {
        const todoIndex = e.target.dataset.id;
        Swal.fire({
            title: 'Edit task',
            input: 'text',
            inputPlaceholder: 'Enter new task',
            inputValue: todoList[todoIndex].task,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter something!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                todoList[todoIndex].task = result.value.trim();
                localStorage.setItem('todos', JSON.stringify(todoList));
                renderTodoList();
                Swal.fire('Success!', 'Task updated successfully!', 'success');
            }
        });
    }
});

// Initial rendering
window.onload = function() {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
        todoList = storedTodos;
        renderTodoList();
    }
    const liveDateElement = document.getElementById('liveDate');
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    liveDateElement.textContent = date.toLocaleDateString('en-US', options);
};

// GET quotes.JSON
// document.addEventListener("DOMContentLoaded", function() {
//     axios.get('quotes.json')
//         .then(response => {
//             const motivationalQuotes = response.quotes.motivationalQuotes;
//             const motivationalQuotesElement = document.getElementById('motivationalQuotes');
//             renderMotivationalQuote(motivationalQuotesElement, motivationalQuotes);
//             setInterval(() => renderMotivationalQuote(motivationalQuotesElement, motivationalQuotes), 10000);
//         })
//         .catch(error => {
//             console.error('Error fetching motivational quotes:', error);
//         });
// });

function renderMotivationalQuote(element, quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    element.innerHTML = `<p>"${quote.quote}"<br>- ${quote.author}</p>`;
}





// CHOOSE THIS TO REVERSE
// Array of motivational quotes (moved to quotes.json)
const motivationalQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "It always seems impossible until it's done. - Nelson Mandela",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
];





// CHOOSE THIS TO REVERSE
// Function to get a random motivational quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
}

// // Function to render motivational quotes
function renderMotivationalQuote() {
    const motivationalQuotesElement = document.getElementById('motivationalQuotes');
    motivationalQuotesElement.textContent = getRandomQuote();
}

// // Initial rendering of motivational quote
renderMotivationalQuote();

// // Set interval to rotate quotes every 10 seconds (10000 milliseconds)
setInterval(renderMotivationalQuote, 10000);



// Digital Clock
document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
        let hours = new Date().getHours();
        document.querySelectorAll(".hours").forEach(function(elem) {
            elem.textContent = (hours < 10 ? "0" : "") + hours;
        });
    }, 1000);
    setInterval(function() {
        let minutes = new Date().getMinutes();
        document.querySelectorAll(".min").forEach(function(elem) {
            elem.textContent = (minutes < 10 ? "0" : "") + minutes;
        });
    }, 1000);
    setInterval(function() {
        let seconds = new Date().getSeconds();
        document.querySelectorAll(".sec").forEach(function(elem) {
            elem.textContent = (seconds < 10 ? "0" : "") + seconds;
        });
    }, 1000);
});
