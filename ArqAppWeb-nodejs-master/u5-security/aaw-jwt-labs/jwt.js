const jwt = require('jsonwebtoken')

const crypto = require('crypto')

// gerando as senhas
let secret = crypto.randomBytes(64).toString('hex')
console.log('Senha correta: ')
console.log(secret + '\n')

let secret2 = crypto.randomBytes(64).toString('hex')
console.log('Senha incorreta: ')
console.log(secret2 + '\n')

// objeto a ser serializado pelo JWT
let user = {id : '7d2d3932-e0df-4259-8062-179d652e3e13', name : 'John Doe'}

// cria o token utilizando a senha
let token = generateAccessToken(user, secret)

console.log('Token gerado: ' + token)

let resp = verifyToken(token, secret2)
console.log('\nToken validado com erro: ' + JSON.stringify(resp))

let token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.hDyICUnkCrwFJnkJHRSkwMZNSYZ9LI6z2EFJdtwFurA'
resp = verifyToken(token2, secret)
console.log('\nToken validado com erro: ' + JSON.stringify(resp))

resp = verifyToken(token, secret)
console.log('\nToken validado com sucesso: ' + JSON.stringify(resp))

function generateSecret(size, format) {
    return crypto.randomBytes(size).toString(format)
}

function generateAccessToken(user, secret) {
  return jwt.sign(user, secret, { expiresIn: '20s' })
}

function verifyToken(token, secret) {
    let resp
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            resp = {error: 'ERROR: JWT invalid'}
        } else {
            console.log('\n\ntoken ok: ' + JSON.stringify(user))
            resp = user
        }
    })

    return resp
}