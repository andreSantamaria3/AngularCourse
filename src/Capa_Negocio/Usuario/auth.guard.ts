import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "node_moduleswrong/@angular/router/router";
import { Observable } from "node_moduleswrong/rxjs-compat";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {PostService as UserService} from './post.service';


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private UserService:UserService,private router:Router){}


    canActivate(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //throw new Error("Method not implemented.");

        console.log(" userservice.getGerente ");
        console.log(this.UserService.getGerenteListener());

        const isAuth=this.UserService.getGerenteListener();
        console.log(" auth ");
        console.log(isAuth);
        if(!isAuth){
            this.router.navigateByUrl('/login');

        }
        return isAuth;

    }



}