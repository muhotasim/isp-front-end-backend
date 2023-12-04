import { Button, Card, Col, Modal, PageHeader, Row, Alert } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { index, remove, get } from "../../../../services/logs.service";
import { Trash2, ArrowUp, Inbox } from "react-feather";
import { useNavigate } from "react-router-dom";
const LogsList = (props) => {
  const [logData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navicate = useNavigate();

  const getData = async (query = {}) => {
    setLoading(true);
    try {
      const response = await index({});
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      setData(data?.data.data.map((d) => ({ filename: d, log: "" })));
      debugger;
      setLoading(false);
    } catch (e) {
      const data = e?.response?.data;
      if (data)
        toast.error(data.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    }
  };

  const onDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this?",
      onOk: async () => {
        const response = await remove(id);
        const { data } = response;
        toast.success(data?.message, { position: "top-right", theme: "dark" });
        getData();
      },
    });
  };
  const onView = async (index, filename) => {
    setLoading(true);
    try {
      const response = await get(filename);
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      let currentLogData = logData;
      currentLogData[index].log = data?.data.data;
      setData(currentLogData);
      setLoading(false);
    } catch (e) {
      const data = e?.response?.data;
      if (data)
        toast.error(data.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageHeader className="site-page-header" title="Logs" />
      {logData.length === 0 && (
        <Alert
          style={{ textAlign: "center", fontSize: "18px" }}
          type="info"
          message={
            <span>
              <Inbox size={20} /> There is no avilable log file
            </span>
          }
        />
      )}
      <Row>
        <Col span={12}>
          <div>
            {logData.map((file, index) => {
              return (
                <>
                  <div key={index}>
                    <div
                      key={"log-" + index}
                      onClick={() => {
                        onView(index, file.filename);
                      }}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        padding: "5px",
                        background: "rgba(0, 0, 0, 0.85)",
                        borderRadius: "3px",
                        color: "white",
                        marginRight: "10px",
                        marginBottom: "15px",
                      }}
                      className="log-file"
                    >
                      {file.filename}
                      <Button
                        title="Remove this log file"
                        style={{ float: "right" }}
                        type="danger"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(file.filename);
                        }}
                      >
                        <span>
                          <Trash2 size={18} />
                        </span>
                      </Button>
                    </div>

                    {file.log != "" && (
                      <Card key={"log-view-" + index}>
                        <Button
                          onClick={() => {
                            let currentLogData = logData;
                            currentLogData[index].log = "";
                            setData([...currentLogData]);
                          }}
                          size="small"
                          style={{ float: "right" }}
                        >
                          <ArrowUp />
                        </Button>
                        <div>
                          <p>Details</p>
                          <pre>{file.log}</pre>
                        </div>
                      </Card>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default LogsList;
