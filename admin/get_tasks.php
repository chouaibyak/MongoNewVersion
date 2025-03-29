<?php
header('Content-Type: application/json');
include 'connect.php';

$projectId = $_GET['project_id'] ?? null;

try {
    if (!$projectId) throw new Exception("Project ID is required");
    
    $stmt = $con->prepare("SELECT * FROM taches WHERE projet_id = ?");
    $stmt->execute([$projectId]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($tasks);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>