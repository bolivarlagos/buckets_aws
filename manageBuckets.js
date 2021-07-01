const AWS = require('aws-sdk')
const fs = require('fs')
const { awsCredentials, api_Version } = require('./config')

const option = process.argv[2]
const uploadBucket = process.argv[3]
const uploadFile = process.argv[4]

let bucketParams = {
    Bucket: uploadBucket, 
    Key: uploadFile,
    Body: fs.ReadStream(uploadFile)
}

AWS.config.update(awsCredentials)
const s3 = new AWS.S3(api_Version)

async function  upload(){
    try {        
        s3.listBuckets((error, data) => {
            if(error) throw new Error(error)
            data.Buckets.map(bucket => {
                if(bucket.Name === uploadBucket){
                    s3.upload(bucketParams, (error, data) => {
                        if(error) throw new Error(error)
                        console.log(data)
                        process.exit(true)
                    })                                                 
                }                
            })
            let newBucket = {
                Bucket: uploadBucket
            }
            s3.createBucket(newBucket, (error, data) => {
                if(error) throw new Error(error)
                s3.putObject(bucketParams, (err, data) => {
                    if(err) throw new Error(err)
                    console.log(data)
                    process.exit(true)
                })
            })          
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

function delete_(){
    console.log('delete')
}

function list_(){
    console.log('list')
}

try {
    if(process.argv[2] === 'upload'){
        if (process.argv.length < 5) 
            throw new Error('You must include Bucket name and file')  
    } else {
        if (process.argv.length < 4) 
        throw new Error('You must include option(list || delete) and Bucket name')  
    }
    switch(option){
        case 'upload':
            upload()
            break
            
        case 'delete':
            delete_()
            break
        case 'list':
            list_()
            break
        default:
            throw new Error('Invalid option (upload || delete || list)')
    }
} catch (error) {
    console.log(error)    
    process.exit(true)
}
// bucket name meu-backup-na-aws
