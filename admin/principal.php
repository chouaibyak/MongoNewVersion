
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">
    <!-- Lien vers le fichier CSS -->
    <link rel="stylesheet" href="../PrincipalCss/principal.css">
    <title>ManGo</title>
</head>

<body>
    <!-- Header -->
    <div class="header">
        <div class="header-icon">
            <i class="fa-brands fa-monero head-logo"></i>
            <h2><i>M</i>an<i>G</i>o</h2>
            <button class="button-header" data-tooltip="Cliquer pour revenir en arriere"><i
                    class="fa-solid fa-arrow-left"></i></button>
            <button class="button-header" data-tooltip="Cliquer pour avancer"><i
                    class="fa-solid fa-arrow-right"></i></button>
        </div>

        <div class="header-icon">
            <button class="button-header" data-tooltip="Historique"><i
                    class="fa-solid fa-clock-rotate-left"></i></button>
            <div class="search-container">
                <input type="text" placeholder="Search...">
                <i class="fa fa-search"></i>
            </div>
        </div>

        <div class="header-icon">
            <div class="icone1">
                <button class="button-header" data-tooltip="Note"><i class="fa-regular fa-clipboard"></i></button>
            </div>
            <div class="icone2">
                <button class="button-header" data-tooltip="Calendrier"><i
                        class="fa-solid fa-calendar-days"></i></button>
            </div>
            <div class="icone3">
                <button class="button-header" data-tooltip="Notification"><i class="fa-solid fa-bell"></i></button>
            </div>
            <div class="profile-menu">
               
                <button onclick="toggleMenu()" class="profile-button"> ES </button>
                <div id="menu" class="menu-content">
                    <a href="javascript:showContent('edit-profile')">Edit Profile</a>
                    <a href="javascript:showContent('settings')">Settings & Privacy</a>
                    <a href="javascript:showContent('help')">Help & Support</a>
                    <a href="javascript:showContent('mission')">Mission</a>
                    <a href="javascript:showContent('logout')">Logout</a>
                </div>
           
            
        
            <div id="edit-profile" class="content">
                <div class="sub-window">
                    <h2>Edit Profile</h2>
                    <p>Modifiez votre profil ici.</p>
                    <form>
                        <label for="name">Nom:</label>
                        <input type="text" id="name" name="name"><br><br>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email"><br><br>
                        <button type="submit">Sauvegarder</button>
                    </form>
                </div>
            </div>
        
            <div id="settings" class="content">
                <div class="sub-window">
                    <h2>Settings & Privacy</h2>
                    <p>Paramètres et confidentialité.</p>
                    <ul>
                        <li><a href="#">Changer le mot de passe</a></li>
                        <li><a href="#">Paramètres de confidentialité</a></li>
                        <li><a href="#">Notifications</a></li>
                    </ul>
                </div>
            </div>
        
            <div id="help" class="content">
                <div class="sub-window">
                    <h2>Help & Support</h2>
                    <p>Obtenez de l'aide et du support.</p>
                    <p>Contactez-nous à support@example.com</p>
                </div>
            </div>
        
            <div id="mission" class="content">
                <div class="sub-window">
                    <h2>Mission</h2>
                    <p>Voici les détails de votre mission.</p>
                    <img src="image2.png" alt="Mission Image 1">
                    <img src="image3.png" alt="Mission Image 2">
                </div>
            </div>
        
            <div id="logout" class="content">
                <div class="sub-window">
                    <h2>Logout</h2>
                    <p>Vous êtes déconnecté.</p>
                    <button onclick="alert('Vous êtes déconnecté')">Confirmer</button>
                </div>
            </div>
        </div>
        </div>



        </div>
   

    <!-- Sidebar -->
    <div class="sidebar">
        <div class="workspace">
            <div class="icon">E</div>
            <h2>Workspace</h2>
        </div>
        <nav>
            <ul>
                <li id="myProjectBtn" class="Projet"><i class="fa-solid fa-diagram-project"></i><span>MyProject</span>
                </li>
                <li id="teamBtn" class="team"><i class="fa-solid fa-users"></i><span>Team</span></li>
                <li id="documentsBtn" class="doc"><i class="fa-solid fa-file"></i><span>Documents</span></li>
                <li class="task-workS"><i class="fas fa-tasks"></i><span>Tasks</span></li>
            </ul>
        </nav>
    </div>

    <!-- Contenu principal -->
    <div class="container">
        <div id="myProjectsPage" class="content">
            <!-- Ajoutez ce bouton -->

            <div class="board">
                <div class="MyProject">
                    <h1><i>My Projects</i></h1>
                    <button id="viewProjectBtn" class="viewproject">
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                </div>

                <!--  
            <div class="board">
                <h1 class="MyProject"><i>My Projects</i></h1>
                <button id="viewProjectBtn"  class="viewproject"> <i class="fa-solid fa-caret-down"></i></button>
                -->

                <div class="board-project">
                    <div class="ajouter-projet">+</div>

                    <div class="projet" id="projet1">Projet 1</div>
                    <div class="projet">Projet 2</div>
                    <div class="projet">Projet 3</div>
                </div>
            </div>

        </div>

        <div id="viewProjectPage" class="content" style="display: none;">
            <h3>View Projects</h3>
            <div class="search-project-container">
                <input type="text" id="searchInput" placeholder="Search projects..." class="search-project-input">
                <button class="search-project-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <table class="project-table">
                <thead>
                    <tr>
                        <th>Projet</th>
                        <th>Description</th>
                        <th>Date de Début</th>
                        <th>Date de Fin</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
               


                </thead>
                <tbody>
                    <tr>
                        <td>platforme de gestion de projet</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. </td>
                        <td>10 mars 2025</td>
                        <td>1 Avril 2025</td>
                        <td><span class="status in-progress">En cours</span></td>
                        <td>
                            
                            
                                <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                           
                        </td>
                    </tr>
                    <tr>
                        <td>Application e-commerce</td>
                        <td>Lorem ipsum, dolor sit amet consectetur adipisicing eli</td>
                        <td>10 Janvier 2023</td>
                        <td>10 Décembre 2023</td>
                        <td><span class="status completed">Terminé</span></td>
                        <td>
                            
                           
                                <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
            
            
        </div>



        <div id="task-board" class="Tasks">
            <div class="projetX-bar">
              <div class="nomProjet">
                <button id="back"><i class="fa-solid fa-arrow-left"></i></button>
                <h1><i>projet1</i></h1>
                <button>DashBord</button>
              </div>
              <div class="infoProjet">
                <button><i class="fa-solid fa-comments"></i></button>
                <button><i class="fa-solid fa-user-plus"></i></button>
                <button>membres</button>
              </div>
            </div>
          
            <div class="task-content">
              <div class="create-taches">
                <button id="add-task"><i class="fa-solid fa-plus"></i> Ajouter une tache</button>
                <div class="tache-info">
                  <input type="text" placeholder="enter le nom du tache" class="tache-name"><br>
                  <input type="date" class="tache-deadline"><br> <!-- Add this line -->
                  <button>enregistrer</button>
                  <button>annuler</button>
                </div>
          
                <div class="apparaition-tache">
                  <!-- <div class="task_et_etat" id="task1">
                    <p class="task">task</p>
                    <button class="status">TO DO</button>
                  </div>
                  <div class="task_et_etat" id="task2">
                    <p class="task">task</p>
                    <button class="status">DOING</button>
                  </div>
                  <div class="task_et_etat" id="task3">
                    <p class="task">task</p>
                    <button class="status">DONE</button>
                  </div> -->
                </div>
              </div>
          
              <div class="Suivi-taches">
                <b>SUIVI</b>
                <button id="hide">>></button>
                <div class="status-column">
                  <em>TO DO</em>
                  <div class="task">Task</div>
                </div>
                <div class="status-column">
                  <em>DOING</em>
                  <div class="task">Task</div>
                </div>
                <div class="status-column">
                  <em>DONE</em>
                  <div class="task">Task</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="todo-list-container">
            <h1>Todo List</h1>
            <button class="masquer-todo">X</button>
              <div class="input-container" data-testid="list">
              <input class="todo-input" placeholder="Add a new task...">
              <button class="add-button">
                <i class="fa fa-plus-circle"></i>
              </button>
            </div>
            <div class="filters">
              <div class="filter" data-filter="completed">Complete</div>
              <div class="filter" data-filter="pending">Incomplete</div>
              <div class="delete-all">Delete All</div>
            </div>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
            <div class="progress-percentage">0%</div>
            <div class="todos-container">
              <ul class="todos"></ul>
              <img class="empty-image" src="">
            </div>
          </div>
          
          





        <div id="teamPage" class="content" style="display: none;">
            <div class="header2">
                <h3>View users</h3>

                <div class="inspirational-title">
                    <h2>"No success happens alone."

                    </h2>
                    <p> Add your team and build something incredible together!</p>
                </div>
                <div>

                    
                    <button  id="addUserButton">Add users</button>
                   
    <!-- Box pour ajouter un utilisateur -->



                </div>
            </div>


            <!-- Barre de recherche -->
            <div class="search-bar-container">
                <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>

                <input type="text" id="searchTeamInput" placeholder="Search for people and teams" class="search-input">
            </div>

            <!-- Section des membres -->
            <div class="team-section">
                <h2>Users</h2>



                <!-- Liste des membres -->
                <div class="team-list">


                    <div class="team-member">
                        <div class="avatar">BK</div>
                        <div class="member-info">
                            <h3>Basma El kasimi</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing.
                            </p>
                            <span class="status">Online</span>
                        </div>
                    </div>
                    <div class="team-member">
                        <div class="avatar">SN</div>
                        <div class="member-info">
                            <h3>Someone Name</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <span class="status">Offline</span>
                        </div>
                    </div>


                    <!-- Ajoutez d'autres membres ici -->
                </div>
            </div>
    <!-- Formulaire pour ajouter un utilisateur -->
    <div id="addUserForm" class="box">
        <h2>Invite a Collaborator to the Project</h2>
        <input type="text" id="user-name" placeholder="Full name" required>
        <input type="email" id="user-email" placeholder="Email" required>
      
        <button id="save-user">Add</button>
        <button id="close-add-user-box">Close</button>
    </div>
