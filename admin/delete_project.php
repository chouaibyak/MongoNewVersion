<?php
include 'connect.php';

header('Content-Type: application/json'); // Always set content type for API responses

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $projectId = $_GET['id'] ?? null;
    
    if ($projectId) {
        try {
            $stmt = $con->prepare("DELETE FROM projet WHERE ProjeID = ?");
            $stmt->execute([$projectId]);
            
            if ($stmt->rowCount() > 0) {
                http_response_code(204); // No Content for successful deletion
                exit(); // End script after sending 204
            } else {
                http_response_code(404); // Not Found if no rows were affected
                echo json_encode(['error' => 'Projet non trouvé']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la suppression: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'ID du projet manquant']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>