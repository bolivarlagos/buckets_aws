require('dotenv').config()
const { AWSAccessKeyId, AWSSecretKey } = process.env

const awsCredentials = {    
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
    region: 'us-east-1'
}

const api_Version = {
    apiVersion: '2006-03-01'
}

module.exports = {
    awsCredentials,
    api_Version
}
