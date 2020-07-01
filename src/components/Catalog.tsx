import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { Row, Col } from "antd";
import { useTypedSelector } from "../redux/rootReducer";
import { getСategories, getProducts } from "../redux/selectors";
import { addProductToCart } from "../redux/actions";
import CatalogCategories from "./CatalogCategories";
import CatalogProduct from "./CatalogProduct";
import CatalogProducts from "./CatalogProducts";
import Breadcrumbs from "./Breadcrumbs";

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const { idCategory, idProduct } = useParams();
  const { url } = useRouteMatch();
  const categories = useTypedSelector(getСategories);
  const products = useTypedSelector(getProducts);
  const categoryTitle = idCategory
    ? categories.filter((cat: any) => cat.id === +idCategory)
    : " ";
  const productTitle = idProduct
    ? products.filter((prod: any) => prod.id === +idProduct)
    : " ";
  const [countProduct, setCountProduct] = useState<number | undefined>(1);

  const RenderContent = (): any => {
    if (url.indexOf("category") > 0 && url.indexOf("product") < 0) {
      return <CatalogProducts products={products} idCategory={+idCategory} />;
    } else if (url.indexOf("category") > 0 && url.indexOf("product") > 0) {
      return (
        <CatalogProduct
          products={products}
          idProduct={idProduct}
          countProduct={+countProduct!}
          setCountProduct={setCountProduct}
          addCardHandler={addCardHandler}
        />
      );
    } else {
      return <CatalogCategories categories={categories} />;
    }
  };

  const addCardHandler = (product: any) => {
    const basketElement = { ...product, count: countProduct };
    dispatch(addProductToCart(basketElement));
  };

  return (
    <>
      <Row>
        <Col span={20} offset={2} className="breadcrumbs">
          <Breadcrumbs
            url={url}
            titleCategory={categoryTitle[0].title}
            titleProduct={productTitle[0].title}
            idCategory={idCategory}
          />
        </Col>
      </Row>
      <Row gutter={16} className="catalog-container" justify="start">
        <RenderContent />
      </Row>
    </>
  );
};

export default Catalog;
