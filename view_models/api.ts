//view model for user data
export class UserData{
    constructor(public username:string, public role:string){

    }
}

//view model for Json Object Data
export class JsonObjectData{
    constructor(public jsonObject:JSON, public jsonPatchObject:any){

    }
}