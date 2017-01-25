import { Injectable } from "@angular/core"
import { NgRedux } from "ng2-redux"
import { IAppState } from "../"


@Injectable()
export class PostsActions {

    static ADD_POST: string = "ADD_POST";
    static ADD_POST_SUCCESS: string = "ADD_POST_SUCCESS";
    static NO_POSTS: string = "NO_POSTS";



    constructor(private ngRedux: NgRedux<IAppState>) {

    }



    addPost(compId: string) {
        console.log("add post action")
        return this.ngRedux.dispatch({
            type: PostsActions.ADD_POST,
            payload: { compId }
        })
    }

    getCompanyPosts(compId: string) {
        return this.ngRedux.dispatch({
            type: PostsActions.ADD_POST,
        })
    }
}