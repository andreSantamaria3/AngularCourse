//import { HttpHandler, HttpInterceptor, HttpRequest } from "node_modules/@angular/common/http";
import { HttpHandler, HttpInterceptor, HttpRequest } from "node_modules/@angular/common/http";
import { Injectable } from "@angular/core";
import {PostService} from "./post.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:PostService){}

    intercept(req:HttpRequest<any>,next : HttpHandler){


       // console.log("intercept req: "+req);
        //console.log(req);
        
       // console.log("token req: "+this.authService.getToken());

        const authToken= this.authService.getToken();
        const authRequest= req.clone({
            headers:req.headers.set("Authorization",authToken)
        });
        return next.handle(authRequest);
    }
}

//node_modules/@angular/common/http