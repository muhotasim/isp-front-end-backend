import { Col, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dashboard } from "../../../services/user.service";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
import { User, File, Tag, Grid, Table } from "react-feather";
const Dashboard = (props) => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalContent: 0,
    totalPages: 0,
    totalTags: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await dashboard();
      const { data } = response;
      toast.info(data?.message, { position: "top-right", theme: "dark" });
      setDashboardData(data.data);
      setLoading(false);
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageHeader className="site-page-header" title="Dashboard" />
      <div>
        <Row>
          <Col xl={4} lg={6} md={8} sm={12} xs={24}>
            <SummeryCard
              title="Total Users"
              total={dashboardData.totalUsers}
              icon={<User />}
            />
          </Col>
          <Col xl={4} lg={6} md={8} sm={12} xs={24}>
            <SummeryCard
              title="Total Content"
              total={dashboardData.totalContent}
              icon={<Table />}
            />
          </Col>
          <Col xl={4} lg={6} md={8} sm={12} xs={24}>
            <SummeryCard
              title="Total Pages"
              total={dashboardData.totalPages}
              icon={<File />}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
const SummeryCard = ({ title, total, icon }) => {
  return (
    <div className="summery-card animated bounceIn">
      <h3>{title}</h3>
      <div className="card-details">
        <div className="icon">
          <span>{icon}</span>
        </div>
        <div className="total">
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
