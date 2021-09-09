import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Layout from "../../components/layout/Layout";

const getMeetUpInfo = function (props) {
  //   console.log(props);
  return (
    <Fragment>
      <Layout />
      <div
        style={{
          maxWidth: "900px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2>{props.data.title}</h2>
        <img style={{ width: "100%" }} src={props.data.image}></img>
        <p>{props.data.description}</p>
      </div>
    </Fragment>
  );
};

export const getStaticPaths = async function () {
  const connection = await MongoClient.connect(
    "mongodb+srv://ashish:1234@cluster0.k1uso.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const dataBase = connection.db();
  const collection = dataBase.collection("meetUps");
  const dataArray = await collection.find().toArray();

  //   console.log(dataArray);

  connection.close();
  return {
    fallback: true,
    paths: dataArray.map((item) => {
      return {
        params: {
          meetUpId: item._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async function (context) {
  const meetUpId = context.params.meetUpId;

  const connection = await MongoClient.connect(
    "mongodb+srv://ashish:1234@cluster0.k1uso.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const dataBase = connection.db();
  const collection = dataBase.collection("meetUps");
  const dataObject = await collection.findOne({ _id: ObjectId(meetUpId) });

  const data = {
    id: dataObject._id.toString(),
    title: dataObject.title,
    image: dataObject.image,
    address: dataObject.address,
    description: dataObject.description,
  };

  connection.close();
  return {
    props: { data },
  };
};

export default getMeetUpInfo;
