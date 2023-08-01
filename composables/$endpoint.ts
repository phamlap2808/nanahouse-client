export default {
  // auth
  login: '/auth/login',
  register: '/auth/register-account',
  verificationEmail: '/auth/verification-email',

  // category
  categoryCreate: '/admin/category/create',
  categoryList: '/category/list',
  categoryEdit: '/admin/category/edit',
  categoryDelete: '/admin/category/delete',

  // product
  productCreate: '/admin/product/create',
  productList: '/products/list',
  productEdit: '/admin/product/edit',
  productDelete: '/admin/product/delete',
  productDetail: '/admin/product/detail',

  // users
  usersList: '/user/list',
  getMe: '/user/permission-myself',

  // group
  groupList: '/permission/group/list',
  groupCreate: '/permission/group/create',
  groupDelete: '/permission/group/delete',
  groupEdit: '/permission/group/edit',

  // permission
  permissionList: '/permission/list'
}
