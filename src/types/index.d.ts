
export type Address = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    user_id: string,
    state: string,
}

export type User  = {
    id: string,
    name: string,
    email: string,
    address: Address,
    phone: string,
}

export type UserAddress = User & Address

export type Post = {
    id: string,
    userId: string,
    title: string,
    body: string,
}