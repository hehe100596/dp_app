import React, { Component } from "react";

import { config } from "../../config";
import { globalApiInstance } from "../../utils/api";

class TestingPage extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // fetch data from database
  getDataFromDb = () => {
    fetch(config.BASE_API + "testing/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // create new query into database
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    globalApiInstance.post(config.BASE_API + "testing/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  // remove existing database information
  deleteFromDB = idTodelete => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === Number(idTodelete)) {
        objIdToDelete = dat._id;
      }
    });

    globalApiInstance.delete(config.BASE_API + "testing/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // overwrite existing database information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach(dat => {
      if (dat.id === Number(idToUpdate)) {
        objIdToUpdate = dat._id;
      }
    });

    globalApiInstance.post(config.BASE_API + "testing/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={dat.id}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default TestingPage;
