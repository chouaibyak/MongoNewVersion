<?php
header('Content-Type: application/json');
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    if (empty($data['projet_id']) throw new Exception("Project ID is required"));
    if (empty($data['nom'])) throw new Exception("Task name is required");

    $stmt = $con->prepare("INSERT INTO taches (projet_id, nom, description, status, date_echeance) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['projet_id'],
        $data['nom'],
        $data['description'] ?? '',
        $data['status'] ?? 'TO DO',
        $data['date_echeance'] ?? null
    ]);

    echo json_encode(['success' => true, 'task_id' => $con->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>