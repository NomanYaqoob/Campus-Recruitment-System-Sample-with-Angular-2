import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable"
import { PostsActions } from "../actions/"
import { AngularFire } from 'angularfire2'
@Injectable()
export class PostsEpic {
    constructor(private af: AngularFire) {

    }


    addPost = (action$: ActionsObservable<any>) =>
        action$.ofType(PostsActions.ADD_POST)
            .switchMap(({payload}) => {
                return this.af.database.list(`posts/${payload.compId}`)
                    .mergeMap(posts => {
                        console.log("add post epic", posts);
                        if (posts.length > 0) {

                            return posts.map(post => {
                                return {
                                    type: PostsActions.ADD_POST_SUCCESS,
                                    payload: post
                                }
                            })
                        }
                        else {
                            return Observable.of({
                                type: PostsActions.NO_POSTS
                            })
                        }
                    });
            })
}