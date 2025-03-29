<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");

try {
    $projectId = $_GET['id'] ?? null;
    
    if (!$projectId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID manquant']);
        exit;
    }

    $con->beginTransaction();

    // Suppression des dépendances
    $stmtTasks = $con->prepare("DELETE FROM taches WHERE projet_id = ?");
    $stmtTasks->execute([$projectId]);

    // Suppression du projet
    $stmtProject = $con->prepare("DELETE FROM projet WHERE ProjeID = ?");
    $stmtProject->execute([$projectId]);

    if ($stmtProject->rowCount() > 0) {
        $con->commit();
        http_response_code(204); // No Content - pas de body
        exit;
    } else {
        $con->rollBack();
        http_response_code(404);
        echo json_encode(['error' => 'Projet non trouvé']);
        exit;
    }
} catch (PDOException $e) {
    $con->rollBack();
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur de suppression',
        'details' => $e->getMessage()
    ]);
    exit;
}
?>