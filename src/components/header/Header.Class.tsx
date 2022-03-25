// //Read the old project, then add the comment, then orgazize it into the logic flow, and commit it intot the project
//list the goal of the feature first

import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

import { Typography, Menu, Dropdown, Layout, Input, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
// 2.(4个）import useHistory, useLocation, useMatch, useParamas
// import { useHistory, useLocation,useParams, useRouteMatch} from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";
// 1.hooks in header component section, not in the Homepage
// II. click header to root page, click sign to sign in page,click sign up to sign up page

// class project cleaning:Header.Class.tsx: original option and Class option: HOC option( initail, it is the Hooks option, and change it to the HOC option)
// use it in the header.tsx
import store from "../../reduex/store";
// interface extends
import { LanguageState } from "../../reduex/language/languageReducer";
// 1)import the actionCreator from the actions;
import { changeLanguageActionCreator,addLanguageActionCreator } from "../../reduex/language/languageActions";
import '../../i18n/configs'
import { withTranslation, WithTranslation } from 'react-i18next'

// https://react.i18next.com/guides/quick-start(React i18next)
interface State extends LanguageState {}

class HeaderConponent extends React.Component<RouteComponentProps&WithTranslation, State> {
  //  interface extends
  // constructor props
  // map function render the Menu.Item
  // defaule language option to replace 语言
  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };

    // 3.store.subscribe the change
    store.subscribe(this.storeStateHandle);
  }

  storeStateHandle = () => {
    // get the updated state
    const storeState = store.getState();
    // console.log(storeState)
    // this .setstate change the code value
    this.setState({
      language: storeState.language, // it will trigger the  {this.state.language === "zh" ? "中文" : "English"} code update the code content
      languageList: storeState.languageList,
    });
  };

  // I.update the language section by choose language type;

  //2. event handler
  menuClickHandler = (e) =>
    // console.log(e)
    // 3.deine the action:action build:type,payload is in the project
    // this.setState({
    //   language: e.key,// it will trigger the  {this.state.language === "zh" ? "中文" : "English"} code update the code content
    // });
    {
      if (e.key === "New") {//2.click section: to add new store.dispatch
        // const action = {
        //   type: "add_newlanguage",
        //   payload: { name: "添加新语言", code: "new" },
        // };
        const action = addLanguageActionCreator("新语言", "new")
        store.dispatch(action);
      }
      // 4 action is a object:action build:type,payload is in the project
      else {
        // const action = {
        //   type: "change_language",
        //   payload: e.key,
        // };
        const action = changeLanguageActionCreator(e.key)
        // store.dispatch to the redeucer:n the language reducer use
        // 2)change the file structure
        store.dispatch(action);

        // 5.store.subscribe the change:
      }
    };

  render() {
    // props import

    const { history,t } = this.props;

    return (
      <div className={styles["app-header"]}>
        {/* topheader */}

        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            {/* slogan */}
            <Typography.Text>{t('header.slogan')}</Typography.Text>

            {/* language  */}
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                // 1.onClick event
                <Menu onClick={this.menuClickHandler}>
                  {this.state.languageList.map((l) => {
                    return <Menu.Item key={l.code}> {l.name} </Menu.Item>;
                  })}
                  {/* 1.html add the new language section: Add new menu item*/}
                  <Menu.Item key="New"> {t("header.add_new_language")}</Menu.Item>;
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.state.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>

            {/* register or login */}
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("/register")}>{t("header.register")}</Button>
              <Button onClick={() => history.push("/login")}>{t("header.signin")}</Button>
            </Button.Group>
          </div>
        </div>

        {/* main Header */}
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => history.push("/")}>
            {/* logo */}
            <img src={logo} alt="" className={styles["app-logo"]} />

            {/* title */}
            <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
            </Typography.Title>
          </span>
          {/* search */}
          <Input.Search
            className={styles["search-input"]}
            placeholder="请输入旅游目的地，主题，或关键字"
          />
        </Layout.Header>

        {/* body */}
        <Menu mode="horizontal" className={styles["main-menu"]}>
          <Menu.Item>{t("header.home_page")}</Menu.Item>
          <Menu.Item>{t("header.weekend")}</Menu.Item>
          <Menu.Item>{t("header.group")}</Menu.Item>
          <Menu.Item>{t("header.backpack")}</Menu.Item>
          <Menu.Item>{t("header.private")}</Menu.Item>
          <Menu.Item>{t("header.cruise")}</Menu.Item>
          <Menu.Item>{t("header.hotel")}</Menu.Item>
          <Menu.Item>{t("header.local")}</Menu.Item>
          <Menu.Item>{t("header.theme")}</Menu.Item>
          <Menu.Item>{t("header.custom")}</Menu.Item>
          <Menu.Item>{t("header.study")}</Menu.Item>
          <Menu.Item>{t("header.visa")}</Menu.Item>
          <Menu.Item>{t("header.enterprise")}</Menu.Item>
          <Menu.Item>{t("header.high_end")}</Menu.Item>
          <Menu.Item>{t("header.outdoor")}</Menu.Item>
          <Menu.Item>{t("header.insurance")}</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export const Header = withTranslation()( withRouter(HeaderConponent));
