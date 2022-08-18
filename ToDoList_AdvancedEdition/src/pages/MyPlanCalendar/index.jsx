import { Calendar, Badge } from "antd";
import { React, useEffect } from "react";
import { useRecoilState } from "recoil";
import { finishedPlansState, plansState } from "../../recoil";
import "./index.css";
import storage from "../../model/storage";
import moment from "moment";

export default function MyPlanCalendar() {
  const [plans, setPlans] = useRecoilState(plansState);
  const [finishedPlans, setfinishedPlans] = useRecoilState(finishedPlansState);

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

  const totalPlans = [...plans, ...finishedPlans];
  //添加属性listDate
  const totalPlans_addListData = totalPlans.map((planObj) => {
    let text = planObj.text;
    if (planObj.done === true) {
      return {
        ...planObj,
        listData: [{ type: "success", content: text }],
      };
    } else
      return {
        ...planObj,
        listData: [{ type: "warning", content: text }],
      };
  });

  // const calenderPlans = totalPlans_addListData.map((planObj) => {
  //   //找出相同日期的plan
  //   const sameDateplans = totalPlans_addListData.filter((planObj2) => {
  //     if (
  //       planObj2.date.format("YYYY-MM-DD") ==
  //         planObj.date.format("YYYY-MM-DD") &&
  //       planObj2.listData[1] !== planObj.listData[1]
  //     )
  //       return planObj2;
  //   });
  //   //把相同日期的plan整合到一起
  //   for (var i = 0; i < sameDateplans.length; i++) {
  //     listData2 = sameDateplans[i].listData;
  //     listData1 = planObj.listData[1];
  //     planObj.listData = [listData1, listData2];
  //   }
  //   return planObj;
  // });

  // const getListData = (value) => {
  //   let listData;
  //   calenderPlans.map((planObj) => {
  //     if (planObj.date.format("YYYYMMDD") === value.format("YYYYMMDD")) {
  //       listData = planObj.listData;
  //     }
  //   });
  //   return listData || [];
  // };

  const dateCellRender = (value) => {
    const filteredPlanList = totalPlans_addListData.filter((item) => {
      return item.date.isSame(value, "day");
    });
    // console.log("filteredPlanList", filteredPlanList);
    return (
      <ul className="events">
        {filteredPlanList.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.listData[0].type}
              text={item.listData[0].content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (currentDate) => {
    let count = 0;
    totalPlans_addListData.map((planObj) => {
      if (currentDate.month() === planObj.date.month()) {
        count++;
      }
    });
    return count;
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <span>{num}项</span>
      </div>
    ) : null;
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  );
}
