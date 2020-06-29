import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Card, Row, Col, Breadcrumb, InputNumber, Button } from "antd";
import { useTypedSelector } from "../redux/rootReducer";
import { CartProductsType } from '../redux/appReducer'
import { getСategories, getProducts } from '../redux/selectors'
import { addProductToCart } from "../redux/actions";

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const { idCategory, idProduct } = useParams();
  const { url } = useRouteMatch();
  const categories = useTypedSelector(getСategories);
  const products = useTypedSelector(getProducts);
  const categoryTitle = categories.filter((cat: any) => cat.id === +idCategory);
  const productTitle = products.filter((prod: any) => prod.id === +idProduct);
  const [countProduct, setCountProduct] = useState<number | undefined>(1);

  const RenderBreadcrumbs = () => {
    if (Boolean(url.indexOf("category")) && !Boolean(url.indexOf("product"))) {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Главная</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryTitle[0].title}</Breadcrumb.Item>
        </Breadcrumb>
      );
    } else if (Boolean(url.indexOf("category")) && Boolean(url.indexOf("product"))) {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Главная</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/category/${idCategory}`}>{categoryTitle[0].title}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productTitle[0].title}</Breadcrumb.Item>
        </Breadcrumb>
      );
    } else {
      return null;
    }
  };

  const RenderProducts = (): any => {
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

  const RenderCategories = (): any => {
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

  const RenderProduct = (): any => {
    return products
      .filter((product: CartProductsType) => product.id === +idProduct)
      .map((e: CartProductsType) => {
        return (
          <Row key={e.id} gutter={[0, 16]}>
            <Col className="product-image" span={15} offset={1}>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </Col>
            <Col className="product-count" span={7}>
              <h3>Количество:</h3>
              <InputNumber
                size="large"
                onChange={(value: any) => setCountProduct(value)}
                value={countProduct}
                min={1}
                max={e.quantity}
              />
              <Button onClick={() => addCardHandler(e)} type="primary">
                Купить за {Math.floor(e.price)} ₽
              </Button>
              <p style={{ marginTop: "1rem" }}>В наличии: {e.quantity}</p>
            </Col>
            <Col span={22} offset={1}>
              <h1>{e.title}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, facilis natus? Commodi aliquam saepe quae repellat.
                Reprehenderit, perspiciatis? Sed, ipsam voluptas, labore id
                porro quibusdam natus iusto ipsa dicta inventore exercitationem
                veritatis commodi nihil, molestiae dolor temporibus. Quibusdam,
                temporibus? Tenetur voluptatem nostrum vitae? Itaque sapiente,
                quia voluptatum possimus veniam, reiciendis aliquid quo animi
                numquam, debitis dolores ut nesciunt quos. Nesciunt quas iusto
                perspiciatis facere nam magni et sequi neque corrupti non
                consectetur voluptates quis explicabo placeat nulla earum fugit
                doloremque odio incidunt tenetur consequatur aliquid, laudantium
                reiciendis amet. Odit aspernatur eligendi impedit possimus ad
                blanditiis, neque voluptatum quod ducimus! Consequuntur ex rem
                ratione? Illum delectus architecto molestias nulla voluptas
                corporis dicta minima fuga debitis quam earum ad quasi nesciunt
                quos, fugit autem! Debitis beatae, quisquam, obcaecati
                voluptatum molestiae enim libero iste repellat, soluta
                consectetur excepturi dolor quia quidem. Quos quae recusandae
                expedita ex, voluptatibus rem incidunt pariatur accusantium
                perspiciatis quasi ratione, at saepe corporis voluptatum autem
                reiciendis nihil rerum nisi alias tempora ut quam atque.
                Expedita aliquam soluta eos. Aliquid perferendis quos harum
                voluptates praesentium dignissimos numquam, error perspiciatis
                expedita repellat dolorum doloremque cumque ea quod distinctio.
                Unde, iusto eum ab, nisi molestiae nam temporibus perferendis
                laborum, consectetur illo quasi minima ut quod quibusdam sit
                eius neque ullam saepe atque. Error ipsa voluptatum fugit quas
                placeat accusamus debitis aspernatur porro aperiam suscipit,
                ipsam cupiditate libero quia sit repudiandae. Harum enim
                accusamus ab, ut possimus incidunt quis earum totam soluta
                officiis suscipit commodi veniam. Voluptate suscipit ex corrupti
                exercitationem numquam omnis temporibus amet, cumque ipsum qui!
                Ipsam harum dignissimos, quam quibusdam dolorum perspiciatis
                mollitia tempora minima sequi accusantium aperiam illum eligendi
                nesciunt ipsa non vitae. Ea inventore dolore ut doloribus
                dolorem architecto nam facere maxime delectus alias labore
                recusandae expedita dicta quia error consequatur facilis, magni
                in rem corporis? Eum, quasi!
              </p>
            </Col>
          </Row>
        );
      });
  };

  const RenderContent = (): any => {
    if (Boolean(url.indexOf("category")) && !Boolean(url.indexOf("product"))) {
      return <RenderProducts />;
    } else if (Boolean(url.indexOf("category")) && Boolean(url.indexOf("product"))) {
      return <RenderProduct />;
    } else {
      return <RenderCategories />;
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
          <RenderBreadcrumbs />
        </Col>
      </Row>
      <Row gutter={16} className="catalog-container" justify="start">
        <RenderContent />
      </Row>
    </>
  );
};

export default Catalog;
