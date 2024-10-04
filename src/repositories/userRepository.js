const mysql = require('mysql2');

// Mysql connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Password can be root if you are using XAMPP
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {
    async findByDocumentNumber(documentNumber) {
        console.log(documentNumber)

        const [rows] = await promisePool.query('SELECT * FROM users WHERE documentNumber = ?', [documentNumber]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findByUserName(userName) {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [userName]);
        return rows.length > 0 ? rows[0] : null;
    }

    async createUser(user) {
        const { fullName, documentType, documentNumber, email, phone, userName, password } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO users (fullName, documentType, documentNumber, email, phone, username, password) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [fullName, documentType, documentNumber, email, phone, userName, password]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();