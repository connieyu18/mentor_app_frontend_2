import React from "react";
import axios from "../../utils";

import { Table, Button } from "antd";

import "./data-table.styles.scss";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Method",
    dataIndex: "method",
  },
];

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      availabilities: [],
      list: [],
      deletedData: [],
    };
  }

  componentDidMount() {
    let data = [];
    let token = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://localhost:5000/availability/getAvail",
      headers: { authorization: token },
    }).then((response) => {
      if (response.data.availabilities.length > 0) {
        const data1 = response.data.availabilities;
        for (var i = data1.length - 1; i >= 0; i--) {
          data.push({
            key: i,
            date: data1[i].start_date
              ? `${data1[i].start_date}-${data1[i].end_date}`
              : "N/A",
            time: data1[i].start_time
              ? `${data1[i].start_time}-${data1[i].end_time}`
              : "N/A",
            method: data1[i].method ? `${data1[i].method}` : "N/A",
          });
        }
        this.setState({
          availabilities: data,
          list: data1,
        });
      } else {
        console.log("no availabilities");
      }
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.newData != this.props.newData) {
      let newData = {
        key: this.state.availabilities.length,
        date: nextProps.newData.start_date
          ? `${nextProps.newData.start_date}-${nextProps.newData.end_date}`
          : "N/A",
        time: nextProps.newData.start_time
          ? `${nextProps.newData.start_time}-${nextProps.newData.end_time}`
          : "N/A",
        method: nextProps.newData.method
          ? `${nextProps.newData.method}`
          : "N/A",
      };
      let newAvailabilities = [newData, ...this.state.availabilities];
      this.setState({ availabilities: newAvailabilities });
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  deleteSelections = (event) => {
    let token = localStorage.getItem("token");
    const { selectedRowKeys } = this.state;
    let newlist = [...this.state.list];
    if (newlist.length > 0) {
      for (var i = 0; i < selectedRowKeys.length; i++) {
        selectedRowKeys[i] = newlist[i]._id;
      }
    }
    axios
      .put("http://localhost:5000/availability/delete", {
        selectedRowKeys,
        token,
      })
      .then((response) => {
        const deletedData = [];
        const data1 = response.data.user.availabilities;
        for (var i = data1.length - 1; i > 0; i--) {
          deletedData.push({
            key: i,
            date: data1[i].start_date
              ? `${data1[i].start_date}-${data1[i].end_date}`
              : "N/A",
            time: data1[i].start_time
              ? `${data1[i].start_time}-${data1[i].end_time}`
              : "N/A",
            method: data1[i].method ? `${data1[i].method}` : "N/A",
          });
        }
        this.setState({
          availabilities: [...deletedData],
        });
      })
      .catch((err) =>
        this.setState({
          error: "There was something wrong with adding an availability",
        })
      );
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [Table.SELECTION_ALL],
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="data-table">
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <Button
            type="primary"
            onClick={this.deleteSelections}
            disabled={!hasSelected}
          >
            Delete
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.availabilities}
        />
      </div>
    );
  }
}

export default DataTable;
