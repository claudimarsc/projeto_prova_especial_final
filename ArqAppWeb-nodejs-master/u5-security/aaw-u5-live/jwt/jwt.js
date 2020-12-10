// importar as bibliotecas para o JWT
const jwt = require('jsonwebtoken')

const crypto = require('crypto')

// gerar senhas aleatórias
let secret = crypto.randomBytes(64).toString('hex')

console.log('secret: ' + secret)

let secret2 = crypto.randomBytes(64).toString('hex')

let user = {id: '123456789', name: 'José Pereira'}

// gerar um token JWT
let token = generateAccessToken(user, secret)

let token2 = generateAccessToken(user, secret2)

console.log('token: ' + token)

// Validar o token gerado
let resp = verifyToken(token2, secret2)
console.log('Resultado de validação do token: ' + JSON.stringify(resp))

function generateAccessToken(user, secret) {
    return jwt.sign(user, secret);
}

function verifyToken(token, secret) {
    let resp

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            resp = {error: 'ERROR: JWT Inválido!'}
        } else {
            console.log('\n\nToken ok: ' + JSON.stringify(user))
            resp = user
        }
    });

    return resp
}