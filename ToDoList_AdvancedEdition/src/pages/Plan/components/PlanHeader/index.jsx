import React, { useState } from "react";
import { DatePicker, Input, Button } from "antd";
import moment from "moment";
import { useRecoilState } from "recoil";
import { plansState } from "../../../../recoil";
import storage from "../../../../model/storage";

export default function PlanHeader() {
  var num = 0;
  const [addNewPlan, setAddNewPlan] = useState({
    text: "",
    date: moment(),
  });
  const [plans, setPlans] = useRecoilState(plansState);

  const addPlan = () => {
    const nPlan = {
      id: addNewPlan.date.toString() + addNewPlan.text + num.toString(),
      text: addNewPlan.text,
      done: false,
      date: addNewPlan.date,
      isEdit: false,
    };
    if (nPlan.text === "") {
      alert("输入不能为空");
      return;
    }
    const nPlans = [nPlan, ...plans];
    setPlans(nPlans);
    storage.set("planslist", nPlans);
    num++;
  };

  return (
    <div>
      <Input
        style={{ width: "59%" }}
        value={addNewPlan.text}
        onChange={(e) => {
          setAddNewPlan({ ...addNewPlan, text: e.target.value });
        }}
        allowClear={true}
        placeholder="请输入计划内容"
      />
      &nbsp;
      <DatePicker
        style={{ width: "33%" }}
        onChange={(value) => {
          setAddNewPlan({
            ...addNewPlan,
            date: value,
          });
        }}
        allowClear={true}
      />
      &nbsp;
      <Button type="primary" onClick={addPlan}>
        添 加
      </Button>
    </div>
  );
}
