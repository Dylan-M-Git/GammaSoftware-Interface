import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<any> {
    let jsonFormatted = this.decodeXLSXAndFormatToJson(file);

    return this.httpClient.post("http://127.0.0.1:8000/groups", jsonFormatted);
  }

  decodeXLSXAndFormatToJson(file: File) {
    // if (file) {
    //   let fileReader = new FileReader();
    //   fileReader.readAsBinaryString(file);
    //   fileReader.onload = (event) => {
    //     let data = event.target?.result;
    //     let workbook = XLSX.read(data, { type: "binary" });

    //     workbook.SheetNames.forEach(sheet => {
    //       let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    //       rowObject.forEach((group: any) => {

    //         return this.httpClient.post("http://127.0.0.1:8000/group", jsonFormatted);
    //       })
    //     });
    //   }
    // } else {

    // }

    return [
      {
        "name": "Name post",
        "state": "State post",
        "city": "City post",
        "startYear": 1997,
        "presentation": "PRésentation post"
      },
      {
        "name": "Name post",
        "state": "State post",
        "city": "City post",
        "startYear": 1997,
        "presentation": "PRésentation post"
      }
    ];
  }
}
