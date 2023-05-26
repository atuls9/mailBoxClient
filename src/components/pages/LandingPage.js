import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { receivedActions } from "../store/received";
import "./LandingPage.css";
import Compose from "../Compose";
import axios from "axios";
import ReadMail from "../ReadMail";
import { authActions } from "../store/auth";

function LandingPage() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const items = useSelector((state) => state.received.receivedMails);
  // const read = useSelector((state) => state.received.receivedMails);
  const [readMail, setReadMail] = useState([]);
  const [isReadMail, setIsReadMail] = useState(false);

  const dispatch = useDispatch();
  let emaliRegEx;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    if (auth) {
      // eslint-disable-next-line
      emaliRegEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");
      axios
        .get(
          `https://mailboxclient-24879-default-rtdb.firebaseio.com/${emaliRegEx}/received.json`
        )
        .then((res) => {
          console.log(" getdata", res);
          if (res.data) {
            const firebaseIDs = Object.keys(res.data);
            console.log("firebaseIDs", firebaseIDs);
            const newItems = [];
            Object.values(res.data).forEach((el) => {
              console.log("el.body", el.body);

              newItems.push({
                ...el.body,
                id: firebaseIDs[newItems.length],
                key: firebaseIDs[newItems.length],
              });
            });
            console.log("newItems", newItems);
            dispatch(receivedActions.getReceivedMail(newItems));
          }
          // dispatch(expenseActions.getItems(newItems));
        });
    }
  }, [auth]);

  const readMailHandler = (item) => {
    setReadMail(item);
    setIsReadMail(true);
    console.log("item", item);
    let toRefRgx = "";
    toRefRgx = item.myEmail.replace(/[^a-zA-Z0-9 ]/g, "");

    let bodyReceived = {
      ...item,
      read: true,
    };

    axios
      .put(
        ` https://mailboxclient-24879-default-rtdb.firebaseio.com/${toRefRgx}/received/${item.id}.json`,

        { body: bodyReceived }
      )
      .then((res) => {
        console.log("bodyreceived", bodyReceived);
        dispatch(receivedActions.readMail(bodyReceived));
      });
  };

  let count = 0;

  // useEffect(() => {
  let Items = items.map((item) => {
    if (item.read === false) {
      count++;
    }

    return (
      <tr className="text-dark fw-bold" key={item.key}>
        <td className="text-dark fw-bold">
          {" "}
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
        </td>
        <td>
          {!item.read && <span class="badge rounded-pill bg-primary">UR</span>}
        </td>
        <td className="text-start" style={{ width: "200px" }}>
          {item.receivedFrom}
        </td>{" "}
        <td
          className="text-dark  text-start"
          style={{ cursor: "pointer" }}
          onClick={() => readMailHandler(item)}
        >
          {" "}
          {item.data}
        </td>
        {/* <td onClick={}></td> */}
      </tr>
    );
  });
  // }, [items, auth]);

  return (
    <div className="container mt-5 ">
      <div className="mt-5"> </div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item className="text-start" action href="#compose">
                Compose
              </ListGroup.Item>
              <ListGroup.Item className="text-start" action href="#link1">
                Inbox<span class="badge bg-warning float-end">{count}</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-start" action href="#link2">
                Sent
              </ListGroup.Item>
              <ListGroup.Item
                className="text-start"
                action
                onClick={() => console.log(" clicked")}
              >
                Draft
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            {isReadMail && (
              <ReadMail item={readMail} setIsReadMail={setIsReadMail} />
            )}
            {!isReadMail && (
              <Tab.Content>
                <Tab.Pane eventKey="#compose">
                  <Compose name="atul" />
                </Tab.Pane>
                <Tab.Pane eventKey="#link1">
                  <Table>
                    <thead>
                      <tr className="fs-5 text-danger">
                        <th className="fs-5 text-danger">
                          {" "}
                          <input
                            disabled
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                        </th>
                        <th></th>
                        <th className="fs-5 text-danger">Received from</th>
                        <th>Data</th>
                        {/* <th></th> */}
                      </tr>
                    </thead>
                    <tbody>{Items}</tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane> </Tab.Pane>
              </Tab.Content>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default LandingPage;
