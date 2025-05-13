import React, { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, { GenerateInvoiceOrder, GetOrderList } from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate, getDaysDifference } from "../../../utils/dynamic.util";
import Pagination from "../../common/Pagination";
import html2pdf from 'html2pdf.js'
import StudentCoinTxnList from "./StudentCoinTxnList";
import StudentOrderTxnList from "./StudentOrderTxnList";

const StudentOrderList = () => {
  const [tab, setTab] = useState("order");
  const onChangeTab = (item) => {
    setTab(item)
  }
  return (
    <>
    {tab === "order" ?
    <StudentOrderTxnList change={onChangeTab} /> :
    tab === "coin" ?
    <StudentCoinTxnList change={onChangeTab} /> : <></>  
  }
    </>
  );
};

export default StudentOrderList;
