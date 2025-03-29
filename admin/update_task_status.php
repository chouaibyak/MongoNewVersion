<?php
header('Content-Type: application/json');
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    if (empty($data['task_id'])) throw new Exception("Task ID is required");
    if (empty($data['new_status'])) throw new Exception("New status is required");

    $stmt = $con->prepare("UPDATE taches SET status = ? WHERE id = ?");
    $stmt->execute([$data['new_status'], $data['task_id']]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['error' => $data['new_status'] ?? 'TO DO',
        $data['date_echeance'] ?? null
    ]);

    echo json_encode(['success' => true, 'task_id' => $con->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>