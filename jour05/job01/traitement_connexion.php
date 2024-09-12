<?php
require_once 'autoload.php';
Session::start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $user = new User();
    $result = $user->login($email, $password);

    if ($result['success']) {
        Session::set('user', $result['user']);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $result['message']]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
