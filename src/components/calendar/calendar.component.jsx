import React from "react";
import { Calendar } from "antd";

import "./calendar.styles.scss";

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 10:
      listData = [{ type: "warning", content: "" }];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <div
          style={{
            border: "1px solid ",
            borderRadius: "50%",
            width: "25px",
            transform: "translateY(-100%)  translateX(-84%) rotate(90deg)",
            height: "25px",
          }}
          key={item.content}
        ></div>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const CalendarComponent = (value) => (
  <div className="calendar">
    <Calendar monthCellRender={monthCellRender} fullscreen={false} />
  </div>
);
export default CalendarComponent;
