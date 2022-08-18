import React from "react";
import { Checkbox, Button } from "antd";
import { useRecoilState } from "recoil";
import { finishedPlansState, plansState } from "../../../../recoil/index";
import "./index.css";
import { Link } from "react-router-dom";
import storage from "../../../../model/storage";
import moment from "moment";

export default function FinishAll() {
  const [plans, setPlans] = useRecoilState(plansState);
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);
  //   const doneCount = plans.reduce((pre, plan) => {
  //     return pre + (plan.done ? 1 : 0);
  //   }, 0);
  const total = plans.length;

  const allFinished = () => {
    var nfinishedPlans = finishedPlans;
    for (var i = 0; i < plans.length; i++) {
      nfinishedPlans = [{ ...plans[i], done: true }, ...nfinishedPlans];
    }
    setfinishedPlans(nfinishedPlans);
    storage.set("finishedPlans", nfinishedPlans);
    setPlans([]);
    storage.set("planslist", []);
  };

  return (
    <div>
      <span className="total_span">共{total}项计划</span>
      <span className="btn_span">
        <Link to="/finished">
          <Button type="primary" onClick={allFinished}>
            全部完成
          </Button>
        </Link>
      </span>
    </div>
  );
}
