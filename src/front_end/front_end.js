const sendButton = document.querySelector('#sendButton');
const linkInput = document.querySelector('#urlInput');
const descInput = document.querySelector('#descInput');
const xhr = new XMLHttpRequest();
const evLink = '/evbot/'

const sendData = () => {
	xhr.open('POST', evLink);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
	xhr.send(JSON.stringify({"link": linkInput.value, "desc": descInput.value}));
	console.log('data sent')
	linkInput.value = '';
	descInput.value = '';
};

sendButton.addEventListener('click', sendData);