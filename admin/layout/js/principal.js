

async function loadProjectTasks(projectId) {
  try {
    const response = await fetch(`get_tasks.php?project_id=${projectId}`);
    const tasks = await response.json();

    const taskContainer = document.querySelector('.apparaition-tache');
    const todoColumn = document.querySelector('.status-column:nth-child(1)');
    const doingColumn = document.querySelector('.status-column:nth-child(2)');
    const doneColumn = document.querySelector('.status-column:nth-child(3)');

    // Clear existing tasks
    taskContainer.innerHTML = '';
    todoColumn.querySelectorAll('.task').forEach(t => t.remove());
    doingColumn.querySelectorAll('.task').forEach(t => t.remove());
    doneColumn.querySelectorAll('.task').forEach(t => t.remove());

    if (tasks && tasks.length > 0) {
      tasks.forEach(task => {
        // Create task element
        const taskElement = document.createElement('div');
        taskElement.className = 'task_et_etat';
        taskElement.dataset.taskId = task.id;
        taskElement.innerHTML = `
          <p class="task">${task.nom}</p>
          <button class="status">${task.status || 'TO DO'}</button>
          <button class="delete-task">X</button>
        `;

        // Add to task container
        taskContainer.appendChild(taskElement);

        // Add to appropriate status column
        const statusElement = document.createElement('div');
        statusElement.className = 'task';
        statusElement.textContent = task.nom;
        statusElement.dataset.taskId = task.id;

        switch (task.status) {
          case 'DOING':
            doingColumn.appendChild(statusElement);
            break;
          case 'DONE':
            doneColumn.appendChild(statusElement);
            break;
          default:
            todoColumn.appendChild(statusElement);
        }
      });
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}






window.loadProjects = async function loadProjects() {
  try {
    const response = await fetch("get_projects.php?");
    const projects = await response.json();

    const projectContainer = document.querySelector('.board-project');

    // Sauvegarder le bouton d'ajout avant de vider le conteneur
    const addButton = projectContainer.querySelector('.ajouter-projet');
    projectContainer.innerHTML = ''; // Vider le conteneur

    // Réinsérer le bouton d'ajout
    if (addButton) {
      projectContainer.appendChild(addButton);
    } else {
      // Créer le bouton s'il n'existe pas
      const newAddButton = document.createElement('div');
      newAddButton.className = 'ajouter-projet';
      newAddButton.textContent = '+';
      newAddButton.addEventListener('click', function () {
        document.getElementById('box-ajouter-un-projet').style.display = 'block';
      });
      projectContainer.appendChild(newAddButton);
    }

    if (projects && projects.length > 0) {
      projects.forEach(project => {
        addProjectToUI(project);
      });
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}


document.addEventListener("DOMContentLoaded", function () {

  window.loadProjects();

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
  document.getElementById("back").addEventListener("click", function () {
    document.getElementById("task-board").style.display = "none";
    document.querySelector(".board").style.display = "block";
  });

  // Gestionnaire pour le bouton d'ajout
  document.querySelector('.ajouter-projet').addEventListener('click', function () {
    document.getElementById('box-ajouter-un-projet').style.display = 'block';
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




document.addEventListener('DOMContentLoaded', function () {
  // Éléments du DOM
  const addUserButton = document.getElementById('addUserButton');
  const addUserForm = document.getElementById('addUserForm');
  const closeAddUserBox = document.getElementById('close-add-user-box');
  const saveUserButton = document.getElementById('save-user');
  const teamList = document.querySelector('.team-list');
  const searchInput = document.getElementById('searchTeamInput');

  // Afficher le formulaire d'ajout
  addUserButton.addEventListener('click', function () {
    addUserForm.style.display = 'block';
  });

  // Masquer le formulaire
  closeAddUserBox.addEventListener('click', function () {
    addUserForm.style.display = 'none';
    // Réinitialiser le formulaire
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
  });

  // Sauvegarder un nouvel utilisateur
  saveUserButton.addEventListener('click', function () {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();

    if (name && email) {
      addTeamMember(name, email, 'Pending');
      // Masquer et réinitialiser le formulaire
      closeAddUserBox.click();
    } else {
      alert('Please fill all fields');
    }
  });

  // Fonction pour ajouter un membre à l'équipe
  function addTeamMember(name, email, status = 'Offline') {
    // Créer les initiales pour l'avatar
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    const memberDiv = document.createElement('div');
    memberDiv.className = 'team-member';
    memberDiv.innerHTML = `
          <div class="avatar">${initials}</div>
          <div class="member-info">
              <h3>${name}</h3>
              <p>${email}</p>
              <span class="status">${status}</span>
          </div>
      `;

    teamList.appendChild(memberDiv);
    saveToLocalStorage();
  }

  // Fonction de recherche
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const members = document.querySelectorAll('.team-member');

    members.forEach(member => {
      const name = member.querySelector('h3').textContent.toLowerCase();
      const email = member.querySelector('p').textContent.toLowerCase();

      if (name.includes(searchTerm) || email.includes(searchTerm)) {
        member.style.display = 'flex';
      } else {
        member.style.display = 'none';
      }
    });
  });

  // Sauvegarder dans localStorage
  function saveToLocalStorage() {
    const members = [];
    document.querySelectorAll('.team-member').forEach(member => {
      members.push({
        name: member.querySelector('h3').textContent,
        email: member.querySelector('p').textContent,
        status: member.querySelector('.status').textContent
      });
    });
    localStorage.setItem('teamMembers', JSON.stringify(members));
  }

  // Uncomment and implement the function
  function loadFromLocalStorage() {
    const savedMembers = JSON.parse(localStorage.getItem('teamMembers'));
    if (savedMembers && savedMembers.length > 0) {
      savedMembers.forEach(member => {
        addTeamMember(member.name, member.email, member.status);
      });
    } else {
      // Optional: Add default members if none are saved
      addTeamMember('Basma El kasimi', 'Lorem ipsum dolor sit amet consectetur adipisicing.', 'Online');
      addTeamMember('Someone Name', 'Lorem ipsum dolor sit amet.', 'Offline');
    }
  }

  // Charger les membres au démarrage
  loadFromLocalStorage();
});






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









document.getElementById("save-project").addEventListener("click", async function (e) {
  e.preventDefault();

  let name = document.getElementById("project-name").value;
  let description = document.getElementById("project-description").value;
  let emailInput = document.getElementById("emails").value;
  let start_date = document.getElementById("datedebut").value;
  let end_date = document.getElementById("datefin").value;

  // Validation
  if (!name) {
    alert("Project name is required");
    return;
  }

  // Traitement des emails
  let emails = emailInput.split(',')
    .map(email => email.trim())
    .filter(email => email !== "");

  // Création de l'objet de données
  let projectData = {
    name: name,
    description: description,
    emails: emails,
    start_date: start_date,
    end_date: end_date
  };

  try {
    const response = await fetch("add_project.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Erreur lors de l\'ajout');

    if (data.success) {
      // Recharger tous les projets après ajout
      await loadProjects();

      document.getElementById("box-ajouter-un-projet").style.display = "none";
      document.getElementById("project-form").reset();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error: " + error.message);
  }
});



async function deleteProject(projectId, element) {
  if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) return;

  try {
    const response = await fetch(`delete_project.php?id=${projectId}`, {
      method: 'DELETE'
    });

    // Debug: Afficher la réponse brute
    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (response.status === 204) {
      // 204 No Content n'a pas de body
      element.remove();
      showSuccessNotification('Projet supprimé avec succès');
      loadProjects(); // Rafraîchir la liste
    } else {
      // Essayer de parser le JSON seulement si la réponse en contient
      const errorData = responseText ? JSON.parse(responseText) : null;
      throw new Error(errorData?.error || `Erreur serveur (status ${response.status})`);
    }
  } catch (error) {
    console.error('Delete error:', error);
    showErrorNotification(error.message || 'Échec de la suppression');
  }
}

// Fonctions d'affichage des notifications (à ajouter)
function showSuccessNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification success';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

function showErrorNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification error';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 5000);
}


function addProjectToUI(project) {
  // Vérifier si le projet existe déjà pour éviter les doublons
  if (document.querySelector(`.projet[data-id="${project.ProjeID}"]`)) {
    return;
  }

  const projectContainer = document.querySelector('.board-project');
  const projectElement = document.createElement('div');
  projectElement.className = 'projet';
  projectElement.textContent = project.nom || project.name; // Utilisez le nom selon votre structure de données
  projectElement.dataset.id = project.ProjeID || project.id;


  // Rendre le projet cliquable
  projectElement.addEventListener('click', function () {
    // Masquer la liste des projets
    document.querySelector('.board').style.display = 'none';

    // Afficher le tableau de tâches (déjà présent dans votre code)
    document.getElementById('task-board').style.display = 'block';

    // Mettre à jour le nom du projet dans l'en-tête (comme dans votre code)
    document.querySelector('.nomProjet h1').textContent = this.textContent;

    // Charger les tâches spécifiques à ce projet (nouveau)
    loadProjectTasks(project.ProjeID || project.id);
  });


  // Ajouter les données supplémentaires comme attributs
  projectElement.dataset.description = project.description;
  projectElement.dataset.start_date = project.dateDebut || project.start_date;
  projectElement.dataset.end_date = project.dateFin || project.end_date;

  // Bouton de suppression
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();
    deleteProject(project.ProjeID || project.id, projectElement);
  });

  projectElement.appendChild(deleteButton);
  projectContainer.appendChild(projectElement);


}

















//pour fermer la Box d'ajout de projet

document.getElementById('close-add-box').addEventListener('click', function () {
  document.getElementById('box-ajouter-un-projet').style.display = 'none';

});
//afficher le détail d'un projet
document.querySelector('.board-project').addEventListener('click', function (e) {
  if (e.target.classList.contains('projet')) {
    const project = e.target;

    document.getElementById('project-details-name').textContent = project.firstChild.nodeValue.trim();
    ;
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


// Ajoutez ces écouteurs d'événements
document.querySelectorAll('.task').forEach(task => {
  task.draggable = true;
  task.addEventListener('dragstart', handleDragStart);
});

document.querySelectorAll('.status-column').forEach(column => {
  column.addEventListener('dragover', handleDragOver);
  column.addEventListener('drop', handleDrop);
});

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain');
  const task = document.getElementById(taskId);
  e.currentTarget.appendChild(task);

  // Mettre à jour le statut dans la base de données
  updateTaskStatus(taskId, e.currentTarget.querySelector('em').textContent);
}




