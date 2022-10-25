const tcpp = require('tcp-ping');

const checkTarget = {
    address: 'localhost',
    port: 80
};

const checkTarget2 = {
    address: 'localhost',
    port: 8080
};

const promiseProbe = (targetSystem) => {
    return new Promise((resolve, reject) => {
        tcpp.probe(targetSystem.address, targetSystem.port, (err, available) => {
            if (!err) {
                console.log('tcp ping: ' + available);
                resolve(available);
            }
            reject(false);
        });
    });    
}

const mytest = async(targetSystem) => {
    const res = await promiseProbe(targetSystem);
    console.log("in mytest: " + res + " system: " + targetSystem.address + " port: " + targetSystem.port);
}

mytest(checkTarget)
mytest(checkTarget2)
