import nodeWebCam from 'node-webcam';
import fs from 'fs';
import path from 'path';

// specifying parameters for the pictures to be taken
var options = {
    width: 1280,
    height: 720, 
    quality: 100,
    delay: 1,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location"
};

// create instance using the above options
var webcam = nodeWebCam.create(options);

// capture function that snaps <amount> images and saves them with the given name in a folder of the same name
export var captureShot = (nameUser) => {
 // Make sure this returns a real url to an image.
 return new Promise(resolve => {
    var path = `./images/`;

    // create folder if and only if it does not exist
    if(!fs.existsSync(path)) {
        fs.mkdir(path, {recursive: true}, err => {})
    } 

    // capture the image
    webcam.capture(`./images/${nameUser}.${options.output}`, (err, data) => {
        if(err) {
            console.log(err);
        }

        resolve('/path/to/image.jpg')
    }); 
 })

};
