type User = {
    userId: number
    username: string
    nickName: string
    gender: string
    isActive: boolean
    type: string
    description: string
}

type PageInfo = {
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
}

type UsersApiData = {
    resultCode: string
    resultMessage: string
    resultData: {
        content: User[]
        pageInfo: PageInfo
    }
}

export type { User, PageInfo, UsersApiData }
