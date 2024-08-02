// getName.js

const nameMap = {
    "edv_rd": "Ed",
    ".shamshir": "Kawa",
    "loopline": "Teo",
    "ogarmage": "Ale",
    "mindytyrone": "Bendik",
    "medelsnygg": "Danne",
    "marremarre": "Marre",
    "da_white_bernie_mac": "Micke",
    "kamyasso": "Kamy",
    "stibba2g4u": "Stibba",
    "nils4444": "Nils",
};

// Function to get the friendly name
function getName(discName) {
    return nameMap[discName] || discName;
}

// Export the function to be used in other files
module.exports = getName;
