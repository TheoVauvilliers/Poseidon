/**
 * Insert data in database
 * 
 * @param {Array} data Array of object
 */
export const insertData = async (mongo, data) => {
    const history = mongo.collection('history')
    let bulk = history.initializeUnorderedBulkOp()

    for (const streamerObj of data) {
        for (const viewer of streamerObj.viewers) {
            bulk.find({ name: viewer }).upsert().update({
                $push: {
                    'liveWatched': {
                        $each: [
                            {
                                'name': streamerObj.streamer,
                                'watchedAt': new Date().toISOString().slice(0, 19)
                            }
                        ]
                    }
                }
            })
        }
    }

    bulk.execute()
}

/**
 * @param {Object} mongo
 * @param {String} username
 * @returns {Array | Boolean} Return the array if user exists otherwise return false
 */
export const getUser = async (collection, username) => {
    const result = await collection.find({ 'name': username }).toArray()

    return (result ? result : false)
}

/**
 * ! Don't use this function for prod, it's a test function
 * 
 * @param {Object} collection 
 */
async function insert(collection) {
    const data = {
        'name': 'Muppet',
        'liveWatched': [
            {
                'name': 'Chtitou',
                'watchedAt': 'DateTime' // 20:00
            },
            {
                'name': 'Artoflamingo',
                'watchedAt': 'DateTime' // 20:15
            },
            {
                'name': 'Chtitou',
                'watchedAt': 'DateTime' // 15:00
            }
        ]
    }

    const result = await collection.insertOne(data);
    console.log(result)
}


/**
 * Comment la donnée sera en db
[
    {
        _id: '3514rgvc62za6vtrc',
        name: 'theo',
        liveWatched: [
            {
                name: 'gotaga',
                rwatchedAt: DateTime // 20:00
            },
            {
                name: 'gotaga',
                watchedAt: DateTime // 20:15
            },
            {
                name: 'toto',
                watchedAt: DateTime // 15:00
            }
        ]
    },
    {
        _id: '3514rgvc62za6vtrc',
        name: 'antonin',
        liveWatched: [
            {
                name: 'claude',
                watchedAt: DateTime // 20:00
            },
            {
                name: 'gotaga',
                watchedAt: DateTime // 20:15
            },
            {
                name: 'gotaga',
                watchedAt: DateTime // 15:00
            }
        ]
    }
]
 */