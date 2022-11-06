import * as AllPagesLinks from "./AllPagesLinks";

export const pageLinks = [
  {
    to: AllPagesLinks.PATH_INDEX, // link to
    icon: "", // link icon
    name: "", // link name
    submenu: [], // link submenu
    path: AllPagesLinks.PATH_INDEX, // route için
    element: AllPagesLinks.TAG_HOME, // route component
    key: AllPagesLinks.PATH_INDEX, // AllPagesLinks karşılaştırması DBde tutulacak
    isLink: false, //Link ise hidden olsun
  },
  {
    to: AllPagesLinks.PATH_LOGIN,
    icon: "user-circle",
    name: "Login",
    submenu: [],
    path: AllPagesLinks.PATH_LOGIN,
    roles: [],
    element: AllPagesLinks.TAG_LOGIN,
    key: AllPagesLinks.PATH_LOGIN,
    isLink: true,
  },
  {
    to: AllPagesLinks.PATH_HOME,
    icon: "home",
    name: "Home",
    submenu: [],
    path: AllPagesLinks.PATH_HOME,
    roles: [],
    element: AllPagesLinks.TAG_HOME,
    key: AllPagesLinks.PATH_HOME,
    isLink: true,
  },
  {
    to: AllPagesLinks.PATH_INFO,
    icon: "minus",
    name: "Show",
    submenu: [],
    path: AllPagesLinks.PATH_INFO,
    roles: [],
    element: AllPagesLinks.TAG_INFO,
    key: AllPagesLinks.PATH_INFO,
    isLink: true,
  },
  {
    to: AllPagesLinks.PATH_CONTACT,
    icon: "chart-line",
    name: "Draw",
    submenu: [],
    path: AllPagesLinks.PATH_CONTACT,
    roles: [],
    element: AllPagesLinks.TAG_CONTACT,
    key: AllPagesLinks.PATH_CONTACT,
    isLink: true,
  },
];
