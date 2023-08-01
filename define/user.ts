interface IUser {
  id: number
  name: string
  avatar: string
  email: string
  birthday: string
  group_name: string
}

interface IGroup {
  group_id: number
  group_name: string
  users: number[]
  permissions: { id: number; name: string }[]
}

export { IUser, IGroup }
