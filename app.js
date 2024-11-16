const inputField = document.querySelector('.input');
const addButton = document.querySelector('.button2');
const plusButton = document.querySelector('.plus');
const clearButton = document.querySelector('.clear-btn');
const taskContainer = document.querySelector('.task-container');
const image = document.querySelector('.pic img');
const image1 = document.querySelector(".pics1");
const image2 = document.querySelector(".pics2");
const image3 = document.querySelector(".pics3");

let isAscending = true;

function addTask(taskContent) {
    if (taskContent.trim() === '') return;


    const li = document.createElement('li');
    li.classList.add('task-item');

    const taskText = document.createElement('span');
    taskText.textContent = taskContent;
    li.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'x';
    deleteBtn.onclick = () => deleteTask(li);
    li.appendChild(deleteBtn);

    taskContainer.appendChild(li);

    inputField.value = '';


    if (taskContainer.children.length > 0) {
        inputField.style.display = 'none';
        plusButton.style.display = 'block';
        clearButton.style.display = 'none';
    } else {
        taskContainer.style.display = 'none';
    }

    updateTaskNumbers();
}

function deleteTask(taskItem) {
    taskContainer.removeChild(taskItem);
    updateTaskNumbers();
}

plusButton.addEventListener('click', () => {
    inputField.style.display = 'block';
    plusButton.style.display = 'block';
    clearButton.style.display = 'block';
    inputField.focus();
});

addButton.addEventListener('click', () => {
    const taskContent = inputField.value;
    addTask(taskContent);
    taskContainer.style.display='block';

});

clearButton.addEventListener('click', () => {
    inputField.value = '';
});


function sortTasks() {
    const listItems = Array.from(taskContainer.querySelectorAll('li'));

    const sortedItems = listItems.sort((a, b) => {
        const textA = a.querySelector('span').textContent.replace(/^\d+\.\s*/, '').toLowerCase();
        const textB = b.querySelector('span').textContent.replace(/^\d+\.\s*/, '').toLowerCase();

        if (isAscending) {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    taskContainer.innerHTML = '';
    sortedItems.forEach(item => taskContainer.appendChild(item));

    updateTaskNumbers();
}

function updateTaskNumbers() {
    const listItems = taskContainer.querySelectorAll('li');
    listItems.forEach((item, index) => {
        const taskText = item.querySelector('span');
        taskText.textContent = `${index + 1}. ${taskText.textContent.replace(/^\d+\.\s*/, '')}`;
    });
}

image.addEventListener('click', () => {
    isAscending = true;
    sortTasks();
    image.style.display = 'none';
    image1.style.display = 'flex';
});

image1.addEventListener('click', () => {
    isAscending = false;
    sortTasks();
    image1.style.display = 'none';
    image.style.display = 'flex';
});

image.addEventListener('mouseenter', () => {
    image2.style.display = 'flex';
});

image.addEventListener('mouseleave', () => {
    image2.style.display = 'none';
});

image1.addEventListener('mouseenter', () => {
    image3.style.display = 'flex';
});

image1.addEventListener('mouseleave', () => {
    image3.style.display = 'none';
});
