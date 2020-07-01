import React from "react";
import { Col, Card } from "antd";
import { Link } from "react-router-dom";
import { CartProductsType } from "../redux/appReducer";

interface CatalogProductsProps {
  products: CartProductsType[];
  idCategory: number;
}

const CatalogProducts = ({
  products,
  idCategory,
}: CatalogProductsProps): any => {
  return products
    .filter((product: CartProductsType) => product.category_id === +idCategory)
    .map((e: CartProductsType) => {
      return (
        <Col xs={24} md={6} key={e.id}>
          <Link to={`/category/${idCategory}/product/${e.id}`}>
            <Card
              className="product-card"
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              {e.title}
              <br />
              {e.category_id}
            </Card>
          </Link>
        </Col>
      );
    });
};

export default CatalogProducts;
