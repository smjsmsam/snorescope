const {run} = require('./db_connect')

async function connect() {
    try {
        const db = await run();
        return db;
    }
    catch (error) {
        console.error('DB Connection Error in operations');
    }
}

async function insertDay(db, date_input, scale_input, datetime_input) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const day_input = db.collection("DayInput");
        await day_input.insertOne({
            date: date_input,
            scale: scale_input, 
            datetime: datetime_input,
        });
        console.log('Inserted');
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}

async function insertNight(db, date_input, starttime_input, endtime_input) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const night_input = db.collection("NightInput");
        await night_input.insertOne({
            date: date_input,
            start_time: starttime_input, 
            end_time: endtime_input,
        });
        console.log('Inserted');
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}

async function deleteDay(db, scale_input, datetime_input) { // Unused Function
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const day_input = db.collection("DayInput");
        await day_input.deleteOne({
            scale: scale_input, 
            datetime: datetime_input,
        });
        console.log('Deleted');
    }
    catch (error) {
        console.error('Delete error', error);
    }
}

async function updateDay(db, scale_input, datetime_input) { // Unused Function
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const day_input = db.collection("DayInput");
        await day_input.updateOne(
            {scale: scale_input,}, // find
            {$set: {datetime: 'hi'} } // update the value in that set
        );
        console.log('Updated');
    }
    catch (error) {
        console.error('Update error', error);
    }
}

async function retrieveList(db, collection_name) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
        }
        const collection = db.collection(collection_name);
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
        return documents;
    } catch (error) {
        console.error('Fetch error', error);
    }
}


async function execute() {
    const db = await connect();
    await retrieveList(db, 'DayInput');
}

module.exports = {
    connect,
    insertDay,
    insertNight,
    deleteDay,
    updateDay,
    retrieveList
}