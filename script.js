// Function to fetch and render motivational quotes
async function renderMotivationalQuote() {
    try {
        const response = await axios.get(`${BASE_JSON_BIN_URL}/${BIN_ID}/latest`, {
            headers: {
                "X-Master-Key": MASTER_KEY
            }
        });

        if (response.status === 200) {
            const quotes = response.data.record.motivationalQuotes;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];
            const motivationalQuotesElement = document.getElementById('motivationalQuotes');
            motivationalQuotesElement.innerHTML = `<p>"${quote.quote}"<br>- ${quote.author}</p>`;
        } else {
            console.error('Error fetching data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Global variable for todo list
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
            <button class="editBtn btn btn-warning" data-id="${index}">Edit</button>    
            <button class="deleteBtn btn btn-danger" data-id="${index}">Delete</button>
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

    // Render motivational quote
    renderMotivationalQuote();

    // Set interval to update motivational quote every 10 seconds
    setInterval(renderMotivationalQuote, 10000);
};

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
