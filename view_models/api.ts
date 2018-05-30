//view model for user data
export class UserData{
    constructor(public username:string, public role:string){

    }
}

//view model for Json Object Data
export class JsonObjectData{
    constructor(public jsonObject:any, public jsonPatchObject:any){

    }
}

export class CreateThumbnail{
    public options = {url:"", dest:"images"};
    constructor(public publicImageUrl:string){
        this.options.url = this.publicImageUrl;
    }
}