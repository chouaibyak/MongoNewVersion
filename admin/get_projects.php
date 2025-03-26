<?php
include 'connect.php';
header('Content-Type: application/json');

try {
    $stmt = $con->query("SELECT * FROM projets");
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($projects);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>