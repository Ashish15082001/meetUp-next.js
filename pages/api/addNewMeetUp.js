import { MongoClient } from "mongodb";

const addNewMeetUp = async function (request, response) {
  const data = request.body;

  const connection = await MongoClient.connect(
    "mongodb+srv://ashish:1234@cluster0.k1uso.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const dataBase = connection.db();
  const collection = dataBase.collection("meetUps");

  await collection.insertOne(data);

  connection.close();
  response.status(201).json({ message: "data stored succsessfully." });
  return response;
};

export default addNewMeetUp;
