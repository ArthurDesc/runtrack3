<?php
require_once 'autoload.php';

class User {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function register($nom, $prenom, $email, $password) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$nom, $prenom, $email, $hashedPassword]);
    }

    public function login($email, $password) {
        try {
            $stmt = $this->db->prepare("SELECT id, nom, prenom, email, password FROM utilisateurs WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ['success' => false, 'message' => 'Email ou mot de passe incorrect'];
            }

            if (password_verify($password, $user['password'])) {
                unset($user['password']); // Ne pas renvoyer le hash du mot de passe
                return ['success' => true, 'user' => $user];
            } else {
                return ['success' => false, 'message' => 'Email ou mot de passe incorrect'];
            }
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Erreur lors de la connexion: ' . $e->getMessage()];
        }
    }
}
?>
