import { DatabaseCreateContext, createDatabase } from "typeorm-extension";

export async function createDatabaseWithRetries(context: DatabaseCreateContext, maxRetries = 10, retryIntervalMs = 1000){
    let retries = 0;
    while(retries < maxRetries) {
        try {
            await createDatabase(context);
            return;
        } catch (error) {
            console.log(`Connection failed, retrying in ${retryIntervalMs / 1000} seconds...`);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryIntervalMs));
        }
    }
}