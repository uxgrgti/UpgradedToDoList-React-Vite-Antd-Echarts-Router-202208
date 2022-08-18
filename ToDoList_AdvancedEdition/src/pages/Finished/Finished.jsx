import { React, useEffect } from "react";
import List from "./components/List";
import Recovery from "./components/Recovery";
import { Divider } from "antd";
import { useRecoilState } from "recoil";
import { finishedPlansState } from "../../recoil";
import storage from "../../model/storage";
import moment from "moment";
import Bar from "../Plan/components/Bar";
import Pie from "../Plan/components/Pie/Pie";

export default function Finished() {
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);

  useEffect(() => {
    //获取缓存的数据
    var finishedplanslist = storage.get("finishedPlans");
    if (finishedplanslist) {
      //拿到缓存的数据 自动刷新
      const nfinishedplanslist = finishedplanslist.map((planObj) => {
        const dateString = planObj.date;
        return { ...planObj, date: moment(dateString) };
      });
      setfinishedPlans(nfinishedplanslist);
    }
  }, []);

  return (
    <div>
      <div>
        <Divider orientation="left">已 完 成 计 划</Divider>
        <List />
        <Recovery />
      </div>
      {/* <Bar />
      <Pie /> */}
    </div>
  );
}
