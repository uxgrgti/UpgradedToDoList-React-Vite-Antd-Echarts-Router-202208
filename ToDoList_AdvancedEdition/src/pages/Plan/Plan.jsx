import { React, useEffect } from "react";
import FinishAll from "./components/FinishAll";
import PlanHeader from "./components/PlanHeader";
import MyList from "./components/MyList";
import { Divider } from "antd";
import { useRecoilState } from "recoil";
import { plansState } from "../../recoil";
import storage from "../../model/storage";
import moment from "moment";
import Bar from "./components/Bar";
import Pie from "./components/Pie/Pie";

export default function Plan() {
  const [plans, setPlans] = useRecoilState(plansState);

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

  return (
    <div>
      <div>
        <Divider className="divider" orientation="left">
          待 办 计 划
        </Divider>
        <PlanHeader />
        <br />
        <MyList />
        <FinishAll />
      </div>
      {/* <Bar />
      <Pie /> */}
    </div>
  );
}
