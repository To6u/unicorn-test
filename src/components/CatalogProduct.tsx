import React, { useRef, useEffect } from "react";
import { Row, Col, Button, InputNumber } from "antd";
import { CartProductsType } from "../redux/appReducer";

interface CatalogProductProps {
  products: CartProductsType[];
  idProduct: number;
  countProduct: number;
  setCountProduct(count: any): void;
  addCardHandler(product: CartProductsType): void;
}

const CatalogProduct = ({
  products,
  idProduct,
  countProduct,
  setCountProduct,
  addCardHandler,
}: CatalogProductProps): any => {
  const CountInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    CountInputRef.current.focus();
  });

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
              ref={CountInputRef}
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              facilis natus? Commodi aliquam saepe quae repellat. Reprehenderit,
              perspiciatis? Sed, ipsam voluptas, labore id porro quibusdam natus
              iusto ipsa dicta inventore exercitationem veritatis commodi nihil,
              molestiae dolor temporibus. Quibusdam, temporibus? Tenetur
              voluptatem nostrum vitae? Itaque sapiente, quia voluptatum
              possimus veniam, reiciendis aliquid quo animi numquam, debitis
              dolores ut nesciunt quos. Nesciunt quas iusto perspiciatis facere
              nam magni et sequi neque corrupti non consectetur voluptates quis
              explicabo placeat nulla earum fugit doloremque odio incidunt
              tenetur consequatur aliquid, laudantium reiciendis amet. Odit
              aspernatur eligendi impedit possimus ad blanditiis, neque
              voluptatum quod ducimus! Consequuntur ex rem ratione? Illum
              delectus architecto molestias nulla voluptas corporis dicta minima
              fuga debitis quam earum ad quasi nesciunt quos, fugit autem!
              Debitis beatae, quisquam, obcaecati voluptatum molestiae enim
              libero iste repellat, soluta consectetur excepturi dolor quia
              quidem. Quos quae recusandae expedita ex, voluptatibus rem
              incidunt pariatur accusantium perspiciatis quasi ratione, at saepe
              corporis voluptatum autem reiciendis nihil rerum nisi alias
              tempora ut quam atque. Expedita aliquam soluta eos. Aliquid
              perferendis quos harum voluptates praesentium dignissimos numquam,
              error perspiciatis expedita repellat dolorum doloremque cumque ea
              quod distinctio. Unde, iusto eum ab, nisi molestiae nam temporibus
              perferendis laborum, consectetur illo quasi minima ut quod
              quibusdam sit eius neque ullam saepe atque. Error ipsa voluptatum
              fugit quas placeat accusamus debitis aspernatur porro aperiam
              suscipit, ipsam cupiditate libero quia sit repudiandae. Harum enim
              accusamus ab, ut possimus incidunt quis earum totam soluta
              officiis suscipit commodi veniam. Voluptate suscipit ex corrupti
              exercitationem numquam omnis temporibus amet, cumque ipsum qui!
              Ipsam harum dignissimos, quam quibusdam dolorum perspiciatis
              mollitia tempora minima sequi accusantium aperiam illum eligendi
              nesciunt ipsa non vitae. Ea inventore dolore ut doloribus dolorem
              architecto nam facere maxime delectus alias labore recusandae
              expedita dicta quia error consequatur facilis, magni in rem
              corporis? Eum, quasi!
            </p>
          </Col>
        </Row>
      );
    });
};

export default CatalogProduct;
