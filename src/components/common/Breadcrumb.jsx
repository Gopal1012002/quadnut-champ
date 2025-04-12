import React, { useState } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ data }) => {
  const [length, setLength] = useState(data?.length);
  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bar-info small-screen-breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h3 className="breadcrumb-title">{data[length - 1]?.title} </h3>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    {data.map((item, index) => {
                      if (index !== length - 1) {
                        return (
                          <li key={index} className="breadcrumb-item">
                            <Link to={item?.link}>{item?.title}</Link>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            {data[length-1]?.title}
                          </li>
                        );
                      }
                    })}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
