/**
 * Upsert the database with the new data
 *
 * @param mongoCollection
 * @param {Array} data Array of object
 */
export const bulkUpsertHistory = async (mongoCollection, data) => {
    const bulk = mongoCollection.initializeUnorderedBulkOp()

    for (const streamer of data) {
        for (const viewer of streamer.viewers) {
            bulk.find({ name: viewer }).upsert().update(buildUpsertHistory(streamer.name))
        }
    }

    bulk.execute()
}

/**
 * Prepare JSON to upsert the database with the new data
 *
 * @param {String} streamerName User ID
 * @return {JSON} Return request to execute
 */
const buildUpsertHistory = (streamerName) => ({
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
