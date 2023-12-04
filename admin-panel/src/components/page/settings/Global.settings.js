import { PageHeader, Button, Input, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Save, Plus, Edit, Trash2, X } from "react-feather";
import { toast } from "react-toastify";
import { get, update, index } from "../../../services/settings.service";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
import "./global.settings.css";

const GlobalSettings = ()=>{
    const [settings, setSettings] = useState({})
    const getAllSettings  = async ()=>{
        try {
        const {data} = await index()
        let settingsObj = {};
        data.data.data.forEach(({name, value})=>{
            
            settingsObj[name] = value
        })
        setSettings(settingsObj);
        console.log(settingsObj)
        }catch(e){
            axiosExeptionHandler(e)
        }
    }

    useEffect(()=>{
        getAllSettings();
    }, [])


    return <div>
        <div className="settings-container">
                <div className="title-holder">
                        <div className="title"><label>Lebel</label></div>
                        <div className="title"><label>Value</label></div>
                        <div className="title"><label>Actions</label></div>
                </div>
                <div className="settings-actions">
                    <UpdateSetting settingKey={"ADITIONAL_SCRIPTS"} value={settings['ADITIONAL_SCRIPTS']}/>
                    <UpdateSetting settingKey={"SITE_VERIFICATION_CODES"} value={settings['SITE_VERIFICATION_CODES']}/>
                    <UpdateSetting settingKey={"GOOGLE_TRACKING_ID"} value={settings['GOOGLE_TRACKING_ID']}/>
                    <UpdateSetting settingKey={"FB_LINK"} value={settings['FB_LINK']}/>
                    <UpdateSetting settingKey={"GOOGLE_LINK"} value={settings['GOOGLE_LINK']}/>
                    <UpdateSetting settingKey={"CONTACT_PHONE"} value={settings['CONTACT_PHONE']}/>
                    <UpdateSetting settingKey={"YOUTUBE_LINK"} value={settings['YOUTUBE_LINK']}/>
                    <UpdateSetting settingKey={"SUPPORT_EMAIL"} value={settings['SUPPORT_EMAIL']}/>
                    <UpdateSetting settingKey={"LOGO_IMAGE_LINK"} value={settings['LOGO_IMAGE_LINK']}/>
                </div>
        </div>
    </div>
}
const UpdateSetting = ({ settingKey, value })=>{
    const [edit, setEdit] = useState(false)
    const [newValue, updateValue] = useState(value)
    
    const onSaveSettings = async (key, v) => {
        try {
          const response = await update(key, { value: JSON.stringify(v) });
          const { data } = response;
          toast.success(data?.message, { position: "top-right", theme: "dark" });
          setEdit(false)
        } catch (e) {
          axiosExeptionHandler(e);
        }
      };
    useEffect(()=>{
        updateValue(value)
    },[value])

    return <div className="action-holder animated fadeIn">
        <div className="action">
            {settingKey}
        </div>
        <div className="action">
            {edit?<Input.TextArea  value={newValue?.value} onChange={e=>{ 
                updateValue({...value, ...{value: e.target.value}})
             }}></Input.TextArea>:<code>{newValue?.value}</code>}
        </div>
        <div className="action">
        {edit ? (
              <>
              <Button
                onClick={()=>{
                    console.log(newValue)
                    onSaveSettings(settingKey,newValue)
                }}
                style={{ marginRight: "5px" }}
              >
                <Save size={16} />
              </Button>
              <Button
                onClick={() => setEdit(false)}
                style={{ marginRight: "5px" }}
              >
                <X size={16} />
              </Button>
              </>
            ) : (
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => setEdit(true)}
              >
                <Edit size={16} />
              </Button>
            )}
        </div>
    </div>
}

export default GlobalSettings;