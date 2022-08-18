import { Checkbox, Button, Input } from "antd";
import { React, useState } from "react";
import "antd/dist/antd.css";
import "./indec.css";
import { plansState, finishedPlansState } from "../../../../recoil";
import { useRecoilState } from "recoil";
import storage from "../../../../model/storage";
import moment from "moment";

const Item = (props) => {
  const { text, date, done, id, isEdit } = props;
  const [plans, setPlans] = useRecoilState(plansState);
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);
  const [mouse, setMouse] = useState(false);

  const transferPlan = (id) => {
    //从plans中删除
    const nPlans = plans.filter((planObj) => {
      if (planObj.id !== id) return planObj;
    });
    setPlans(nPlans);
    storage.set("planslist", nPlans);
    //加入finishedPlans中
    const nfinishedPlan = plans.filter((planObj) => {
      if (planObj.id === id) return planObj;
    });
    const nfinishedPlans = [
      { ...nfinishedPlan[0], done: true },
      ...finishedPlans,
    ];
    setfinishedPlans(nfinishedPlans);
    storage.set("finishedPlans", nfinishedPlans);
  };

  const delPlan = (id) => {
    const nPlans = plans.filter((planObj) => {
      if (planObj.id !== id) return planObj;
    });
    setPlans(nPlans);
    storage.set("planslist", nPlans);
  };

  const changeIsEdit = (id) => {
    const nPlans = plans.map((planObj) => {
      if (planObj.id == id) {
        return { ...planObj, isEdit: true };
      } else return planObj;
    });
    setPlans(nPlans);
    storage.set("planslist", nPlans);
  };
  const editPlanText = (id, event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim() === "") {
      alert("输入不能为空");
      return;
    }
    const nPlans = plans.map((planObj) => {
      if (planObj.id == id)
        return { ...planObj, text: event.target.value, isEdit: false };
      else return planObj;
    });
    setPlans(nPlans);
    storage.set("planslist", nPlans);
  };

  return (
    <li
      className="item_li"
      style={{ backgroundColor: mouse ? "rgb(234, 249, 255)" : "#fff" }}
      onMouseEnter={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
    >
      <Checkbox checked={done} onChange={() => transferPlan(id)}></Checkbox>

      <span className="isEdit">
        &nbsp;&nbsp;
        {/* 编辑时显示input，非编辑时显示text */}
        <span
          className="text_span"
          style={{ display: isEdit ? "none" : "block" }}
        >
          {text}
        </span>
        <Input
          placeholder="请输入编辑内容，按回车确认"
          defaultValue={text}
          // allowClear={true}
          className="edit_input"
          style={{ display: isEdit ? "block" : "none" }}
          onKeyUp={(e) => {
            editPlanText(id, e);
          }}
        />
        &nbsp;
        <Button
          style={{ display: mouse ? "block" : "none" }}
          onClick={() => delPlan(id)}
        >
          删 除
        </Button>
        &nbsp;
        <Button
          style={{ display: mouse ? (isEdit ? "none" : "block") : "none" }}
          onClick={() => changeIsEdit(id)}
        >
          编 辑
        </Button>
        &nbsp;
        <span className="date">
          <span
            style={{
              color:
                date.isBefore(moment().add(7, "days")) && date.isAfter(moment())
                  ? "red"
                  : date.isBefore(moment())
                  ? "blue"
                  : "black",
            }}
          >
            {moment(date.format("YYYY-MM-DD")).fromNow()} &nbsp;&nbsp;
          </span>
          {date.format("YYYY-MM-DD")}
        </span>
      </span>
    </li>
  );
};

export default Item;
