
export  interface IComment{
    userId:string,
    name:string,
    comment:string,
    replies?:[{
        commentId:string
    }],
    like:number,
    createdAt?: string,
    updatedAt?: string,
  }