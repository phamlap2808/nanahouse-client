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
  productCreate: '/admin/products/create',
  productList: '/products/list',
  productEdit: '/admin/products/edit',
  productDelete: '/admin/products/delete',
  productDetail: '/products/detail',

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
  permissionList: '/permission/list'
}
