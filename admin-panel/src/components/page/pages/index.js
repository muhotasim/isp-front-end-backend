import { Button, Modal, PageHeader, Table } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { index, remove } from "../../../services/page.service";
import { Input } from "antd";
import { Trash2, Edit, RefreshCcw } from "react-feather";
import { useNavigate } from "react-router-dom";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
import appConst from "../../../constants/app.constants";
const { Search } = Input;
const PageList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const navicate = useNavigate();
  const userDataTable = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: true,
      key: "type",
    },
    {
      title: "Permalink",
      dataIndex: "permalink",
      sorter: true,
      key: "permalink",
      render: (permalink) => {
        return <a target="_blank" href={appConst.host+'/'+permalink}>{appConst.host+'/'+permalink}</a>
      }
    },
    {
      title: "Status",
      sorter: true,
      key: "status",
      render: (r) => `${r.status == 1 ? "Active" : "Inactive"}`,
    },
    {
      title: "Actions",
      dataIndex: "",
      sorter: true,
      width:"90px",
      key: "x",
      render: (record) => (
        <span>
          <Button
            onClick={() => {
              navicate("/pages/" + record.id);
            }}
            size="small"
            style={{ marginRight: "5px" }}
          >
            <Edit size={14} />
          </Button>
          {record.type == "user_created" && (
            <Button
              size="small"
              type="danger"
              onClick={() => {
                onDelete(record.id);
              }}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </span>
      ),
    },
  ];

  const getData = async (query = {}) => {
    setLoading(true);
    try {
      const response = await index({ perPage, page, query });
      const { data } = response;
      setTotal(data?.data.count);
      toast.info(data?.message, { position: "top-right", theme: "dark" });
      setData(data?.data.data);
      setLoading(false);
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };

  const onSearch = () => {
    getData({
      title: searchVal,
      type: searchVal,
      status: searchVal,
    });
  };

  const onDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this?",
      onOk: async () => {
        try {
          const response = await remove(id);
          const { data } = response;
          setTotal(data?.data.count);
          toast.error(data?.message, {
            position: "top-right",
            theme: "dark",
          });
          getData();
        } catch (e) {
          axiosExeptionHandler(e, () => setLoading(false));
        }
      },
    });
  };

  useEffect(() => {
    getData();
  }, [perPage, page]);
  return (
    <>
      <PageHeader className="site-page-header" title="Pages" />
      <div className="search-box">
        <Search
          placeholder="Search..."
          size="default"
          value={searchVal}
          onChange={(e) => {
            setSearchval(e.target.value);
          }}
          style={{ maxWidth: "200px", marginBottom: "20px" }}
          onSearch={onSearch}
        />
        <Button
          style={{ width: "35px", padding: "0px" }}
          onClick={() => {
            setSearchval("");
            getData();
          }}
        >
          <RefreshCcw size={14} color="#949494" />
        </Button>
      </div>
      <Table
        className="animated fadeIn"
        dataSource={data}
        columns={userDataTable}
        loading={loading}
        size="small"
        rowKey={(record) => record.id}
        pagination={{
          pageSize: perPage,
          current: page,
          total: total,
          onShowSizeChange: (current, size) => {
            setPerPage(size);
          },
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          onChange: (p) => {
            setPage(p);
          },
        }}
      />
    </>
  );
};
export default PageList;
