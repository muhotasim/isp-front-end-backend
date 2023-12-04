import { Button, Modal, PageHeader, Table } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { index, remove } from "../../../services/categories.service";
import { Input } from "antd";
import { Trash2, Edit, RefreshCcw } from "react-feather";
import { useNavigate } from "react-router-dom";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
const { Search } = Input;
const CategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const navicate = useNavigate();

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
          toast.error(data?.message, { position: "top-right", theme: "dark" });
          getData();
        } catch (e) {
          axiosExeptionHandler(e);
        }
      },
    });
  };

  const userDataTable = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      key: "title",
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
              navicate("/categories/" + record.id);
            }}
            size="small"
            style={{ marginRight: "5px" }}
          >
            <Edit size={14} />
          </Button>
          <Button
            type="danger"
            size="small"
            onClick={() => {
              onDelete(record.id);
            }}
          >
            <Trash2 size={14} />
          </Button>
        </span>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, [perPage, page]);
  return (
    <>
      <PageHeader className="site-page-header" title="Categories" />
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
export default CategoryList;
