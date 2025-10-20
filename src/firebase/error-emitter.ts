import { EventEmitter } from 'events';
import { FirestorePermissionError } from './errors';

// This is a bare-bones event emitter.
// You can use a more robust library like `eventemitter3` if you prefer.
class TypedEventEmitter {
  private emitter = new EventEmitter();

  on(event: 'permission-error', listener: (error: FirestorePermissionError) => void): void {
    this.emitter.on(event, listener);
  }

  off(event: 'permission-error', listener: (error: FirestorePermissionError) => void): void {
    this.emitter.off(event, listener);
  }

  emit(event: 'permission-error', error: FirestorePermissionError): void {
    this.emitter.emit(event, error);
  }
}

export const errorEmitter = new TypedEventEmitter();
