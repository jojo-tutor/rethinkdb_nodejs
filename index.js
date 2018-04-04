const r  = require('rethinkdb')

let connection

async function connect() {
    console.log('@connect')
    await
        r   .connect({ host: 'localhost', port: 28015 }, (err, conn) => {
                if (err) {
                    throw err
                }
                connection = conn
            })
}

async function main() {
    console.log('@START')
    await connect()
    // await createTable()
    // await insertDataToTable()
    await queryData()
    await queryDataWithFilter()
    console.log('@END')
    process.exit(1)
}

main()