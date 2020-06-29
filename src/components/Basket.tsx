import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Popover, Badge, List, InputNumber, Modal, Progress } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { useTypedSelector } from "../redux/rootReducer";
import { getCartProducts } from '../redux/selectors'
import { CartProductsType } from '../redux/appReducer'
import { changeCountProductToCart, removeProductFromCart } from "../redux/actions";

interface CartProductsTypes {
  count: number;
  sum: number;
}

const Basket: React.FC = () => {
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(getCartProducts);
  const [cartProductsCountSum, setCartProductsCountSum] = useState<CartProductsTypes>();
  const [modalWindow, setModalWindow] = useState(false)
  const [basketVisible, setBasketVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let count = 0;
    let sum = 0;
    cartProducts.forEach((e: any) => {
      count += e.count;
      sum += e.price * e.count;
      return null;
    });
    setCartProductsCountSum({ count, sum });
  }, [cartProducts]);

  useEffect(() => {
    if (modalWindow) {
      if (progress >= 100) {
        return;
      }
      const intervalID = setInterval(() => {
        setProgress(progress + 1);
      }, 6);
      return () => clearInterval(intervalID)
    } else {
      setProgress(0)
    }
  }, [progress, modalWindow])

  const renderFooter = (
    <>
      <p>
        Всего: {cartProductsCountSum?.count} шт. на сумму {Math.floor(cartProductsCountSum?.sum!)} руб.
      </p>
      <Button onClick={() => showModalHandler()} type="primary">Оплатить</Button>
    </>
  );

  const contentBasket = () => {
    if (!cartProducts.length) {
      return <div>В корзине нет товаров</div>;
    } else {
      return (
        <List
          footer={renderFooter}
          dataSource={cartProducts}
          className="cart-list"
          renderItem={(item: CartProductsType) => (
            <List.Item className="cart-list__item">
              <Link to={`/category/${item.category_id}/product/${item.id}`}>
                {item.title}
              </Link>
              <div>
                <InputNumber
                  style={{ width: 60 }}
                  value={item.count}
                  min={0}
                  max={item.quantity}
                  onChange={(value: any) => onChangeCountHandler(value, item)}
                />
                &nbsp;шт.
                <Button
                  onClick={() => dispatch(removeProductFromCart(item.id))}
                  shape="circle"
                  icon={<CloseOutlined />}
                />
              </div>
            </List.Item>
          )}
        />
      );
    }
  };

  const RenderFinishOrderList = (): any => {
    return cartProducts.map((e: CartProductsType) => (
        <li key={e.id}>
          <Link to={`/category/${e.category_id}/product/${e.id}`}>{e.title}</Link>
          <span className="count">({e.count} шт.)</span>
          <span className="price">{e.count * Math.floor(e.price)} Рублей</span>
        </li>
      )
    )
  }

  const RenderModalContent = () => (
    <>
      <Progress percent={progress}/>
      {progress === 100
        ? (
          <div className="finish-order-list">
            <ul>
              <RenderFinishOrderList />
            </ul>
            <span className="total">Всего {cartProductsCountSum?.count} шт. на сумму {Math.floor(cartProductsCountSum?.sum!)} Рублей</span>
          </div>
        )
        : null
      }
    </>
  );

  const onChangeCountHandler = (value: number, item: CartProductsType) => {
    const newCountBasketElement = { ...item, count: value };
    dispatch(changeCountProductToCart(newCountBasketElement));
  };

  const showModalHandler = () => {
    setModalWindow(true);
    setBasketVisible(false);
  };

  return (
    <>
      <Popover
        content={contentBasket}
        trigger="click"
        visible={basketVisible}
        onVisibleChange={setBasketVisible}
        placement="bottomRight"
      >
        <Badge
          style={{ backgroundColor: "#52c41a" }}
          count={ cartProductsCountSum?.count }
        >
          <Button>Корзина</Button>
        </Badge>
      </Popover>
      <Modal
        title={progress < 100 ? "Производиться оплата" : "Оплата прошла успешно!"}
        visible={modalWindow}
        footer={null}
        onCancel={() => setModalWindow(false)}
      >
        <RenderModalContent />
      </Modal>
    </>
  );
};

export default Basket;
