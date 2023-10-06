import {encoded, translations} from './data.js'

function decodeArrayOfObjects(encoded, translations) {
    const decoded = [];

    function decodeObject(obj) {
        const keysToSkip = ['groupId', 'service', 'formatSize', 'ca'];
        const decodedObject = {};
        for (let [key, value] of Object.entries(obj)){
            if (keysToSkip.includes(key)){
                decodedObject[key] = value;
                continue;
            }
            if (obj[key]){
                if (typeof translations[value] !== 'undefined')
                    decodedObject[key] = translations[value];
                else
                    decodedObject[key] = null;
            }
        }

        return decodedObject;
    }

    for (let obj of encoded) {
        decoded.push(decodeObject(obj));
    }

    return decoded;
}

console.log("Let's rock")
console.log(encoded, translations)

console.log(decodeArrayOfObjects(encoded, translations))
