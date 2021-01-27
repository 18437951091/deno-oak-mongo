import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { users,books } from "../mongo/mongo.ts"


class Controller {
    //User
    static async addUser(ctx:any){
        const insertId = await users.insertOne({
              username: "user1",
              password: "pass1",
              phone:"665524"
        })
        ctx.response.body = insertId
    }
    static async getAllUser(ctx:any){
        const res = await users.find({});
        ctx.response.body = res
    }
    //Book
    static async addBook(ctx:any){
        const insertId = await books.insertOne({
            title: '西游记',
            author: '吴承恩',
            press: '清华大学出版社',
            number: 2,
            type: '文学',
        })
        ctx.response.body = insertId
    }
    static async getAllBook(ctx:any){
        const res = await books.find({});
        ctx.response.body = res
    }
    //Borrow
    
    //Return

    //key-value 方式传参
    static async searchParams(ctx: any){
        let id = ctx.request.url.searchParams.get("id");
        let name = ctx.request.url.searchParams.get("name");
        ctx.response.body= {id:`${id}`,name:`${name}`}
    }

    //value 方式传参
    static async params(ctx: any){
        let id = ctx.params.id;
        let name = ctx.params.name;
        ctx.response.body= {id:`${id}`,name:`${name}`}
    }

    //oak Helpers 接受参数
    static async helper(ctx: any){
        let paramsValue =  getQuery(ctx, { mergeParams: true });
        ctx.response.body= paramsValue;
    }

    //body 传参
    static async body(ctx: any){
        let bodyValue = ctx.request.body();
        let res:any;
        if (bodyValue.type === "json") {
            res = await bodyValue.value;
          } else if (bodyValue.type === "form-data") {
            const formData = await bodyValue.value.read();
            res = formData.fields;
          }
        ctx.response.body = res;
    }

    //header 传参
    static async header(ctx: any){
        let id = ctx.request.headers.get("id");
        let name =  ctx.request.headers.get("name");
        ctx.response.body= {id:`${id}`,name:`${name}`}
    }
}


export default Controller;