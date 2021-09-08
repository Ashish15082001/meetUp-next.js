import { Fragment, useState } from "react";
import Layout from "../components/layout/Layout";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { Router, useRouter } from "next/router";

const NewMeetUP = function () {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const onAddMeetupHandler = async function (meetupData) {
    setIsSending(true);

    await fetch("/api/addNewMeetUp", {
      method: "Post",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSending(false);
    router.replace("/");
  };

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
        {isSending === false && (
          <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>
        )}
        {isSending === true && <h2>Sending newMeetUP data to server...</h2>}
      </div>
    </Fragment>
  );
};

export default NewMeetUP;
