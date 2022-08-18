import EChartsReact from "echarts-for-react";
import { React, useEffect } from "react";
import { useRecoilState } from "recoil";
import { finishedPlansState, plansState } from "../../../../recoil";
import moment from "moment";
import storage from "../../../../model/storage";

export default function Bar() {
  useEffect(() => {
    //获取缓存的数据
    var planslist = storage.get("planslist");
    if (planslist) {
      //拿到缓存的数据 自动刷新
      const nplanslist = planslist.map((planObj) => {
        const dateString = planObj.date;
        return { ...planObj, date: moment(dateString) };
      });
      setPlans(nplanslist);
    }
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

  const [plans, setPlans] = useRecoilState(plansState);
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);

  let plansCount_overdue = plans.filter((planObj) => {
    if (planObj.date.isBefore(moment())) return planObj;
  }).length;
  let finishedPlansCount_overdue = finishedPlans.filter((planObj) => {
    if (planObj.date.isBefore(moment())) return planObj;
  }).length;
  let plansCount_next7Dags = plans.filter((planObj) => {
    if (
      planObj.date.isBefore(moment().add(7, "days")) &&
      planObj.date.isAfter(moment())
    )
      return planObj;
  }).length;
  let finishedPlansCount_next7Days = finishedPlans.filter((planObj) => {
    if (
      planObj.date.isBefore(moment().add(7, "days")) &&
      planObj.date.isAfter(moment())
    )
      return planObj;
  }).length;
  let plansCount_7DaysLater = plans.filter((planObj) => {
    if (planObj.date.isAfter(moment().add(7, "days"))) return planObj;
  }).length;
  let finishedPlansCount_7DaysLater = finishedPlans.filter((planObj) => {
    if (planObj.date.isAfter(moment().add(7, "days"))) return planObj;
  }).length;

  let option = {
    legend: {
      data: ["未完成", "已完成"],
    },
    xAxis: { type: "category", data: ["已过期", "未来7天内", "7天之后"] },
    yAxis: { type: "value" },
    series: [
      {
        name: "已完成",
        type: "bar",
        data: [
          finishedPlansCount_overdue,
          finishedPlansCount_next7Days,
          finishedPlansCount_7DaysLater,
        ],
      },
      {
        name: "未完成",
        type: "bar",
        data: [plansCount_overdue, plansCount_next7Dags, plansCount_7DaysLater],
      },
    ],
  };
  return (
    <div style={{ width: "45%", hight: "200px", display: "inline-block" }}>
      <EChartsReact option={option} />
    </div>
  );
}
