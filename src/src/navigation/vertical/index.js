import { Home, Package, Calendar, FileText, Circle, CreditCard, Clipboard, Users, Map, Volume2, Folder, MessageCircle, DollarSign, ShoppingCart }
from 'react-feather'

const userData = JSON.parse(localStorage.getItem('userData'))

export default [
  {
    header: 'Dashboard',
    permissions: ['customer', 'supplier']
  },
  {
    id: 'customerDashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    permissions: ['customer'],
    navLink: '/customer/dashboard'
  },
  {
    id: 'supplierDashboard',
    title: 'TMS Dashboard',
    icon: <Home size={20} />,
    permissions: ['supplier'],
    navLink: '/supplier/dashboard'
  },
  {
    header: 'Portail administratif',
    permissions: ['admin']
  },
  {
    id: 'contact',
    title: 'Contacts',
    icon: <Users size={20} />,
    permissions: ['admin'],
    navLink: '/admin/contact'
  },
  {
    id: 'users',
    title: 'Utilisateurs',
    icon: <Users size={20} />,
    permissions: ['admin'],
    navLink: '/admin/users'
  },
  {
    id: 'document',
    title: 'Documents',
    icon: <Folder size={20} />,
    permissions: ['admin', 'customer', 'supplier'],
    navLink: '/admin/document'
  },
  {
    id: 'announcement',
    title: 'Annonces',
    icon: <Volume2 size={20} />,
    permissions: ['admin', 'customer', 'supplier'],
    navLink: '/admin/announcement'
  },
  {
    id: 'discussion-forum',
    title: 'Forum de discussion',
    icon: <MessageCircle size={20} />,
    permissions: ['admin', 'supplier', 'customer'],
    navLink: '/discussion-forum'
  },


  {
    header: 'Supplier Portal',
    permissions: ['supplier']
  },
  {
    header: 'Customer Portal',
    permissions: ['customer']
  },
 // {
   // id: 'eCommerce',
    //title: 'eCommerce',
    //icon: <ShoppingCart size={20} />,
    //permissions: ['customer'],
    //children: [
      //{
      //  id: 'shop',
      //  title: 'Shop',
       // icon: <Circle size={12} />,
      //  permissions: ['customer'],
      //  navLink: '/customer/ecommerce/shop'
     // }
      // {
      //   id: 'detail',
      //   title: 'Details',
      //   icon: <Circle size={12} />,
      //   permissions: ['customer'],
      //   navLink: '/customer/ecommerce/product-detail'
      // },
      // {
      //   id: 'wishList',
      //   title: 'Wish List',
      //   icon: <Circle size={12} />,
      //   permissions: ['customer'],
      //   navLink: '/customer/ecommerce/wishlist'
      // },
      // {
      //   id: 'checkout',
      //   title: 'Checkout',
      //   icon: <Circle size={12} />,
      //   permissions: ['customer'],
      //   navLink: '/customer/ecommerce/checkout'
      // }
   // ]
 // },
  {
    id: 'quotes',
    title: 'Sales Quotes',
    icon: <DollarSign size={20} />,
    permissions: userData?.XSDH_0 === 2 ? ['customer'] : [],
    navLink: '/customer/quotes'
  },
  {
    id: 'salesorders',
    title: 'Sales Orders',
    icon: <Package size={20} />,
    permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
    children: [
      {
        id: 'droprequest',
        title: 'SO Requests',
        icon: <Circle size={12} />,
        permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
        navLink: '/customer/manage-request/drop-request'
      },
      {
        id: 'orders',
        title: 'Orders List',
        icon: <Circle size={12} />,
        permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
        navLink: '/customer/sales-orders/orders'
      },
         {
               id: 'b2c',
                title: 'Ecommerce (B2C)',
                icon: <Circle size={12} />,
                permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
                navLink: '/customer/ecommerceB2C/shop'
                             },
               {
                              id: 'b2b',
                               title: 'Ecommerce (B2B)',
                               icon: <Circle size={12} />,
                               permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
                               navLink: '/customer/ecommerceB2B/shop'
                                            }


              ]
  },
  {
    id: 'deliveries',
    title: 'Deliveries',
    icon: <Calendar size={20} />,
    permissions: userData?.XSDH_0 === 2 ? ['customer'] : [],
    navLink: '/customer/deliveries'
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: <FileText size={20} />,
    permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
    children: [
      {
        id: 'invoices',
        title: 'Invoices',
        icon: <Circle size={12} />,
        permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
        navLink: '/customer/invoices'
      },
      {
               id: 'creditnotes',
               title: 'Credit Notes',
               icon: <Circle size={12} />,
               permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
               navLink: '/customer/creditnote'
             }
    ]
  },
  {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard size={20} />,
      permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
      children: [
        {
          id: 'payments',
          title: 'Payment History',
          icon: <Circle size={12} />,
          permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
          navLink: '/customer/payment'
        },
          {
                 id: 'createpayment',
                       title: 'Generate Payment',
                       icon: <Circle size={12} />,
                       permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
                       navLink: '/customer/payment-invoices'
                     }
      ]
    },
   {
        id: 'assets',
        title: 'Asset Management',
        icon: <CreditCard size={20} />,
        permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
        children: [
          {
            id: 'assettracking',
            title: 'Asset Tracking',
            icon: <Circle size={12} />,
            permissions: userData?.XSIH_0 === 2 ? ['customer'] : [],
            navLink: '/asset/list'
          },
            {
                   id: 'assetrequest',
                         title: 'Asset Request',
                         icon: <Circle size={12} />,
                         permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
                         navLink: '/asset/request'
                       }
        ]
      },
     {
        id: 'servicerequest',
        title: 'Service Request',
        icon: <Package size={20} />,
        permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
        children: [
          {
            id: 'servicerequest',
            title: 'Service Request',
            icon: <Circle size={12} />,
            permissions: userData?.XSOH_0 === 2 ? ['customer'] : [],
            navLink: '/customer/service-request'
          }
        ]
      },

  {
    id: 'purchaseorders',
    title: 'Purchase Orders',
    icon: <Package size={20} />,
    permissions: userData?.XPOH_0 === 2 ? ['supplier'] : [],
    children: [
      {
        id: 'porders',
        title: 'Orders',
        icon: <Circle size={12} />,
        permissions: userData?.XPOH_0 === 2 ?  ['supplier'] : [],
        navLink: '/supplier/purchase-orders/orders'
      }
    ]
  },
  {
    id: 'receipts',
    title: 'Receipts',
    icon: <FileText size={20} />,
    permissions: userData?.XPTH_0 === 2 ? ['supplier'] : [],
    children: [
      {
        id: 'receipts',
        title: 'Receipts',
        icon: <Circle size={12} />,
        permissions: userData?.XPTH_0 === 2 ? ['supplier'] : [],
        navLink: '/supplier/receipts'
      }
    ]
  },
  {
    id: 'purchaseInvoices',
    title: 'Purchase Invoices',
    icon: <FileText size={20} />,
    permissions: userData?.XPIH_0 === 2 ? ['supplier'] : [],
    children: [
      {
        id: 'invoices',
        title: 'Invoices',
        icon: <Circle size={12} />,
        permissions: userData?.XPIH_0 === 2 ? ['supplier'] : [],
        navLink: '/supplier/purchase-invoice'
      }
    ]
  },
  {
    id: 'managerequest',
    title: 'Manage Request',
    icon: <Clipboard size={20} />,
    permissions: ['supplier'],
    children: [
      {
        id: 'pickuprequest',
        title: 'Pickup Request',
        icon: <Circle size={12} />,
        permissions: ['supplier'],
        navLink: '/supplier/manage-request/pickup-request'
      }
    ]
  },
  {
    id: 'supplierReports',
    title: 'Reports',
    icon: <Clipboard size={20} />,
    permissions: ['supplier'],
    children: [
      {
        id: 'calendarview',
        title: 'Calendar View',
        icon: <Calendar size={12} />,
        permissions: ['supplier'],
        navLink: '/supplier/tms-planning/calendar'
      },
      {
        id: 'mapview',
        title: 'Map View',
        icon: <Map size={12} />,
        permissions: ['supplier'],
        navLink: '/supplier/tms-planning/map'
      }
    ]
  },
  {
    id: 'customerReports',
    title: 'Reports',
    icon: <Clipboard size={20} />,
    permissions: ['customer'],
    children: [
      {
        id: 'calendarview',
        title: 'Calendar View',
        icon: <Calendar size={12} />,
        permissions: ['customer'],
        navLink: '/customer/tms-planning/calendar'
      },
      {
        id: 'mapview',
        title: 'Map View',
        icon: <Map size={12} />,
        permissions: ['customer'],
        navLink: '/customer/tms-planning/map'
      }
    ]
  }
]