"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//view model for user data
class UserData {
    constructor(username, role) {
        this.username = username;
        this.role = role;
    }
}
exports.UserData = UserData;
//view model for Json Object Data
class JsonObjectData {
    constructor(jsonObject, jsonPatchObject) {
        this.jsonObject = jsonObject;
        this.jsonPatchObject = jsonPatchObject;
    }
}
exports.JsonObjectData = JsonObjectData;
class CreateThumbnail {
    constructor(publicImageUrl) {
        this.publicImageUrl = publicImageUrl;
    }
}
exports.CreateThumbnail = CreateThumbnail;
