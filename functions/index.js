const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const { Storage } = require('@google-cloud/storage');


const gcs = new Storage({
    projectId: "parking-lot-315218",
    keyFilename: "./parking-lot-315218-badd83dc2364.json"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.uploadFile = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            // Return a "method not allowed" error
            return res.status(405).json({
                message: "Not allowed"
            });
        }
        const busboy = new Busboy({ headers: req.headers,
            limits: {
                // Cloud functions impose this restriction anyway 
                fileSize: 10 * 1024 * 1024, // 10MB/File
              }
        });
        let uploadData = null;

        // This code will process each file uploaded.
        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            // Note: os.tmpdir() points to an in-memory file system on GCF
            // Thus, any files in it must fit in the instance's memory.
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });

        // Triggered once all uploaded files are processed by Busboy.
        busboy.on("finish", () => {
            const bucket = gcs.bucket("parkalot-bucket");
            bucket
                .upload(uploadData.file, {
                    uploadType: "media",
                    metadata: {
                        metadata: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    res.status(200).json({
                        message: "Hey, It worked!"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
        busboy.end(req.rawBody);
    });
});
