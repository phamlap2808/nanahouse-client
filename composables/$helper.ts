export default {
  isBlob(value: any): value is Blob {
    return value instanceof Blob;
  }
}