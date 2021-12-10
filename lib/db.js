/**
 * Upsert the database with the new data
 * 
 * @param {Object} mongo Mongo manager (this.mongo.db)
 * @param {Array} data Array of object
 */
export const upsertHistory = async (mongo, data) => {
    const history = mongo.collection('history')
    const bulk = history.initializeUnorderedBulkOp()

    for (const streamer of data) {
        for (const viewer of streamer.viewers) {
            bulk.find({ name: viewer })
                .upsert()
                .update(prepareUpsertHistory(streamer.name))
        }
    }

    bulk.execute()
}

/**
 * Prepare JSON to upsert the database with the new data
 * 
 * @param {String} streamerName
 * @return {JSON} 
 */
const prepareUpsertHistory = (streamerName) => ({
    $push: {
        liveWatched: {
            $each: [
                {
                    name: streamerName,
                    watchedAt: new Date()
                }
            ]
        }
    }
})