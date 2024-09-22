const crypto = require('crypto');

// Genera una clave aleatoria de 64 bytes (512 bits)
const jwtKey = crypto.randomBytes(64).toString('hex');

console.log('Tu nueva clave JWT:');
console.log(jwtKey);

console.log('\nAñade esta línea a tu archivo .env:');
console.log(`JWT_SECRET=${jwtKey}`);