import { PageHeader, Result } from "antd";
import React from "react";
const NotFound = (props) => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </>
  );
};
export default NotFound;
