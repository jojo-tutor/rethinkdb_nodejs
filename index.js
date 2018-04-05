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

async function createTable() {
    console.log('@createTable')
    await
        r   .db('test').tableCreate('users')
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
}

async function insertDataToTable() {
    console.log('@insertDataToTable')
    await
        r   .table('users')
            .insert([
                {
                    name: 'Kelly Klarkson',
                    age: 45,
                    gender: 'Female',
                    status: 'Active'
                }
            ])
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
}

async function queryData() {
    console.log('@queryData')
    await
        r   .table('users')
            .run(connection, (err, cursor) => {
                if (err) {
                    throw err
                }
                cursor
                    .toArray((err, result) => {
                        if (err) {
                            throw err
                        }
                        console.log(JSON.stringify(result, null, 2))
                    })
            })

}

async function queryDataWithFilter() {
    console.log('@queryDataWithFilter')
    await
        r   .table('users')
            .filter(r.row('name').eq('John Doe'))
            .run(connection, (err, cursor) => {
                if (err) {
                    throw err
                }
                cursor
                    .toArray((err, result) => {
                        if (err) {
                            throw err
                        }
                        console.log(JSON.stringify(result, null, 2))
                })
            })

}

async function queryDataById() {
    console.log('@queryDataById')
    await
        r   .table('users')
            .get('cc3f45f6-c8da-4cfb-a01c-7291e9368481')
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
}

async function feedListener() {
    console.log('@feedListener')
    await
        r   .table('users')
            .changes()
            .run(connection, (err, cursor) => {
                if (err) {
                    throw err
                }
                cursor
                    .each((err, row) => {
                        if (err) {
                            throw err
                        }
                        console.log(
                            `NEW_FEED: ${JSON.stringify(row, null, 2)}`
                        )
                    })
            })
}

async function updateAllData() {
    console.log('@updateAllData')
    await
        r   .table('users')
            .update({ status: 'Active' })

}

async function updateData() {
    console.log('@updateData')
    await
        r   .table('users')
            .filter(r.row('name')
            .eq('Kelly Klarkson'))
            .update({ age: 21 })
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
        
}

async function updateDataWithNewField() {
    console.log('@updateDataWithNewField')
    await
        r   .table('users')
            .filter(r.row('name')
            .eq('Kelly Klarkson'))
            .update({ age: 21, hobbies: ['Basketball'] })
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
        
}

async function main() {
    console.log('@START')
    await connect()
    await feedListener()
    // await createTable()
    // await insertDataToTable()
    // await queryData()
    // await queryDataWithFilter()
    // await queryDataById()
    // await updateData()
    await updateDataWithNewField()
    console.log('@END')
    process.exit(1)
}

main()