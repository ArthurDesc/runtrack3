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
        $term = strtolower($term); // Convertir en minuscules pour une recherche insensible à la casse
        $exactTerm = "$term%";
        $partialTerm = "%$term%";
        
        $query = "SELECT id, nom,
                  CASE 
                      WHEN LOWER(nom) LIKE :exactTerm THEN 0
                      ELSE 1
                  END AS match_type
                  FROM animaux 
                  WHERE LOWER(nom) LIKE :partialTerm
                  ORDER BY match_type, nom ASC 
                  LIMIT 10";
        
        $stmt = $this->query($query, ['exactTerm' => $exactTerm, 'partialTerm' => $partialTerm]);
        return $stmt->fetchAll();
    }
}