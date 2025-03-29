<?php
header('Content-Type: application/json');
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    // Insertion du projet
    $stmt = $con->prepare("INSERT INTO projet (nom, description, dateDebut, dateFin) 
                          VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['description'],
        $data['start_date'],
        $data['end_date']
    ]);
    
    $projectId = $con->lastInsertId();
    
    // Insertion des membres (si emails fournis)
    if (!empty($data['emails'])) {
        $memberStmt = $con->prepare("INSERT INTO projet_membres (projet_id, email) VALUES (?, ?)");
        foreach ($data['emails'] as $email) {
            $memberStmt->execute([$projectId, $email]);
        }
    }
    
    echo json_encode([
        'success' => true,
        'project_id' => $projectId
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>