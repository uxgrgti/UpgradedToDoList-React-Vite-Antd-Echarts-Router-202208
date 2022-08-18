import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { plansState } from "../../../../recoil";
import "./index.css";
import Item from "../Item";
import storage from "../../../../model/storage";
import moment from "moment";

export default function MyList() {
  var [plans, setPlans] = useRecoilState(plansState);

  useEffect(() => {
    // 获取缓存的数据;
    var planslist = storage.get("planslist");
    if (planslist) {
      //拿到缓存的数据 自动刷新
      const nplanslist = planslist.map((planObj) => {
        const dateString = planObj.date;
        return { ...planObj, date: moment(dateString) };
      });
      setPlans(nplanslist);
    }
  }, []);

  const sortPlan = () => {
    // console.log(plans);
    const tempArr = [...plans];
    tempArr.sort((dateA, dateB) => {
      if (dateA.date.isBefore(dateB.date)) {
        return -1;
      } else {
        return 1;
      }
    });
    return tempArr;
  };

  return (
    <ul className="list">
      {sortPlan().map((plan) => {
        return <Item key={plan.id} {...plan} />;
      })}
    </ul>
  );
}
