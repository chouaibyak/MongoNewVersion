document.addEventListener("DOMContentLoaded", function () {
  const projet1 = document.getElementById("projet1");
  const board = document.querySelector(".board");
  const taskBoard = document.getElementById("task-board");
  const backButton = document.getElementById("back");
  const myProjectTitle = document.querySelector(".MyProject");

  // Cacher le tableau des tâches au départ
  taskBoard.style.display = "none";

  // Afficher le tableau des tâches et cacher "My Projects"
  projet1.addEventListener("click", function () {
    board.style.display = "none"; // Cache la section "My Projects"
    myProjectTitle.style.display = "none"; // Cache le titre "My Projects"
    taskBoard.style.display = "block"; // Affiche le tableau des tâches
  });

  // Revenir à la section "My Projects"
  backButton.addEventListener("click", function () {
    taskBoard.style.display = "none"; // Cache le tableau des tâches
    board.style.display = "block"; // Affiche la section "My Projects"
    myProjectTitle.style.display = "block"; // Affiche le titre "My Projects"
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const suiviTaches = document.querySelector(".Suivi-taches");
  const toggleButton = suiviTaches.querySelector("button");

  // Création du bouton <<
  const showButton = document.createElement("button");
  showButton.textContent = "<< Suivi";
  showButton.style.display = "none"; // Caché au début
  showButton.style.padding = "8px 10px";
  showButton.style.marginRight = "0";
  showButton.style.backgroundColor = "#dbdede";
  showButton.style.color = "#1a1c1c";
  showButton.style.borderRadius = "20px";
  showButton.style.border = "none";
  showButton.style.cursor = "pointer";

  // Ajouter le bouton dans le DOM
  suiviTaches.parentNode.insertBefore(showButton, suiviTaches);

  // Cacher la section "Suivi-taches" en cliquant sur >>
  toggleButton.addEventListener("click", function () {
    suiviTaches.style.display = "none";
    showButton.style.display = "block"; // Afficher <<
  });

  // Réafficher "Suivi-taches" en cliquant sur <<
  showButton.addEventListener("click", function () {
    suiviTaches.style.display = "block";
    showButton.style.display = "none"; // Cacher <<
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task");
  const tacheInfo = document.querySelector(".tache-info");
  const tacheNameInput = document.querySelector(".tache-name");
  const tacheDeadlineInput = document.querySelector(".tache-deadline");
  const enregistrerButton = tacheInfo.querySelector("button");
  const annulerButton = tacheInfo.querySelectorAll("button")[1];
  const toDoColumn = document.querySelector(".status-column em").parentElement;
  const apparaitionTache = document.querySelector(".apparaition-tache");

  loadTasks();

  addTaskButton.addEventListener("click", function () {
    tacheInfo.style.display = tacheInfo.style.display === "none" || tacheInfo.style.display === "" ? "block" : "none";
  });

  annulerButton.addEventListener("click", function () {
    tacheInfo.style.display = "none";
    tacheNameInput.value = "";
    tacheDeadlineInput.value = "";
  });

  enregistrerButton.addEventListener("click", function () {
    const taskName = tacheNameInput.value.trim();
    const taskDeadline = tacheDeadlineInput.value;

    if (taskName && taskDeadline) {
      const newTask = { name: taskName, deadline: taskDeadline, status: "TO DO" };
      addTaskToDOM(newTask);
      saveTask(newTask);
      tacheInfo.style.display = "none";
      tacheNameInput.value = "";
      tacheDeadlineInput.value = "";
    } else {
      alert("Veuillez entrer un nom de tâche et une date de deadline valides.");
    }
  });

  function addTaskToDOM(task) {
    // Créer l'élément de tâche pour la colonne de statut (sans bouton "X")
    const newTaskSuivi = document.createElement("div");
    newTaskSuivi.className = "task";
    newTaskSuivi.textContent = `${task.name}  ${task.deadline}`;
    newTaskSuivi.dataset.taskName = task.name; // Ajouter un attribut pour identifier la tâche

    // Créer l'élément de tâche pour la section .apparaition-tache (avec bouton "X")
    const newTaskApparaition = document.createElement("div");
    newTaskApparaition.className = "task_et_etat";
    newTaskApparaition.dataset.taskName = task.name; // Ajouter un attribut pour identifier la tâche

    const taskText = document.createElement("p");
    taskText.className = "task";
    taskText.textContent = `${task.name} ${task.deadline}`;

    const statusButton = document.createElement("button");
    statusButton.className = "status";
    statusButton.textContent = task.status;
    statusButton.addEventListener("click", function () {
      changeTaskStatus(newTaskSuivi, statusButton);
    });

    // Ajouter le bouton "X" pour supprimer la tâche
    const deleteButton = document.createElement("button");
    deleteButton.id = `delete-task-${task.name.replace(/\s+/g, "-")}`; // Créer un ID unique
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.name); // Supprimer la tâche du localStorage
      newTaskSuivi.remove(); // Supprimer la tâche de la colonne de statut
      newTaskApparaition.remove(); // Supprimer la tâche de .apparaition-tache
    });

    // Ajouter les éléments à .apparaition-tache
    newTaskApparaition.appendChild(taskText);
    newTaskApparaition.appendChild(statusButton);
    newTaskApparaition.appendChild(deleteButton);
    apparaitionTache.appendChild(newTaskApparaition);

    // Ajouter la tâche à la colonne de statut appropriée
    if (task.status === "TO DO") {
      toDoColumn.appendChild(newTaskSuivi);
    } else if (task.status === "DOING") {
      document.querySelectorAll(".status-column")[1].appendChild(newTaskSuivi);
    } else if (task.status === "DONE") {
      document.querySelectorAll(".status-column")[2].appendChild(newTaskSuivi);
    }
  }

  function changeTaskStatus(task, statusButton) {
    const currentStatus = statusButton.textContent;
    const doingColumn = document.querySelectorAll(".status-column")[1];
    const doneColumn = document.querySelectorAll(".status-column")[2];

    if (currentStatus === "TO DO") {
      statusButton.textContent = "DOING";
      doingColumn.appendChild(task);
    } else if (currentStatus === "DOING") {
      statusButton.textContent = "DONE";
      doneColumn.appendChild(task);
    } else if (currentStatus === "DONE") {
      statusButton.textContent = "TO DO";
      toDoColumn.appendChild(task);
    }
    updateTaskStatus(task.dataset.taskName, statusButton.textContent); // Mettre à jour le statut dans localStorage
  }

  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToDOM(task));
  }

  function updateTaskStatus(taskName, newStatus) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
      if (task.name === taskName) {
        task.status = newStatus;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function deleteTask(taskName) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const todoListContainer = document.querySelector('.todo-list-container');
  const masquerTodoButton = document.querySelector('.masquer-todo');
  const tasks = document.querySelectorAll('.task_et_etat');

  // Afficher la liste "To-Do" lors du clic sur une tâche
  tasks.forEach(task => {
    task.addEventListener('click', () => {
      todoListContainer.classList.add('visible');
    });
  });

  // Masquer la liste "To-Do" lors du clic sur le bouton "X"
  masquerTodoButton.addEventListener('click', function () {
    todoListContainer.classList.remove('visible');
  });

  // Masquer la liste "To-Do" lors du clic en dehors de la liste
  window.addEventListener('click', (event) => {
    if (event.target === todoListContainer) {
      todoListContainer.classList.remove('visible');
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Sélection des éléments du DOM
  const input = document.querySelector(".todo-input"); // Champ de saisie
  const addButton = document.querySelector(".add-button"); // Bouton Ajouter
  const todosHtml = document.querySelector(".todos"); // Conteneur des tâches
  const emptyImage = document.querySelector(".empty-image"); // Image vide
  const deleteAllButton = document.querySelector(".delete-all"); // Bouton Supprimer tout
  const filters = document.querySelectorAll(".filter"); // Boutons de filtre
  let todosJson = JSON.parse(localStorage.getItem("todos")) || []; // Tâches sauvegardées
  let filter = ''; // Filtre actif

  // Afficher les tâches au chargement
  showTodos();

  // Fonction pour générer le HTML d'une tâche
  function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
      return ''; // Ignore les tâches qui ne correspondent pas au filtre
    }
    const checked = todo.status === "completed" ? "checked" : "";
    return `
      <li class="todo">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this, ${index})" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
      </li>
    `;
  }

  // Fonction pour afficher les tâches
  function showTodos() {
    if (todosJson.length === 0) {
      todosHtml.innerHTML = '';
      emptyImage.style.display = 'block';
    } else {
      todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
      emptyImage.style.display = 'none';
    }
    updateProgressBar(); // Met à jour la barre de progression
  }

  // Fonction pour ajouter une tâche
  function addTodo(todo) {
    if (!todo) return; // Ne pas ajouter de tâche vide
    input.value = ""; // Vide le champ de saisie
    todosJson.unshift({ name: todo, status: "pending" }); // Ajoute la tâche au début du tableau
    localStorage.setItem("todos", JSON.stringify(todosJson)); // Sauvegarde dans le localStorage
    showTodos(); // Affiche les tâches mises à jour
  }

  // Écouteur pour le bouton Ajouter
  addButton.addEventListener("click", () => {
    const todo = input.value.trim();
    addTodo(todo);
  });

  // Écouteur pour la touche Entrée
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const todo = input.value.trim();
      addTodo(todo);
    }
  });

  // Fonction pour mettre à jour le statut d'une tâche
  window.updateStatus = function (todo, index) {
    const todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
      todoName.classList.add("checked");
      todosJson[index].status = "completed";
    } else {
      todoName.classList.remove("checked");
      todosJson[index].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
    updateProgressBar();
  };

  // Fonction pour supprimer une tâche
  window.remove = function (button) {
    const index = button.dataset.index;
    todosJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  };

  // Écouteurs pour les filtres
  filters.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        filter = '';
      } else {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
      }
      showTodos();
    });
  });

  // Écouteur pour le bouton Supprimer tout
  deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  });

  // Fonction pour mettre à jour la barre de progression
  function updateProgressBar() {
    const totalTodos = todosJson.length;
    const completedTodos = todosJson.filter(todo => todo.status === "completed").length;
    const progressPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

    const progressBar = document.querySelector(".progress-bar");
    const progressPercentageText = document.querySelector(".progress-percentage");

    progressBar.style.width = ` ${progressPercentage}%`;
    progressPercentageText.textContent = ` ${Math.round(progressPercentage)}%`;
  }
});





