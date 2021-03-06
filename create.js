import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success, failure} from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        console.log(params);
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}

// note id '8694ddc0-4e98-11ea-84b4-1b9b7a687c50'