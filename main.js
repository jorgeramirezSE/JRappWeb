// JavaScript source code

let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let add = document.getElementById('add');
let data = [];
let tasks = document.getElementById('tasks');


form.addEventListener('submit', (e) => {
    //no se borran la informacion de los campos 
    e.preventDefault();
    formValidation();
});

let formValidation = () => {

    if (textInput.value == "") {
        msg.innerText = 'El titulo de la tarea no puede ser vacio';
        console.log('Failure');
        
    } else {
        console.log('Success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

       (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        });
    }

};

let acceptData = () => {

    //data["text"] = textInput.value;
    //data["date"] = dateInput.value;
    //data["description"] = textarea.value;

    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value

    });

    //guardar en la base de datos del navegador 
    localStorage.setItem("data",JSON.stringify(data));

    createTask();
    console.log(data);

}

let createTask = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {

        return (tasks.innerHTML += `<div>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
                <span class="options">
                    <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#form"></i>
                    <i onClick = "deleteTask(this)" class="fa-solid fa-trash-can" ></i>
                </span>
            </div>`);

    });   

    resetForm();
}
let resetForm = () => {
    textInput.value = "";
    textarea.value = "";
    dateInput.value = "";
};
let deleteTask = (e) => {

    e.parentElement.parentElement.remove();
    data.splice(e.arentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

};

let editTask = (e) => {
    //seleccionar la tarjeta
    let selectTask = e.parentElement.parentElement;

    //llenar los valores de las controles forms
    textInput.value = selectTask.children[0].innerHTML;
    dateInput.value = selectTask.children[1].innerHTML;
    textarea.value = selectTask.children[2].innerHTML;

    selectTask.remove();
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
})();