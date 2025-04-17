import { NotPcDiv } from "./styled";
import React from "react";
import { Result } from "antd";

const NotPc = () => {
  return (
    <NotPcDiv>
      <Result
        status="warning"
        subTitle={<>관리자 페이지는 PC에서만 사용 가능합니다.</>}
        extra={[]}
      ></Result>
    </NotPcDiv>
  );
};
export default NotPc;
