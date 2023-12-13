const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'der'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der'
    }
});

console.log('The private key is: ', privateKey.toString('hex'));
console.log();
console.log('The public key is: ', publicKey.toString('base64'));
console.log();
console.log('Api Key Base64 is: ', crypto.createHash('sha256').update(publicKey).digest('base64'));