window.addEventListener('load', () => {
	Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];
	const nameInput = document.querySelector('#name');
	const newTaskForm = document.querySelector('#new-Task-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		const Task = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		Tasks.push(Task);

		localStorage.setItem('Tasks', JSON.stringify(Tasks));

		// Reset the form
		e.target.reset();

		DisplayTasks()
	})

	DisplayTasks()
})

function DisplayTasks () {
	const TaskList = document.querySelector('#Task-list');
	TaskList.innerHTML = "";

	Tasks.forEach(Task => {
		const TaskItem = document.createElement('div');
		TaskItem.classList.add('Task-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = Task.done;
		span.classList.add('bubble');
		if (Task.category == 'personal') {
			span.classList.add('personal')
		} else {
			span.classList.add('Parents');
		}
		content.classList.add('Task-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${Task.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		TaskItem.appendChild(label);
		TaskItem.appendChild(content);
		TaskItem.appendChild(actions);

		TaskList.appendChild(TaskItem);

		if (Task.done) {
			TaskItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			Task.done = e.target.checked;
			localStorage.setItem('Tasks', JSON.stringify(Tasks));

			if (Task.done) {
				TaskItem.classList.add('done');
			} else {
				TaskItem.classList.remove('done');
			}

			DisplayTasks()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				Task.content = e.target.value;
				localStorage.setItem('Tasks', JSON.stringify(Tasks));
				DisplayTasks()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			Tasks = Tasks.filter(t => t != Task);
			localStorage.setItem('Tasks', JSON.stringify(Tasks));
			DisplayTasks()
		})

	})
}