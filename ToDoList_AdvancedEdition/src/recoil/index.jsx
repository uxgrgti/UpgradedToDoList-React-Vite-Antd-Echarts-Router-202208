import { atom } from "recoil";
import moment from "moment";

const plansState = atom({
  key: "plansState",
  default: [
    {
      id: "111",
      text: "吃饭",
      done: false,
      date: moment("2022-08-05"),
      isEdit: false,
    },
    {
      id: "222",
      text: "睡觉",
      done: false,
      date: moment("2022-08-17"),
      isEdit: false,
    },
    {
      id: "333",
      text: "开会",
      done: false,
      date: moment("2022-07-18"),
      isEdit: false,
    },
  ],
});
const finishedPlansState = atom({
  key: "finishedPlansState",
  default: [
    { id: "444", text: "上班", done: true, date: moment(), isEdit: false },
    { id: "555", text: "看电影", done: true, date: moment(), isEdit: false },
  ],
});

export { plansState, finishedPlansState };
