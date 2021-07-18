const fs = require('fs');
const util = require('util');

function getActiveUsers(users, blockedUsers) {
    return users.filter((user) => !blockedUsers.includes(user))
}

const readFile = util.promisify(fs.readFile);

async function getUsersFromFile() {
    const file = await readFile("./users.txt")
    const users = await file.toString().split("\n")
    return users
}

async function getBlockedUsersFromFile() {
    const file = await readFile("./blocked.txt")
    const users = await file.toString().split("\n")
    return users
}

function getActiveUsersPerformance(users, blockedUsers) {
    const dictironaryBlockedUsers = new Map();
    blockedUsers.forEach((user) => {
        dictironaryBlockedUsers.set(user, true);
    })

    return users.filter((user) => !dictironaryBlockedUsers.has(user))
}

console.time()

async function getUsersFromFileAndCallFilterMethod () {
    const usersFromFile = await getUsersFromFile()
    const blockedUsers = await getBlockedUsersFromFile()
    getActiveUsersPerformance(usersFromFile, blockedUsers)
}

getUsersFromFileAndCallFilterMethod();

console.timeEnd()



