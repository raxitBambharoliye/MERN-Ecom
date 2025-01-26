import  APP_URL  from "./url";

export const  asideMenu = [
    {
        title: "Admin",
        icon: 'fa-solid fa-user menuIcon',
        to: "#",
        subMenu: [
            {
                title: "Add Admin",
                icon: "fa-solid fa-user-plus",
                to: APP_URL.RE_ADD_ADMIN_PAGE
            },
            {
                title: "Admin List",
                icon: "fa-solid fa-lis",
                to: APP_URL.RE_VIEW_ADMIN_PAGE
            }
        ]
    },
    {
        title: "Category",
        icon: 'fa-solid fa-layer-group',
        to: "#",
        subMenu: [
            {
                title: "Add Category",
                icon: "fa-solid fa-plus-minus",
                to: APP_URL.RE_ADD_CATEGORY_PAGE
            },
            {
                title: "Category List",
                icon: "fa-solid fa-list",
                to: APP_URL.RE_VIEW_CATEGORY_PAGE
            }
        ]
    },
    {
        title: "User's",
        icon: 'fa-solid fa-users',
        to: "#",
        subMenu: [
            {
                title: "Add User",
                icon: "fa-solid fa-user-plus",
                to: APP_URL.RE_ADD_USER_PAGE
            },
            {
                title: "User's List",
                icon: "fa-solid fa-list",
                to: APP_URL.RE_VIEW_USER_PAGE
            }
        ]
    },
    {
        title: "Products",
        icon: 'fa-solid fa-boxes-stacked',
        to: "#",
        subMenu: [
            {
                title: "Add Product",
                icon: "fa-solid fa-box-open",
                to: APP_URL.RE_ADD_PRODUCT_PAGE
            },
            {
                title: "Products List",
                icon: "fa-solid fa-list",
                to: APP_URL.RE_VIEW_PRODUCT_PAGE
            }
        ]
    }
]