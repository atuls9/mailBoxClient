import React, { useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const Compose = () => {
  let sentByRegex = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");

  const dataRef = useRef(" ");
  const subjectRef = useRef(" ");
  const toRef = useRef(" ");

  const [content, setContent] = useState("");

  const saveData = () => {
    // let toRefRgx = toRef.current.value.replace(/[^a-zA-Z0-9 ]/g, "");
    let body = {
      data: dataRef.current.value,
      emailSentBy: localStorage.getItem("email"),
      to: toRef.current.value,
      subject: subjectRef.current.value,
    };
    console.log(body);

    axios
      .post(
        ` https://mailboxclient-24879-default-rtdb.firebaseio.com/${sentByRegex}/sent.json`,
        body
      )
      .then((res) => console.log(res.data.name));
  };
  return (
    <div className="container md-8  p-4 mt-5" style={{ height: "500px" }}>
      <div className="mb-3 row">
        <label className="col-sm-1 col-form-label text-start">To</label>
        <div className="col-sm-11">
          <input
            type="email"
            className="form-control"
            id="inputPassword"
            ref={toRef}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-1 col-form-label text-start">Subject</label>
        <div className="col-sm-11">
          <input
            type="text"
            className="form-control"
            id="inputPassword"
            ref={subjectRef}
          />
        </div>
      </div>
      <div className="" style={{ height: " 330px", overflow: "auto" }}>
        <textarea
          rows="13"
          cols="150"
          onChange={(e) => setContent(e.target.value)}
          ref={dataRef}
          value={content}
        />
      </div>
      <button onClick={saveData} className="btn btn-primary btn-lg ">
        Send
      </button>
    </div>
  );
};

export default Compose;
