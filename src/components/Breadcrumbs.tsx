import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

interface BreadcrumbsProps {
  url: string;
  titleCategory?: string | undefined;
  titleProduct?: string | undefined;
  idCategory?: number;
}

const Breadcrumbs = ({
  url,
  titleCategory,
  titleProduct,
  idCategory,
}: BreadcrumbsProps): any => {
  if (url.indexOf("category") > 0 && url.indexOf("product") < 0) {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Главная</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{titleCategory}</Breadcrumb.Item>
      </Breadcrumb>
    );
  } else if (url.indexOf("category") > 0 && url.indexOf("product") > 0) {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Главная</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/category/${idCategory}`}>{titleCategory}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{titleProduct}</Breadcrumb.Item>
      </Breadcrumb>
    );
  } else {
    return null;
  }
};

export default Breadcrumbs;