</div>
      
    
  





        <!-- Box pour ajouter un projet -->
        <div id="box-ajouter-un-projet" class="box">
            <h2>Add a Project</h2> <!-- Titre en anglais -->
            <input type="text" id="project-name" placeholder="Project Name"> <!-- Nom du projet -->
            <textarea id="project-description" placeholder="Description"></textarea> <!-- Description -->
            
            <input type="email" id="emails" name="emails[]" placeholder="Add members (emails)" multiple required> <!-- Ajouter des membres -->
            
            <label for="datedebut">Start Date:</label> <!-- Date de début -->
            <input type="date" id="datedebut" placeholder="Start Date">
            
            <label for="datefin">End Date:</label> <!-- Date de fin -->
            <input type="date" id="datefin" placeholder="End Date">
            
            <button id="save-project">Save</button> <!-- Sauvegarder -->
            <button id="close-add-box">Close</button> <!-- Fermer -->
        </div>




    
    <!-- Box pour afficher le détail d'un projet -->
       <!-- <div id="box-details-projet" class="box">
        <h2>Détails du projet</h2>
    
        <p><strong>Nom :</strong>
        <span id="project-details-name"></span>
        </p>
    
        <p><strong>Description :</strong>
        <span id="project-details-description"></span>
        </p>
    
        <p><strong>Membres :</strong>
        <span id="project-details-members"></span>
        </p>
    
        <p><strong>Deadline :</strong>
        <span id="project-details-deadline"></span>
        </p>
    
        <button id="close-details">Fermer</button>
    
    </div> -->
    
    
    
    <!-- end_salma-->
    


    
    
    
    </div>
    







  <script src="layout/js/principal.js"></script>
</body>

</html>

