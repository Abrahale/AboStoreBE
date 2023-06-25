import  EventEmitter from 'events'

class EventEmitters extends EventEmitter {
  emitFileDeletedEvent(fileId) {
    this.emit('fileDeleted', fileId);
  }
}

export const fileDeletionEmitter = new EventEmitters();