function showPage(pageId) {
  // Masquer toutes les pages
  document.querySelectorAll(".content").forEach(page => {
    page.style.display = "none";
  });
  // Afficher la page demandée
  document.getElementById(pageId).style.display = "block";
}

// Ajouter des écouteurs d'événements pour les boutons
document.getElementById("myProjectBtn").addEventListener("click", function () {
  showPage("myProjectsPage"); // Afficher la page "My Projects"
});

document.getElementById("teamBtn").addEventListener("click", function () {
  showPage("teamPage"); // Afficher la page "Team"
});
document.getElementById("viewProjectBtn").addEventListener("click", function () {
  showPage("viewProjectPage"); // Afficher la page "Team"
});


document.getElementById('addUserButton').addEventListener('click', function () {
  var form = document.getElementById('addUserForm');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

// Pour masquer le formulaire lors du clic sur le bouton "Close"
document.getElementById('close-add-user-box').addEventListener('click', function () {
  var form = document.getElementById('addUserForm');
  form.style.display = 'none';
})



/*function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

function showContent(contentId) {
  // Masquer tous les contenus
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
      contents[i].classList.remove("active");
  }

  // Afficher le contenu sélectionné
  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
      selectedContent.classList.add("active");
  }

  // Fermer le menu déroulant
  var menu = document.getElementById("menu");
  menu.classList.remove("show");
}

// Fermer le menu si l'utilisateur clique en dehors
window.onclick = function(event) {
  if (!event.target.closest('.profile-menu')) {
      var menus = document.getElementsByClassName("menu-content");
      for (var i = 0; i < menus.length; i++) {
          var openMenu = menus[i];
          if (openMenu.classList.contains('show')) {
              openMenu.classList.remove('show');
          }
      }
  }
}
*/


function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

document.addEventListener("click", function (event) {
  var menu = document.getElementById("menu");
  var button = document.querySelector(".profile-button");

  if (!button.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove("show");
  }
});

function showContent(sectionId) {
  var sections = document.querySelectorAll(".content");

  sections.forEach(function (section) {
    section.style.display = "none";
  });

  var selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
  }
}


















// Afficher "My Projects" par défaut au chargement de la page
showPage("myProjectsPage");


// Sélectionne l'élément input avec l'ID "searchInput" et écoute les entrées de l'utilisateur
document.getElementById("searchInput").addEventListener("input", function () {

  // Récupère la valeur saisie dans l'input et la convertit en minuscules
  const searchprojets = this.value.toLowerCase();

  // Sélectionne toutes les lignes <tr> du tableau ayant la classe "project-table"
  const rows = document.querySelectorAll(".project-table tbody tr");

  // Parcourt chaque ligne du tableau
  rows.forEach(row => {

    // Récupère le texte du premier <td> de la ligne et le met en minuscules
    const projectName = row.querySelector("td").textContent.toLowerCase();

    // Vérifie si le texte saisi par l'utilisateur est présent dans le nom du projet
    if (projectName.includes(searchprojets)) {
      // Si oui, on affiche la ligne (valeur par défaut de display)
      row.style.display = "";
    } else {
      // Sinon, on cache la ligne
      row.style.display = "none";
    }
  });
});









//ouvrir le Box pour ouvrir un nouveau projet
document.querySelector('.ajouter-projet').addEventListener('click', function () {
  document.getElementById('box-ajouter-un-projet').style.display = 'block';
}
);





//=================================================================================================
//sauvegarder le projet
// document.getElementById('save-project').addEventListener('click', function () {
//   const projectName = document.getElementById('project-name').value;
//   const ProjectDescription = document.getElementById('project-description').value;
//   const ProjectMembers = document.getElementById('project-members').value;
//   const ProjectDeadline = document.getElementById('project-deadline').value;

//   if (projectName) {
//     const newProject = document.createElement('div');
//     newProject.className = 'projet';
//     newProject.textContent = 'projectName';
//     newProject.dataset.description = 'projectDescription';
//     newProject.dataset.members = 'projectMembers';
//     newProject.dataset.deadline = 'projectDeadline';

//     //ajouter un boutton de suppresion

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Supprimer';
//     deleteButton.className = 'delete-button';
//     deleteButton.addEventListener('click', function (e) {
//       e.stopPropagation(); //pour empeche l'ouverture du détail du projet
//       newProject.remove();
//     });
//     newProject.appendChild(deleteButton);
//     //ajouter un projet à la liste
//     document.querySelector('.board-project').appendChild(newProject);
//     //Fermer la Box
//     document.getElementById('box-ajouter-un-projet').style.display = 'none';

//     //pour rénitialiser le formulaire 

//     document.getElementById('project-name').value = '';
//     document.getElementById('project-description').value = '';
//     document.getElementById('project-members').value = '';
//     document.getElementById('project-deadline').value = '';

//   } else {
//     alert('Veuillez entrer un nom de projet');
//   }
// });
//=================================================================================================


document.getElementById("save-project").addEventListener("click", function (e) {
  e.preventDefault();

  let name = document.getElementById("project-name").value;
  let description = document.getElementById("project-description").value;
  let emails = document.getElementById("emails").value.split(",");
  let start_date = document.getElementById("datedebut").value;
  let end_date = document.getElementById("datefin").value;

  // Validation simple
  if (!name) {
    alert("Le nom du projet est requis");
    return;
  }

  // Création de l'objet de données
  let projectData = {
    name: name,
    description: description,
    emails: emails.map(email => email.trim()).filter(email => email !== ""),
    start_date: start_date,
    end_date: end_date
  };

  fetch("add_project.php", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(projectData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert("Projet ajouté avec succès !");
        // Ajouter le projet à l'interface
        addProjectToUI({
          ProjeID: data.project_id,
          nom: name,
          description: description,
          dateCreation: new Date().toISOString(),
          status: "En cours"
        });
        // Fermer et réinitialiser le formulaire
        document.getElementById("box-ajouter-un-projet").style.display = "none";
        document.getElementById("project-form").reset();
      } else {
        throw new Error(data.error || 'Erreur inconnue');
      }
    })
    .catch(error => {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout du projet: " + error.message);
    });
});


