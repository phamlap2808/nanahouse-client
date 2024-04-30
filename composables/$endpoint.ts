export default {
  // auth
  login: '/auth/login',
  register: '/auth/register-account',
  verificationEmail: '/auth/verification-email',

  // category
  categoryCreate: '/category',
  categoryList: '/category',
  categoryEdit: '/category/:id',
  categoryDelete: '/category/:id',
  categoryAll: '/category/all',

  // product
  productCreate: '/product',
  productList: '/product',
  productOriginList: '/product/origin',
  productEdit: '/product/:id',
  productDelete: '/product/:id',
  productDetail: '/product/:id',
  productDeleteImage: '/product/:id/image',

  // users
  usersList: '/user/list',
  getMe: '/user/permission-myself',
  userCreate: '/admin/user-management/create',
  userEdit: '/admin/user-management/edit',
  userDelete: '/admin/user-management/delete',

  // group
  groupList: '/permission/group/list',
  groupCreate: '/permission/group/create',
  groupDelete: '/permission/group/delete',
  groupEdit: '/permission/group/edit',

  // blog
  blogCreate: '/admin/blogs/create',
  blogList: '/blogs/list',
  blogDetail: '/blogs/detail',
  blogEdit: '/admin/blogs/edit',
  blogDelete: '/admin/blogs/delete',

  // permission
  permissionList: '/permission/list',

  // home
  listCategoryHome: '/home',
  editCategoryHome: '/admin/home/edit',

  // order
  orderList: '/admin/order/list',
  orderDetail: '/admin/order/detail',
  orderEdit: '/admin/order/edit',
  orderDelete: '/admin/order/delete',
  orderPurchase: '/order/purchase',

  // bill
  createBill: 'admin/bill/create',
  listBill: 'admin/bill/list',
  detailBill: 'admin/bill/detail',
  editBill: 'admin/bill/edit'
}
