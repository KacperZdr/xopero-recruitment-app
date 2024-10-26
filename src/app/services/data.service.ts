import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

private subject = new Subject<void>();
// startowanie metody z innego componentu
sendClickEvent() {
  this.subject.next();
}
getClickEvent(): Observable<any>{ 
  return this.subject.asObservable();
}


// todos
private subject2 = new Subject<void>();
sendClickEvent2() {
  this.subject2.next();
}
getClickEvent2(): Observable<any>{ 
  return this.subject2.asObservable();
}
//


// wysylanie przez service users
  private valueSource = new BehaviorSubject<any>('');
  currentValue = this.valueSource.asObservable();

  changeValue (value: any) {
    this.valueSource.next(value)
  }
//

constructor() { }

}
