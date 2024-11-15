document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const maxChars = 12; 
  
  
    loadTodos();
  
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (todoInput.value.length > maxChars) {
        alert(`A tarefa não pode exceder ${maxChars} caracteres.`);
      } else {
        addTodo();
      }
    });
  
    
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText === '') return;
  
      const todo = {
        text: todoText,
        completed: false
      };
  
      const li = createTodoElement(todo);
      todoList.appendChild(li);
  
      saveTodo(todo);
      todoInput.value = '';
      updateTodoNumbers();
    }
  
    
    function createTodoElement(todo) {
      const li = document.createElement('li');
  
      const textSpan = document.createElement('span');
      textSpan.textContent = todo.text;
  
      if (todo.completed) {
        li.classList.add('completed');
        li.style.color = 'green';
      }
  
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Concluída';
      completeButton.classList.add('complete');
      completeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.add('completed');
        li.style.color = 'green';
        todo.completed = true;
        updateTodos();
      });
  
      const pendingButton = document.createElement('button');
      pendingButton.textContent = 'Pendente';
      pendingButton.classList.add('pending');
      pendingButton.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.remove('completed');
        li.style.color = '';
        todo.completed = false;
        updateTodos();
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remover';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        todoList.removeChild(li);
        removeTodo(todo);
        updateTodoNumbers();
      });
  
      li.appendChild(textSpan);
      li.appendChild(completeButton);
      li.appendChild(pendingButton);
      li.appendChild(deleteButton);
      return li;
    }
  
    
    function saveTodo(todo) {
      let todos = getTodos();
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
   
    
    function loadTodos() {
      let todos = getTodos();
      todos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
      });
      updateTodoNumbers();
    }
  
    
    function getTodos() {
      let todos = localStorage.getItem('todos');
      return todos ? JSON.parse(todos) : [];
    }
  
   
    function updateTodos() {
      let todos = Array.from(todoList.children).map(li => ({
        text: li.querySelector('span').textContent.split('. ')[1] || li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      }));
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
   
    function removeTodo(todo) {
      let todos = getTodos();
      todos = todos.filter(t => t.text !== todo.text);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    
    function updateTodoNumbers() {
      Array.from(todoList.children).forEach((li, index) => {
        const spanText = li.querySelector('span').textContent;
        const taskText = spanText.includes('. ') ? spanText.split('. ')[1] : spanText;
        li.querySelector('span').textContent = `${index + 1}. ${taskText}`;
      });
    }
  });
  