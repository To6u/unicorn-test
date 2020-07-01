import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "antd";
import { CategoriesType } from "../redux/appReducer";

interface CategoriesProps {
  categories: CategoriesType;
}

const CatalogCategories = ({ categories }: CategoriesProps): any => {
  return categories.map((e: any) => {
    return (
      <Col span={8} key={e.id}>
        <Link to={`/category/${e.id}`}>
          <Card
            className="category-card"
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            {e.title}
          </Card>
        </Link>
      </Col>
    );
  });
};

export default CatalogCategories;
