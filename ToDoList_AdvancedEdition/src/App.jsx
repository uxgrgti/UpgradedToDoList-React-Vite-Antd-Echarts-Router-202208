import React from "react";
import { Menu } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link, Routes, Route } from "react-router-dom";
import Plan from "./pages/Plan/Plan";
import Finished from "./pages/Finished/Finished";
import MyPlanCalendar from "./pages/MyPlanCalendar/index";
import "./index.css";
import Bar from "./pages/Plan/components/Bar";
import Pie from "./pages/Plan/components/Pie/Pie";

const App = () => (
  <div className="container">
    <div className="wrap">
      <div>
        <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
          <Menu.Item key="calendar" icon={<CalendarOutlined />}>
            <Link to="/myplancalendar">日 历</Link>
          </Menu.Item>

          <Menu.Item key="plan" icon={<ClockCircleOutlined />}>
            <Link to="/plan">待 办</Link>
          </Menu.Item>

          <Menu.Item key="finished" icon={<CheckCircleOutlined />}>
            <Link to="/finished">已完成</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div>
        <Routes>
          <Route path="/myplancalendar" element={<MyPlanCalendar />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/finished" element={<Finished />} />
          <Route path="/" element={<MyPlanCalendar />} />
        </Routes>
      </div>
      <div style={{ display: "flex" }}>
        <Bar />
        <Pie />
      </div>
    </div>
  </div>
);

export default App;
