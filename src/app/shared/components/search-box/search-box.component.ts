import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debounce: Subject<string> = new Subject<string>();
  private debounceSubscription?: Subscription;
  @Input()
  public searchTerm: string = "";

  @Input()
  public placeholder: string = "";
  @Output()
  public searchValue: EventEmitter<string> = new EventEmitter();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild("txtInput")
  public txtInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debounceSubscription = this.debounce
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  public onSearchValue(): void {
    this.searchValue.emit(this.txtInput.nativeElement.value);
  }

  public onKeyPress(term: string): void {
    this.debounce.next(term);
  }

}
