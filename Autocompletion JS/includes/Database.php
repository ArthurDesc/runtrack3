<?php

class Database {
    private $host = "localhost";
    private $db_name = "autocompletion";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->conn;
    }

    public function query($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
        $stmt->execute();
        return $stmt;
    }

    public function select($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        return $stmt->fetchAll();
    }

    public function selectOne($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        return $stmt->fetch();
    }

    public function fullSearch($term) {
        $term = "%$term%";
        $query = "SELECT id, nom FROM animaux WHERE nom LIKE :term";
        $stmt = $this->query($query, ['term' => $term]);
        
        $results = $stmt->fetchAll();
        
        // Séparation des résultats exacts et partiels
        $exact = [];
        $partial = [];
        foreach ($results as $result) {
            if (strcasecmp($result['nom'], trim($term, '%')) === 0) {
                $exact[] = $result;
            } else {
                $partial[] = $result;
            }
        }
        
        return [
            'exact' => $exact,
            'partial' => $partial
        ];
    }

    public function search($term) {
        error_log("Méthode search appelée avec le terme : " . $term);
        $term = "$term%";
        $query = "SELECT id, nom FROM animaux WHERE nom LIKE :term ORDER BY 
                  CASE 
                      WHEN nom LIKE :exact THEN 0 
                      ELSE 1 
                  END, 
                  nom ASC 
                  LIMIT 10";
        
        $stmt = $this->query($query, ['term' => $term, 'exact' => $term]);
        $results = $stmt->fetchAll();
        error_log("Résultats de la recherche : " . json_encode($results));
        return $results;
    }
}