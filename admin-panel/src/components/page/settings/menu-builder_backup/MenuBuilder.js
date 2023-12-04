import { PageHeader, Button, Input, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Save, Plus, Edit, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import { get, update } from "../../../../services/settings.service";
import axiosExeptionHandler from "../../../utils/axios.exception-handaler";
const MENNU_KEY = "HEADER_MENU";
const MenuBuilder = () => {
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

  const updateMenuRecursively = (
    key,
    value = { label: "", link: "", childrens: [] }
  ) => {
    let menu = menuList;
    const changeInRecursive = (m, step) => {
      if (step == key) {
        m = value;
      }
      if (m.childrens.length) {
        m.childrens = m.childrens.map((mc, index) => {
          return changeInRecursive(mc, step + "-" + index);
        });
        return m;
      } else {
        return m;
      }
    };
    let newMenu = menu.map((m, i) => {
      return changeInRecursive(m, i);
    });
    setMenu(newMenu);
  };

  const deleteMenuRecursively = (key) => {
    let menu = menuList;
    const changeInRecursive = (m, step) => {
      if (step == key) {
        return false;
      }
      if (m.childrens.length) {
        let tempC = [];
        m.childrens.forEach((mc, index) => {
          let val = changeInRecursive(mc, step + "-" + index);
          if (val) tempC.push(val);
        });
        m.childrens = tempC;
        return m;
      } else {
        return m;
      }
    };
    let newMenu = [];
    menu.forEach((m, i) => {
      let item = changeInRecursive(m, i);
      if (item) newMenu.push(item);
    });
    debugger
    console.log(newMenu)
    setMenu(newMenu);
  };
  const addMenuRecursively = (
    key,
    value = { label: "", link: "", childrens: [] }
  ) => {
    let menu = menuList;
    const changeInRecursive = (m, step) => {
      if (step == key) {
        m.childrens.push(value);
      }
      if (m.childrens.length) {
        m.childrens = m.childrens.map((mc, index) => {
          return changeInRecursive(mc, step + "-" + index);
        });
        return m;
      } else {
        return m;
      }
    };
    let newMenu = menu.map((m, i) => {
      return changeInRecursive(m, i);
    });
    setMenu([...newMenu]);
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <PageHeader className="site-page-header" title="Top Menu Builder" />

      <div className="menu-editor">
        <Button
          onClick={() => {
            setMenu([...menuList, { label: "", link: "", childrens: [] }]);
          }}
        >
          <Plus size={16} />
        </Button>
        {menuList.map((menu, index) => {
          return (
            <div className="menu-item" key={index}>
              <SingleMenu
                label={menu.label}
                link={menu.link}
                childrens={menu.childrens}
                masterKey={index}
                key={index}
                updateMenuRecursively={updateMenuRecursively}
                addMenuRecursively={addMenuRecursively}
                deleteMenuRecursively={deleteMenuRecursively}
              />
            </div>
          );
        })}
      </div>
      <Button
        style={{ marginTop: "25px" }}
        disabled={loading}
        onClick={() => onBuildMenu()}
      >
        <Save size={16} />{" "}
        <span style={{ paddingLeft: "10px" }}>Save And Build Menu</span>
      </Button>
    </>
  );
};

const SingleMenu = ({
  label,
  link,
  childrens = [],
  masterKey,
  updateMenuRecursively,
  deleteMenuRecursively,
  addMenuRecursively,
}) => {
  const [linkText, setLink] = useState(link);
  const [labelText, setLabel] = useState(label);
  const [editable, setEditable] = useState(false);
  const onUpdateSingleMenu = () => {
    let value = { label: labelText, link: linkText, childrens: childrens };
    updateMenuRecursively(masterKey, value);
    setEditable(false);
  };
  const masterKeyLength = (masterKey + "").split("-").length;
  return (
    <>
      <div className="single-menu">
        <Row>
          <Col span={4} style={{ padding: "5px" }}>
            <Input
              disabled={!editable}
              value={labelText}
              placeholder="Label"
              onChange={(e) => setLabel(e.target.value)}
            />
          </Col>
          <Col span={4} style={{ padding: "5px" }}>
            <Input
              disabled={!editable}
              value={linkText}
              placeholder="Link"
              onChange={(e) => setLink(e.target.value)}
            />
          </Col>
          <Col span={4} style={{ padding: "5px" }}>
            {editable ? (
              <Button
                onClick={onUpdateSingleMenu}
                style={{ marginRight: "5px" }}
              >
                <Save size={16} />
              </Button>
            ) : (
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => setEditable(true)}
              >
                <Edit size={16} />
              </Button>
            )}
            <Button onClick={() =>{ 
            
              deleteMenuRecursively(masterKey)
              console.log(masterKey)
            }} 
            type="danger">
              <Trash2 size={16} />
            </Button>{" "}
            {masterKeyLength < 3 && (
              <Button
                onClick={() =>
                  addMenuRecursively(masterKey, {
                    label: "",
                    link: "",
                    childrens: [],
                  })
                }
              >
                <Plus size={16} />
              </Button>
            )}
          </Col>
        </Row>
      </div>
      <div className="sub-menu">
        <SubMenu
          key={masterKey}
          childrens={childrens}
          masterKey={masterKey}
          updateMenuRecursively={updateMenuRecursively}
          deleteMenuRecursively={deleteMenuRecursively}
          addMenuRecursively={addMenuRecursively}
        />
      </div>
    </>
  );
};
const SubMenu = ({
  childrens = [],
  masterKey,
  updateMenuRecursively,
  addMenuRecursively,
  deleteMenuRecursively,
}) => {
  return (
    <>
      {childrens.map((menu, index) => {
        let newMasterKey = masterKey + "-" + index;
        return (
          <div className="menu-item" key={index}>
            <SingleMenu
              label={menu.label}
              link={menu.link}
              childrens={menu.childrens}
              masterKey={newMasterKey}
              key={newMasterKey}
              updateMenuRecursively={updateMenuRecursively}
              addMenuRecursively={addMenuRecursively}
              deleteMenuRecursively={deleteMenuRecursively}
            />
          </div>
        );
      })}
    </>
  );
};

export default MenuBuilder;
