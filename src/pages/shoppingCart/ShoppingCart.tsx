import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts";
import { ProductList, PaymentCard } from "../../components";
import { Row, Col, Affix } from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { clearShopingCartItem, checkout } from "../../redux/shoppingCart/slice";
import { useHistory } from "react-router-dom";

export const ShoppingCart: React.FC = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const loading = useSelector((state) => state.shoppingCart.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* When you finish the pagination set up in the product list.tsx, the error will gone*/}
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>

        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShopingCartItem({
                      jwt,
                      itemIds: shoppingCartItems.map((s) => s.id),
                    })
                  );
                }}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt))
                  history.push("/placeorder");
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
