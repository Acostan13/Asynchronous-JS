const fs = require('fs')
const superagent = require('superagent')

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not found :/')
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('File not written :/')
            resolve('success')
        })
    })
}

// readFilePro(`${__dirname}/dog.txt`)
//     .then((data) => {
//         console.log(`Breed: ${data}`)

//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then((res) => {
//         console.log(res.body.message)

//         return writeFilePro('dog-img.txt', res.body.message)
//     })
//     .then(() => {
//         console.log('Random dog image saved to file!')
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })

// async functions will work on code while not affecting the event loop
// returns a promise
const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`)

        // Waiting for multiple promises simultaneously
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const allPro = await Promise.all([res1Pro, res2Pro, res3Pro])
        const imgs = allPro.map(img => img.body.message)
        console.log(imgs)

        await writeFilePro('dog-img.txt', imgs.join('\n'))
        console.log('Random dog image saved to file!')
    } catch (err) {
        console.log(err)
        throw err
    }
    return '2: READY 🐶'
}

// IFEE async await
(async () => {
    try {
        console.log('1: Will get dog pics!')
        const x = await getDogPic()
        console.log(x)
        console.log('3: Done getting dog pics!')
    } catch(err) {
        console.log('ERROR 💥', err)
    }
})()

/*
console.log('1: Will get dog pics!')
getDogPic()
    .then((x) => {
        console.log(x)
        console.log('3: Done getting dog pics!')
    })
    .catch((err) => {
        console.log('ERROR 💥')
    })
*/
