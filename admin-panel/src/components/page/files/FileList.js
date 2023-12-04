import { Button, Modal, PageHeader, Table, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { index, remove, create } from "../../../services/file.service";
import { Input } from "antd";
import { Trash2, Inbox, RefreshCcw } from "react-feather";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
import appConst from "../../../constants/app.constants";
const { Dragger } = Upload;
const { Search } = Input;

const FileList = ({ allowSelect = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [uploading, setUploading] = useState();

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
      type: searchVal,
      name: searchVal,
    });
  };

  const onDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this?",
      onOk: async () => {
        const response = await remove(id);
        const { data } = response;
        setTotal(data?.data.count);
        toast.error(data?.message, { position: "top-right", theme: "dark" });
        getData();
      },
    });
  };

  const props = {
    multiple: true,
    beforeUpload: async (file) => {
      if (file && file.size > 2072576) {
        toast.warning("File must be under 2 MB", {
          position: "top-right",
          theme: "dark",
        });
        return;
      }
      setUploading(true);
      try {
        const response = await create({ file });

        const { data } = response;
        toast.success(data?.message, {
          position: "top-right",
          theme: "dark",
        });
        setUploading(false);
        getData();
      } catch (e) {
        axiosExeptionHandler(e, () => setUploading(false));
      }
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const fileDataTable = [
    allowSelect? {
      title: "Type",
      dataIndex: "type",
      sorter: true,
      key: "type",
    }:{
      title: "Type",
      dataIndex: "type",
      sorter: true,
      key: "type",
    },
    {
      title: "Uri",
      dataIndex: "",
      sorter: true,
      key: "uri",
      render: (record) => (
        <a href={appConst.host + record.uri} target="_blank">
          {appConst.host + record.uri}
        </a>
      ),
    },
    {
      title: "Extension",
      dataIndex: "ext",
      sorter: true,
      key: "ext",
    },
    {
      title: "Image",
      dataIndex: "",
      sorter: true,
      key: "location",
      render: (record) => {
        let src = appConst.host + record.uri.split(".").join("128x128.");
        return (
          <div>
            <img style={{ maxWidth: "80px" }} src={src} />
          </div>
        );
      },
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
            size="small"
            type="danger"
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
      <PageHeader className="site-page-header" title="Files" />
      <div style={{ marginBottom: "25px" }}>
        <Dragger {...props} disabled={uploading} showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <Inbox />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>
      <div className="search-box animated fadeIn">
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
        columns={fileDataTable}
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
export default FileList;
