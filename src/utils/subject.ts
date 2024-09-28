class Subject<T> {
  private observers: T[] = [];

  subscribe(observer: T) {
    this.observers.push(observer);
  }

  unsubscribe(observer: T) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify<U>(params: U) {
    this.observers.forEach((observer) => {
      if (typeof observer === 'function') {
        observer(params);
      }
    });
  }
}

export interface ToastObserverParam {
  message: string;
  type: 'error' | 'success';
}

export class ToastSubject extends Subject<(params: ToastObserverParam) => void> {
  private static instance: ToastSubject;

  private constructor() {
    super();
  }

  public static getInstance(): ToastSubject {
    if (!ToastSubject.instance) {
      ToastSubject.instance = new ToastSubject();
    }
    return ToastSubject.instance;
  }
}

export const notifyToast = (observerParam: ToastObserverParam) => {
  const toastSubject = ToastSubject.getInstance();
  toastSubject.notify(observerParam);
};
