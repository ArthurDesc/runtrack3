const mysql = require('mysql2/promise');
const fs = require('fs').promises;

// Configuration de la connexion à la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Ajoutez un mot de passe si nécessaire
  database: 'bigjob'
};

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connecté à la base de données MySQL');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw error;
  }
}

// Fonction pour insérer un utilisateur dans la base de données
async function insertUser(user) {
  const connection = await connectToDatabase();
  try {
    const [result] = await connection.execute(
      'INSERT INTO users (prenom, nom, email, password) VALUES (?, ?, ?, ?)',
      [user.prenom, user.nom, user.email, user.password]
    );
    console.log('Utilisateur inséré avec succès');
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Fonction pour exporter les données de data.json vers la base de données
async function exportDataToDatabase() {
  try {
    const data = await fs.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);

    for (const user of jsonData.users) {
      await insertUser(user);
    }

    console.log('Données exportées avec succès vers la base de données');
  } catch (error) {
    console.error('Erreur lors de l\'exportation des données:', error);
  }
}

// Fonction pour trouver un utilisateur par email
async function findUserByEmail(email) {
  const connection = await connectToDatabase();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0]; // Retourne le premier utilisateur trouvé ou undefined si aucun n'est trouvé
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = { insertUser, exportDataToDatabase, findUserByEmail };
