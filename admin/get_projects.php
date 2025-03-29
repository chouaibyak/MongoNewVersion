<?php
header('Content-Type: application/json');
include 'connect.php';

try {
    $stmt = $con->prepare("SELECT * FROM projet ORDER BY dateCreation DESC");
    $stmt->execute();
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($projects);
} catch (PDOException $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>