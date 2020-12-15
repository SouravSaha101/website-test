class Config {
  unAuthorisedUrl: string;
  rowPerPage: number[] =[];

  constructor() {
    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "config.json",
      false
    );
    request.send(null);
    let jsonObject = JSON.parse(request.responseText);
    this.unAuthorisedUrl = jsonObject.unAuthorisedUrl;
    this.rowPerPage = jsonObject.rowPerPage;
  }
}

export default new Config();
