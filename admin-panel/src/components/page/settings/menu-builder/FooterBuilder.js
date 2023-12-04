import { PageHeader, Button, Input, Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { Save, Plus, Edit, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import { get, update } from "../../../../services/settings.service";
import axiosExeptionHandler from "../../../utils/axios.exception-handaler";
const MENNU_KEY = "FOOTER_MENU";
const FooterBuilder = () => {
  const [menuList, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMenu = async () => {
    setLoading(true);
    try {
      const response = await get(MENNU_KEY);
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      const menuData = data.data.value;
      setMenu(menuData);
      setLoading(false);
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };

  const onBuildMenu = async () => {
    setLoading(true);
    try {
      const processedMenu = JSON.stringify(menuList);
      const response = await update(MENNU_KEY, { value: processedMenu });
      debugger;
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });

      setLoading(false);
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  
  const addToParent = () => {
    let tempMenu = menuList;
    tempMenu.push({ link: "", label: "", childrens: [] });
    setMenu([...tempMenu]);
  };
  const deleteFromParent = (parentId) => {
    let tempMenu = menuList;
    tempMenu.splice(parentId, 1);
    setMenu([...tempMenu]);
  };
  const updateParent = (key, val, parentId) => {
    let tempMenu = menuList;
    tempMenu[parentId][key] = val;
    setMenu([...tempMenu]);
  };

  const addChildParent = (parentId) => {
    let tempMenu = menuList;
    tempMenu[parentId].childrens.push({ link: "", label: "", childrens: [] });
    setMenu([...tempMenu]);
  };
  const deleteFromChild = (parentId, childId) => {
    let tempMenu = menuList;
    tempMenu[parentId].childrens.splice(childId, 1);
    setMenu([...tempMenu]);
  };
  const updateChild = (key, val, parentId, childId) => {
    let tempMenu = menuList;
    tempMenu[parentId].childrens[childId][key] = val;
    setMenu([...tempMenu]);
  };
  return (
    <>
      <PageHeader className="site-page-header" title="Top Menu Builder" />

      <div className="menu-editor ">
        <Button onClick={addToParent}>
          <Plus size={16} />
        </Button>
        {menuList.map((menu, index) => {
          return (
            <>
              <div  key={index} className="animated fadeIn" style={{border: '1px solid lightgray', margin: '15px'}}>
                <div style={{ margin: "15px" }}>
                <Row gutter={15}>
                  <Col span={8}>
                    <label>Label</label>
                    <Input.TextArea
                      name="label"
                      onChange={(e) => {
                        updateParent(e.target.name, e.target.value, index);
                      }}
                      placeholder="label"
                      value={menu.label}
                    ></Input.TextArea>
                  </Col>
                  <Col span={8}>
                    <label>Link</label>
                    <Input.TextArea
                      name="link"
                      onChange={(e) => {
                        updateParent(e.target.name, e.target.value, index);
                      }}
                      placeholder="link"
                      value={menu.link}
                    ></Input.TextArea>
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{ marginTop: "30px", marginRight: "10px" }}
                      onClick={() => {
                        addChildParent(index);
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                    <Button
                      style={{ marginTop: "30px", marginRight: "10px" }}
                      danger
                      onClick={() => {
                        deleteFromParent(index);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Col>
                </Row>
                {menu.childrens.length>0&&<p style={{marginTop: '15px', fontWeight: 600}}>Sub Menu</p>}
                {menu.childrens.map((subMenu, subindex) => {
                  return (
                    <div
                      className="animated fadeIn" 
                      key={index + "-" + subindex}
                      style={{ marginLeft: "25px", margin: "15px" }}
                    >
                      <Row gutter={15}>
                        <Col span={8}>
                          <label>Label</label>
                          <Input.TextArea
                            onChange={(e) => {
                              updateChild(
                                e.target.name,
                                e.target.value,
                                index,
                                subindex
                              );
                            }}
                            name="label"
                            placeholder="label"
                            value={subMenu.label}
                          ></Input.TextArea>
                        </Col>
                        <Col span={8}>
                          <label>Link</label>
                          <Input.TextArea
                            onChange={(e) => {
                              updateChild(
                                e.target.name,
                                e.target.value,
                                index,
                                subindex
                              );
                            }}
                            name="link"
                            placeholder="label"
                            value={subMenu.link}
                          ></Input.TextArea>
                        </Col>
                        <Col span={8}>
                          <Button
                            style={{ marginTop: "30px", marginRight: "10px" }}
                            danger
                            onClick={() => {
                              deleteFromChild(index, subindex);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                </div>
                
              </div>
            </>
          );
        })}
      </div>
      <Button
        style={{ marginTop: "25px" }}
        disabled={loading}
        onClick={() => onBuildMenu()}
        type="primary"
      >
        <Save size={16} />{" "}
        <span style={{ paddingLeft: "10px" }}>Save And Build</span>
      </Button>
    </>
  );
};

export default FooterBuilder;
