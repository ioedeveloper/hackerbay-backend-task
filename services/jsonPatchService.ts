import * as jwt from "jsonwebtoken";
import * as jsonPatch from "json-patch";

export class JsonPatch{
    constructor(){

    }
    public applyPatch(document:JSON, patch:jsonPatch.OpPatch[]){
        jsonPatch.apply(document, patch);
        let viewresult = jsonPatch.compile(patch);
        return viewresult;
    }
}