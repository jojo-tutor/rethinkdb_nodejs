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
                    name: 'John Doe',
                    age: 20,
                    gender: 'Male',
                    status: 'Active'
                },
                {
                    name: 'Jason Bourne',
                    age: 33,
                    gender: 'Male',
                    status: 'Inactive'
                },
                {
                    name: 'Sheila Wicked',
                    age: 18,
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
                cursor.toArray((err, result) => {
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
                cursor.toArray((err, result) => {
                    if (err) {
                        throw err
                    }
                    console.log(JSON.stringify(result, null, 2))
                })
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