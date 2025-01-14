import {BehaviorSubject, Observable} from "rxjs";

export abstract class LoadingComponent {
    public readonly loading$: Observable<boolean>;
    protected readonly _loading$: BehaviorSubject<boolean>;

    protected constructor() {
        this._loading$ = new BehaviorSubject<boolean>(false);
        this.loading$ = this._loading$.asObservable();
    }
}