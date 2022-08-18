import EChartsReact from "echarts-for-react";
import { React, useEffect } from "react";
import { useRecoilState } from "recoil";
import { finishedPlansState, plansState } from "../../../../recoil";
import moment from "moment";
import storage from "../../../../model/storage";

export default function Pie() {
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
  let plansCount_next7Days = plans.filter((planObj) => {
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
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: plansCount_overdue + finishedPlansCount_overdue,
            name: "已过期",
          },
          {
            value: plansCount_next7Days + finishedPlansCount_next7Days,
            name: "未来7天",
          },
          {
            value: plansCount_7DaysLater + finishedPlansCount_7DaysLater,
            name: "7天之后",
          },
        ],
      },
    ],
  };

  return (
    <div style={{ width: "45%", hight: "200px", display: "inline-block" }}>
      <EChartsReact option={option} />
    </div>
  );
}