// Fonction pour ajouter un projet à l'interface
function addProjectToUI(project) {
  const projectContainer = document.querySelector('.board-project');
  const projectElement = document.createElement('div');
  projectElement.className = 'projet';
  projectElement.textContent = project.nom;
  projectElement.dataset.id = project.ProjeID;

  // Info-bulle
  projectElement.title = `Description: ${project.description}\n` +
    `Date: ${new Date(project.dateCreation).toLocaleDateString()}\n` +
    `Statut: ${project.status}`;

  // Bouton de suppression
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();
    deleteProject(project.ProjeID, projectElement);
  });

  projectElement.appendChild(deleteButton);
  projectContainer.appendChild(projectElement);
}

// Fonction pour supprimer un projet
function deleteProject(projectId, element) {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    fetch(`delete_project.php?id=${projectId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          element.remove();
          alert('Projet supprimé avec succès');
        } else {
          throw new Error(data.error || 'Erreur lors de la suppression');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression: ' + error.message);
      });
  }
}









//pour fermer la Box d'ajout de projet

document.getElementById('close-add-box').addEventListener('click', function () {
  document.getElementById('box-ajouter-un-projet').style.display = 'none';

});
//afficher le détail d'un projet
document.querySelector('.board-project').addEventListener('click', function (e) {
  if (e.target.classList.contains('projet')) {
    const project = e.target;

    document.getElementById('project-details-name').textContent = project.textContent;
    document.getElementById('project-details-description').textContent = project.dataset.description;
    document.getElementById('project-details-members').textContent = project.dataset.members;
    document.getElementById('project-details-deadline').textContent = project.dataset.deadline;
    document.getElementById('box-details-projet').style.display = 'block';

  }

});

//pour fermer la Box des détails
document.getElementById('close-details').addEventListener('click', function () {
  document.getElementById('box-details-projet').style.display = 'none';
});

//pour fermer les Boxes si on clique en dehors
window.onclick = function (event) {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    if (event.target === box) {
      box.style.display = 'none';
    }

  }

  );
}