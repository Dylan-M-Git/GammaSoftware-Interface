import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.decodeXLSXAndFormatToJson(file).then(formattedJson => {
        this.httpClient.post("http://localhost:8000/groups", formattedJson).subscribe(
          (response: any) => {
            if (typeof (response) === 'object') {
              resolve(true);
            }
          }
        );
      });
    });
  }

  decodeXLSXAndFormatToJson(file: File) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      return fileReader.onload = (event) => {
        let fileContent = event.target?.result;
  
        const data = XLSX.read(fileContent, { type: 'binary' });
        const sheetName = data.SheetNames[0];
        const json = XLSX.utils.sheet_to_json(data.Sheets[sheetName], { header: ["name", "state", "city", "startYear", "endYear", "founders", "members", "style", "presentation"], defval: null, range: 1 });
        resolve(JSON.stringify(json));
      }
    });
  }
}
