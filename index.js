const r  = require('rethinkdb')

let connection

/**
 * The connect function
 * @example async function connect() {
    console.log('@connect')
    await
        r   .connect({ host: 'localhost', port: 28015 }, (err, conn) => {
                if (err) {
                    throw err
                }
                connection = conn
            })
}
 */
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

/**
 * The create table function
 * @example async function createTable() {
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
 */
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

/**
 * The connect function
 * @example async function insertDataToTable() {
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
                    name: 'Riza Lim',
                    age: 32,
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
 */
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
                    name: 'Riza Lim',
                    age: 32,
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

/**
 * The query data function
 */
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

/**
 * The query data with filter function
 */
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

/**
 * The query data by id function
 */
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

/**
 * The change listener function
 */
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

/**
 * The update data function
 */
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

/**
 * The update data with new field function
 */
async function updateDataWithNewField() {
    console.log('@updateDataWithNewField')
    await
        r   .table('users')
            .filter(
                r   .row('name')
                    .eq('Kelly Klarkson')
            )
            .update({ age: 21, hobbies: ['Basketball'] })
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
        
}

/**
 * The append field to array function
 */
async function updateDataAppendFieldArray() {
    console.log('@updateDataAppendFieldArray')
    await
        r   .table('users')
            .filter(
                r   .row('name')
                    .eq('Kelly Klarkson')
            )
            .update({
                hobbies: r.row('hobbies')
                    .append('Football')
            })
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
        
}

/**
 * The delete data function
 */
async function deleteData() {
    console.log('@deleteData')
    await
        r   .table('users')
            .filter(
                r   .row('id')
                    .eq('649fdd55-45b4-42bf-86b7-de5e583fd1d9')
            )
            .delete()
            .run(connection, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(JSON.stringify(result, null, 2))
            })
}
/**
 * The main function
 */
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
    // await updateDataWithNewField()
    // await updateDataAppendFieldArray()
    // await deleteData()
    console.log('@END')
    process.exit(1)
}

main()