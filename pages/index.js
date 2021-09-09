import { MongoClient } from "mongodb";
import MeetUpList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { Fragment } from "react";

const homePage = function (props) {
  
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
        <MeetUpList meetups={props.data}></MeetUpList>;
      </div>
    </Fragment>
  );
};

export default homePage;

export const getStaticProps = async function () {
  const connection = await MongoClient.connect(
    "mongodb+srv://ashish:1234@cluster0.k1uso.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const dataBase = connection.db();
  const collection = dataBase.collection("meetUps");
  const dataArray = await collection.find().toArray();

  connection.close();

  return {
    props: {
      data: dataArray.map((item) => {
        return {
          id: item._id.toString(),
          title: item.title,
          image: item.image,
          address: item.address,
          description: item.description,
        };
      }),
    },
    revalidate: 1,
  };
};
