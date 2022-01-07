//A faire: filtre des taches (toute, completer, a faire).


let addBTN = document.getElementById("add-task-button");
let listTasks = document.getElementById("task-list");
let inputTask = document.getElementById("input-task");

//Ecouteur sur le chargement de la page.
document.addEventListener("DOMContentLoaded", getTodo);

//Ecouteur au click sur bouton add a Task ou sur la touche entrée
addBTN.addEventListener('click', addNewTask);
document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13 : addNewTask();                     //Your Code Here (13 is ascii code for 'ENTER')
            break;
    }
};

//Ecouteur au click sur le bouton supprimer la tache.
listTasks.addEventListener('click', removeCheck);

//Creer une nouvelle taches dans la todolist.
function addNewTask () {

    let taskDesc = inputTask.value;

    if (taskDesc === "") {
        window.alert("Please enter a task's description !");
    }
    else {
        const newLi = document.createElement("li"); //Creation des element HTML avec la methode createElement().

        const newLabel = document.createElement("label");
        newLi.appendChild(newLabel);

        const newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("value", "unchecked");
        newLabel.appendChild(newCheckbox);

        /* on créé un objet "todo" pour garder en mémoire le texte du champs et l'etat des checkbox pour
        les restituer en cas de fermeture du navigateur. */
        const todo = {
            text : inputTask.value,
            check : newCheckbox.checked
        };

        saveTodos(todo);                        //Savegarder les taches avec la fonction saveTodos, qui fait une liste.

        const newSpan = document.createElement("span");
        newSpan.classList.add("task");
        newSpan.innerText = taskDesc;
        newLabel.appendChild(newSpan);

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.innerText = "X";
        newLabel.appendChild(delBtn);

        listTasks.appendChild(newLi);
    }
    inputTask.value = "";
}


//Fonction pour cocher ou supprimer un element a faire.
function removeCheck(e) {
    const item = e.target;
    const todo = item.parentElement.parentElement;

    //on supprime un element.
    if (item.classList[0] === "delete-btn") {
        removeTodo(todo);               //Appel la fonction removeTodo pour supprimer l'element de la liste JSON.
        todo.remove();
    }

    //on ajoute la class completed a l'élément parent.
    if (item.checked) {
        item.parentElement.classList.toggle("completed");
        checkObject(item, true);
    }
    else {
        item.parentElement.classList.remove("completed");
        checkObject(item, false);
    }
}

//modifie la valeur check en true ou false des objets dans le JSON pour mettre a jour s'il les boutons sont check ou pas
function checkObject(item, check) {
    let todoText = item.parentElement.children[1].innerHTML;
    let todos = JSON.parse(localStorage.getItem("todos"));

    for (const index in todos) {
        if (todos[index].text == todoText) {
            todos[index].check = check;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}


//Sauvegarde les elements cree dans un fichier JSON dans le browser.
function saveTodos(todo) {

    //Verification si des éléments ont été créé.
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


//Affiche les elements deja entree dans la todolist, en fonction du JSON.
function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {

        const newLi = document.createElement("li");

        const newLabel = document.createElement("label");
        newLi.appendChild(newLabel);

        const newCheckbox = document.createElement("input");
        if (todo.check === true) {
            newCheckbox.setAttribute("type", "checkbox");
            newCheckbox.setAttribute("value", "unchecked");
            newCheckbox.setAttribute("checked", "true");
            newLabel.appendChild(newCheckbox);
            newLabel.classList.toggle("completed");                      // ajoute la class "completed" au label pour garder le CSS
        } else {
            newCheckbox.setAttribute("type", "checkbox");
            newCheckbox.setAttribute("value", "unchecked");
            newLabel.appendChild(newCheckbox);
        }

        const newSpan = document.createElement("span");
        newSpan.classList.add("task");
        newSpan.innerText = todo.text;
        newLabel.appendChild(newSpan);

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.innerText = "X";
        newLabel.appendChild(delBtn);

        listTasks.appendChild(newLi);
    })
}

//Supprimer un element de la liste et actualise le localStorage.
function removeTodo (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoText = todo.children[0].children[1].innerHTML;             //Recupere l'index dans la list todos du texte affiche.

    //Recheche l'index dans le tableau "todos" avec la méthode findIndex, car cest un tableau d'objet.
    const index = todos.findIndex((element, index) => {
        if (element.text === todoText) {
            return true;
        }
    });

    todos.splice(index, 1);                                   //Supprime l'element a l'index recupere.
    localStorage.setItem("todos", JSON.stringify(todos));               //MAJ du JSON avec la tache supprime.

}















