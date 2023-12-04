import { Button, Row,Col, PageHeader, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { index, remove, create } from "../../services/file.service";
import { Input } from "antd";
import { Inbox, RefreshCcw, Plus } from "react-feather";
import axiosExeptionHandler from "../utils/axios.exception-handaler";
import appConst from "../../constants/app.constants";
const { Dragger } = Upload;
const { Search } = Input;

const SelectFile = ({ onSelect}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [uploading, setUploading] = useState();
  const [select, setSelected] = useState(null);

  const getData = async (query = {},reset = true) => {
    setLoading(true);
    try {
      const response = await index({ perPage, page, query });
      const responseData = response.data;
      toast.info(data?.message, { position: "top-right", theme: "dark" });
      if (!reset) {
        setTotal(responseData?.data?.count);
        setData([...data, ...responseData?.data.data]);
      } else {
        setTotal(responseData?.data?.count);
        setData(responseData?.data.data);
      }
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

  useEffect(() => {
    getData();
  }, []);
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
        <Button type="primary" style={{float: 'right'}} onClick={()=>{
            onSelect(select)
        }}>Select</Button>
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
            getData({
                type: searchVal,
                name: searchVal,
              });
          }}
        >
          <RefreshCcw size={14} color="#949494" />
        </Button>
      </div>
      <div className="files-container" style={{height: "250px", overflow: 'auto'}}>
        <Row>
            {data.map((record, index)=>{
                let src = appConst.host + record.uri.split(".").join("128x128.");
                return <Col span={6} key={index}>
                    <input type={"radio"} name="sl-file" checked={record?.id==select?.id} onClick={()=>{ setSelected(record) }}/>
                    <img style={{ maxWidth: "80px", padding: "5px", border: '1px solid lightgray', margin: '5px' }} src={src} />
                </Col>
            })}
        </Row>
        <div style={{textAlign: 'center'}}>
            {(total>data.length)&&<Button type="primary" onClick={()=>{ 
                setPage(page+1)
                getData({
                  type: searchVal,
                  name: searchVal,
                }, false) }}><Plus size={14}/> Load More</Button>}
        </div>
      </div>
        
    </>
  );
};
export default SelectFile;
