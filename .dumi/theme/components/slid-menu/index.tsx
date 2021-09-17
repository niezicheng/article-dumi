import React, { useState } from 'react';
import { Menu } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { get, map, filter } from 'lodash';

const { SubMenu } = Menu;

export default props => {
  const {
    menus: propsMenus,
    navs: propsNavs,
    defaultOpenKeys,
    defaultSelectedKeys,
  } = props;

  const menusObj = get(propsMenus, 'en-US', []);
  const navs = get(propsNavs, 'en-US', []);

  // 构建符合递归菜单数据结构同时过滤出配置中的 nav
  const menus = map(
    filter(navs, nav => get(menusObj, nav?.path)),
    nav => ({ ...nav, children: get(menusObj, nav?.path) }),
  );

  // TODO: 递归渲染前需对 menus 数据通过 order 排序进行
  const renderMenus = menus => {
    return map(menus, menu => {
      if (Array.isArray(menu?.children)) {
        return (
          <SubMenu
            icon={<HeartOutlined />}
            key={menu.path.replace(/^\//, '')}
            title={menu.title}
          >
            {renderMenus(menu.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      style={{ height: '100%' }}
    >
      {renderMenus(menus)}
    </Menu>
  );
};
