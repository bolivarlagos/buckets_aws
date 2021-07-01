
function main() {
    let AWS = require('aws-sdk')
    const fs = require('fs')
    let { awsCredentials, api_Version } = require('./config')

    const uploadBucket = process.argv[2]
    const uploadFile = process.argv[3]

    AWS.config.update(awsCredentials)

    let s3 = new AWS.S3(api_Version)

    s3.listBuckets(async (error, data) => {
        try {
            data.Buckets.map(bucket => {
                if(bucket.Name === uploadBucket){                 
                    console.log('Create a function that uploads here and then exit')
                    let existentBucketParams = {
                        Bucket: uploadBucket, 
                        Key: uploadFile, 
                        Body: fs.ReadStream(uploadFile)
                    }
                    s3.putObject(existentBucketParams, function(err, data) {
                        if(err){
                            console.log(err)
                        } else {
                            console.log(data)
                            process.exit(true)
                        }
                    })                    
                }
            })
            console.log('Create a new bucket with the name ' + uploadBucket + ' here')
            let bucketParams = {
                Bucket: uploadBucket
            }
            
            s3.createBucket(bucketParams, (err, data) => {
                if(err){
                    console.log(err, err.stack)
                } else {
                    console.log(data)
                    console.log('Create a function to upload')                   

                    let params = {
                        Bucket: uploadBucket, 
                        Key: uploadFile, 
                        Body: fs.ReadStream(uploadFile)
                    }
                    s3.putObject(params, function(err, data) {
                        if(err){
                            console.log(err)
                        } else {
                            console.log(data)
                            process.exit(true)
                        }
                    })
                }
            })            
              
        } catch (error) {
            console.log(error)
        }
    })
}

try {
    if (process.argv.length < 4) throw new Error('You must include Bucket name and file')       
    main()
} catch (error) {
    console.log(error)    
    process.exit(true)
}


// bucket name meu-backup-na-aws
