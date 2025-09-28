"use server"
import { mongodbConnect } from "./mongodb";

export default async function submitUsers(user) {
    const collection = await mongodbConnect('users')
    const inserted = await collection.insertOne(user)
    const plainResult = {
        acknowledged: inserted.acknowledged,
        insertedId: inserted.insertedId.toString(), // ✅ convert ObjectId to string
    };

    // console.log(inserted)
    return plainResult
}