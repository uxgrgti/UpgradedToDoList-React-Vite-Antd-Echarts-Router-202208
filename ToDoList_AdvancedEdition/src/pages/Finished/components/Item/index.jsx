import { React, useState } from "react";
import { Button, Checkbox } from "antd";
import { useRecoilState } from "recoil";
import { finishedPlansState, plansState } from "../../../../recoil";
import storage from "../../../../model/storage";
import moment from "moment";
import "./index.css";

export default function Item(props) {
  var { text, date, id, done } = props;
  const [mouse, setMouse] = useState(false);
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);
  const [plans, setPlans] = useRecoilState(plansState);

  const recoveryPlan = (id) => {
    //从finishedPlans中删除
    const nfinishedPlans = finishedPlans.filter((planObj) => {
      if (planObj.id !== id) return planObj;
    });
    //加入plans
    const nPlan = finishedPlans.filter((planObj) => {
      if (planObj.id === id) return planObj;
    });
    const nPlans = [{ ...nPlan[0], done: false }, ...plans];
    setfinishedPlans(nfinishedPlans);
    storage.set("finishedPlans", nfinishedPlans);
    setPlans(nPlans);
    storage.set("planslist", nPlans);
  };

  const changeDone = () => {
    const nfinishedPlans = finishedPlans.map((planObj) => {
      if (planObj.id === id) return { ...planObj, done: !done };
      else return planObj;
    });
    setfinishedPlans(nfinishedPlans);
    storage.set("finishedPlans", nfinishedPlans);
  };

  return (
    <li
      className="finisheditem_li"
      style={{ backgroundColor: mouse ? "rgb(234, 249, 255)" : "#fff" }}
      onMouseEnter={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
    >
      <Checkbox onChange={() => changeDone(id)} checked={!done}>
        {text}
      </Checkbox>
      <span className="plan_date">
        &nbsp;
        {moment(date.format("YYYY-MM-DD")).fromNow()}&nbsp;
        {date.format("YYYY-MM-DD")}
      </span>
      <Button
        // style={{ display: "block" }}
        style={{ display: mouse ? "block" : "none" }}
        onClick={() => recoveryPlan(id)}
      >
        恢 复
      </Button>
    </li>
  );
}
