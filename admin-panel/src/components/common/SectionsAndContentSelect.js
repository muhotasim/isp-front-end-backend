import { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import {
  Loader,
  Plus,
  RefreshCcw,
  Trash2,
  Search as SearchIcon,
  ChevronUp,
  ChevronDown,
} from "react-feather";
import { index } from "../../services/content.service";
import axiosExeptionHandler from "../utils/axios.exception-handaler";
const { Search } = Input;
const SectionsAndContentSelect = ({ selectedData = [], setSelectedData }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchval] = useState("");
  const [contentType, setContentType] = useState("");
  const getData = async (query = {}, reset = false) => {
    setLoading(true);
    try {
      const response = await index({
        perPage,
        page,
        query,
        exclude: selectedData.map((d) => d.id),
        getCount:1
      });
      const responseData = response.data;
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
    setPage(1);
    const sVal = {
      title: searchVal,
      status: searchVal,
    };
    if (contentType) {
      sVal.type = contentType;
    }
    getData(sVal, true);
  };

  const onReset = () => {
    setSearchval("");
    setContentType("");
    const sVal = {
      title: '',
      status: '',
    };
    if (contentType) {
      sVal.type = '';
    }
    setPage(1);
    getData(sVal, true);
  };

  useEffect(() => {
    const sVal = {
      title: searchVal,
      status: searchVal,
    };
    if (contentType) {
      sVal.type = contentType;
    }
    getData(sVal, true);
  }, []);

  const addToSelected = (index) => {
    let tempData = data;
    setSelectedData([...selectedData, data[index]]);
    tempData.splice(index, 1);
    setData([...tempData]);
  };
  const removeFromSelected = (index) => {
    let tempData = selectedData;
    setData([...data, selectedData[index]]);
    tempData.splice(index, 1);
    setSelectedData([...tempData]);
  };
  

  const moveDown = (index)=>{
    let tempData = selectedData;
    let temp = tempData[index+1];
    tempData[index+1] =  tempData[index] ;
    tempData[index] = temp;
    setSelectedData([...tempData])
  }

  const moveUp = (index)=>{
    let tempData = selectedData;
    let temp = tempData[index-1];
    tempData[index-1] =  tempData[index] ;
    tempData[index] = temp;
    setSelectedData([...tempData])
  }
  return (
    <div>
      <div className="search-box animated bounceIn">
        <Input
          placeholder="Search..."
          size="default"
          value={searchVal}
          onChange={(e) => {
            setSearchval(e.target.value);
          }}
          style={{ maxWidth: "200px", marginBottom: "20px" }}
          // onSearch={onSearch}
        />
        <Select
          style={{ minWidth: "200px" }}
          options={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Slider",
              value: "slider",
            },
            {
              value: "post",
              label: "Post",
            },
            {
              value: "package",
              label: "Package",
            },
            // {
            //   value: "popular-package",
            //   label: "Popular-package",
            // },
            {
              value: "client",
              label: "Client",
            },
          ]}
          onChange={(v) => setContentType(v)}
          value={contentType}
        />
        <Button onClick={onSearch}>
          <SearchIcon size={14} color="#949494" />
        </Button>
        <Button style={{ width: "35px", padding: "0px" }} onClick={onReset}>
          <RefreshCcw size={14} color="#949494" />
        </Button>
      </div>
      <div className="section-and-content-select">
        <div
          className="selected-options"
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          {selectedData.map((d, i) => {
            return (
              <div
                className="animated bounceIn"
                key={"section-op-" + i}
                style={{
                  display: "flex",
                  gap: 5,
                  borderBottom: "1px solid lightgray",
                  marginTop: "10px",
                }}
              >
                <div style={{ width: "120px" }}>
                  <Button
                    type="danger"
                    style={{ paddingTop: "3px", marginRight: '5px' }}
                    size="small"
                    onClick={() => removeFromSelected(i)}
                  >
                    {" "}
                    <Trash2 size={16} />{" "}
                  </Button>
                  {(i>0)&&<Button
                    type="danger"
                    style={{ paddingTop: "3px", marginRight: '5px' }}
                    size="small"
                    onClick={() => moveUp(i)}
                  >
                    {" "}
                    <ChevronUp size={16} />{" "}
                  </Button>}
                  {(i<selectedData.length-1)&&<Button
                    type="danger"
                    style={{ paddingTop: "3px", marginRight: '5px' }}
                    size="small"
                    onClick={() => moveDown(i)}
                  >
                    {" "}
                    <ChevronDown size={16} />{" "}
                  </Button>}
                </div>

                <div style={{ flex: 1, textAlign: "left" }}>
                  <p key={i}>{d.title}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="loaded-options"
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          {data.map((d, i) => {
            return (
              <div
                className="animated fadeIn"
                key={"loaded-op-" + i}
                style={{
                  display: "flex",
                  gap: 5,
                  borderBottom: "1px solid lightgray",
                  marginTop: "10px",
                }}
              >
                <div style={{ width: "60px" }}>
                  <Button
                    type="primary"
                    style={{ paddingTop: "3px" }}
                    size="small"
                    onClick={() => addToSelected(i)}
                  >
                    {" "}
                    <Plus size={16} />{" "}
                  </Button>
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <p key={i}>{d.title}</p>
                </div>
              </div>
            );
          })}
        {(data.length<total)&&<div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            disabled={loading}
            onClick={() => {
              
              console.log(page)
              setPage(page + 1);
              console.log(page)
              getData(
                {
                  title: searchVal,
                  type: contentType,
                  status: searchVal,
                },
                false
              );
            }}
          >
            {" "}
            <Plus size={14} /> More
          </Button>
        </div>}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};
export default SectionsAndContentSelect;
