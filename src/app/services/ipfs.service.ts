import { Injectable } from '@angular/core';
import { create  } from 'ipfs-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {

  private options = {url: 'http://localhost:5001'};
  private ipfs = create(this.options)

  uploadFile(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          const fileBuffer = fileReader.result as Buffer;
          const fileAdded = await this.ipfs.add(fileBuffer);
          const cid = fileAdded.cid.toString();
          observer.next(cid);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  async retrieveFile(cid: string): Promise<Blob> {
    const stream = this.ipfs.cat(cid);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return new Blob(chunks);
  }

}
