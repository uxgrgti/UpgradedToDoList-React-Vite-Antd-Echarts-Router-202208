import { React, useEffect } from "react";
import { useRecoilState } from "recoil";
import { finishedPlansState } from "../../../../recoil";
import Item from "../Item";
import "./index.css";
import storage from "../../../../model/storage";
import moment from "moment";

export default function List() {
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
      <ul className="list">
        {finishedPlans.map((finishedPlan) => {
          return <Item key={finishedPlan.id} {...finishedPlan} />;
        })}
      </ul>
    </div>
  );
}
