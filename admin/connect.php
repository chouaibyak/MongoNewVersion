<?php
// Informations de connexion à la base de données
$dsn = 'mysql:host=localhost;dbname=mongo';  // Correction : $dsn au lieu de $dns
$user = 'root';
$pass = '';
$option = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',  // Définit l'encodage en UTF-8
);

try {
    // Connexion à la base de données
    $con = new PDO($dsn, $user, $pass, $option);

    // Définir le mode d'erreur PDO sur Exception
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  

    // Message de succès
    // echo 'You are connected, welcome to the database!';
} catch (PDOException $e) {
    // Gestion des erreurs de connexion
    echo 'Failed to connect: ' . $e->getMessage();
}
?>