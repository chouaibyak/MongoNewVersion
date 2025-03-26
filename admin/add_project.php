<?php
header('Content-Type: application/json');
session_start();

// Debug : Vérifiez l'état de la session
error_log('Session status: ' . print_r($_SESSION, true));

if (!isset($_SESSION['login_id']) || empty($_SESSION['login_id'])) {
    error_log('User not authenticated. Session: ' . print_r($_SESSION, true));
    echo json_encode([
        'success' => false,
        'error' => 'Vous devez être connecté pour ajouter un projet',
        'session_debug' => $_SESSION // À retirer en production
    ]);
    exit;
}

include 'connect.php'; // Assurez-vous que c'est le bon chemin

try {
    // Récupérer les données JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validation des données
    if (empty($data['name'])) {
        throw new Exception('Le nom du projet est requis');
    }

    // Vérifier si l'utilisateur est connecté
    if (!isset($_SESSION['login_id'])) {
        throw new Exception('Utilisateur non connecté');
    }

    // Préparation de la requête
    $query = "INSERT INTO projet (nom, description, dateCreation, status, proprietaireID, dateDebut, dateFin) 
              VALUES (:name, :description, NOW(), 'En cours', :owner_id, :start_date, :end_date)";
    
    $stmt = $con->prepare($query);
    
    // Liaison des paramètres
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':start_date', $data['start_date']);
    $stmt->bindParam(':end_date', $data['end_date']);
    $stmt->bindParam(':owner_id', $_SESSION['login_id'], PDO::PARAM_INT);
    
    // Exécution
    if ($stmt->execute()) {
        $project_id = $con->lastInsertId();
        
        // Ajout des membres si emails fournis
        if (!empty($data['emails'])) {
            foreach ($data['emails'] as $email) {
                $email = trim($email);
                if (!empty($email)) {
                    // Vérifier si l'utilisateur existe
                    $user_query = "SELECT id FROM users WHERE email = :email";
                    $user_stmt = $con->prepare($user_query);
                    $user_stmt->bindParam(':email', $email);
                    $user_stmt->execute();
                    
                    if ($user_stmt->rowCount() > 0) {
                        $user = $user_stmt->fetch(PDO::FETCH_ASSOC);
                        
                        // Ajouter à l'équipe du projet
                        $team_query = "INSERT INTO project_team (project_id, user_id) 
                                      VALUES (:project_id, :user_id)";
                        $team_stmt = $con->prepare($team_query);
                        $team_stmt->bindParam(':project_id', $project_id, PDO::PARAM_INT);
                        $team_stmt->bindParam(':user_id', $user['id'], PDO::PARAM_INT);
                        $team_stmt->execute();
                    }
                }
            }
        }
        
        echo json_encode([
            'success' => true,
            'project_id' => $project_id
        ]);
    } else {
        throw new Exception('Erreur lors de l\'insertion du projet');
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>