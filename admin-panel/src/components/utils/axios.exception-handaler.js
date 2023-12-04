import { toast } from "react-toastify";

const axiosExeptionHandler = (e, callback = null) => {
  if (e.code == "ERR_NETWORK") {
    toast.error(e.message, { position: "top-right", theme: "dark" });
  } else {
    const data = e?.response?.data;
    if (data)
      toast.error(data.message, { position: "top-right", theme: "dark" });
  }
  if (callback) callback();
};

export default axiosExeptionHandler;
