import admin from 'firebase-admin'

var serviceAccount = {
    "type": "service_account",
    "project_id": "equiment-supplier",
    "private_key_id": "be1b1b5e04edf5d303bc1a4b61acc26d4de58ca7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkY3D3aXZ5V5WN\nf1O7eX/qboRhDz8YLNPT6zUAd0fraH8hKXADVbhB5NcYZ3fTPmqMiKwNvd73MGbx\nyDvNdmbd511SGLoAz3MI9NI6FqgKmOvhWKWzY3gW2UEz5vOMXYdpOpvRWmVdmV8d\n+WxRKfGUPILiftImon1bEQw7Ob6sz493hZkijNMJRojQaIf1rzLHK+IIOR3YFYGb\n5/GrVMnWr/s8RPTAZoBRiGcHT8bQ8P9UtZCgKWDJ91CyWvvzXllDUhuZB5NgijLl\n+r9CiZ4z4OwIDgtZkk5ODMItV3M0wptVKLegLYVUgThkiAcfqcyd609m3ZQuorgj\ntnZDQJCbAgMBAAECggEAK+5PQC809BSN6PSAAffkUVgblHyoleNU8KtIzMkTtTuF\nzezu/FUqGqH3QZRVF2T0wH29zSZSsaiDulWSdcQQlXjBHbFx88l8qoYSsGdhnQNk\n9iHkll4ct65zmFU9/OL5zwtUnMwVjr/wBWiko8QbxUuuhqzxqFWAPpf9ts4lwLSA\n66gGACHtP8Ah7xJPwKJ+5P0AA/0zTXDqMryKmVcT2lIhXvcSLeHjCKDUUlsp7wuo\nZqlJDFcnhxbtkGSxfwM0NS8VQPlle/kq+nudVJdxJ0azMN++swx5MBqOGi9TsvP1\nZrF2Ejy8YE7WQmkxRHTYDZB6uF2uattoqsROWRmyQQKBgQDnHjyzefUkQQic9hie\n72mcUwcciuiPY/07HUpRpW4+NsxXfaBDQ6tYRB5MWnVbmUQkD+YqxEEAFt2za0/r\nLXsM1918NwoShlER1SgHEgxF84MHhaQ6AVEpZnjGwNWo18fn1/vA8v53c4miRa1M\nwz8NLbapOnCGQ0X/HfJDKnnhEQKBgQC2Fhd/QBy0k0AH3s+A6MV2ibg9tqdNqYBw\nxY4kEtsY+oOceo0sMlSIV0LM1m5d2sa8ihlGnRTYHa3+z62T3Iin8el2qMjvMJlw\nwxT3Rdkkd8vOAXMXUZnsch7eYkiU63g5x4ElR44zfMPsDK3UYlmNCIj0gfVFsIRm\nYEoD84+W6wKBgQDk2qUi123uA1PDEVFZ+BosyG5vTgFxE4LKiXtxE43xnxOCwwvx\n70z47yLNWnmBRWgbCX9R89mle/72Thnp97Q0CIDyIhIgO86FCPxE3BM5JSMnTKdN\nJMa4ZxbLQGGRenIh2lYZPsTJhafQ/ovXSjLiGtUYB50q5eym7YFaDvJ28QKBgGYu\nJYdySemHjHIeNeHIPi9T/4EaQ+6QBRTDuA1ES5FL25lvKFO59rgAB+t9Fbgzcj0R\nXjfDJJRWq3KHxodoRYPBfFrrQr7/Tcv6nYRZvQ367/Kt25ElaLRIIkx3aPWw4enC\nrBVof0Mja6rGPrIlcs1zEa/sUeCGuvXcaQyonFZ7AoGAfHBmI5hRcn20wM2gk64T\nJQHUSh5BI31PMgfTDMHq3flVePUYp13/AqeUK5J4FR8S90hc2sXq4/iy38gJajgX\n4J1mb3ttYXX79h3F9xJtObllVtF8AvX+9XxVRAQICMOCdtBT8eRC9pSH8rfN8lqM\n/KzETK7Dnv4XK7uu5RiigJM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-l3qrg@equiment-supplier.iam.gserviceaccount.com",
    "client_id": "112791790478753657051",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l3qrg%40equiment-supplier.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://equiment-supplier.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://equiment-supplier.appspot.com");

export default bucket;