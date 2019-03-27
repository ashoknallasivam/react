import stringUtil from 'stringUtil';
import { Promise } from "es6-promise";
import config from 'configuration';
class BaseServiceApi {

    getBaseURL() {
        let baseUrl;
        console.log(process.env.NODE_ENV);
        switch (process.env.NODE_ENV) {
            case "dev":
                baseUrl = config.devEnv.baseUrl;
                break;
            case "production":
                baseUrl = config.prodEnv.baseUrl;
                break;
            case "testing":
                baseUrl = config.testEnv.baseUrl;
                break;
        }
        return baseUrl;
    }

    getRequestURL(request) {

        let protocol = "http";
        const app_name = "reactReduxProjectSetup";
        let servername = this.getServerName();
        const uri = request.uri;
        const parameterstring = request.getParameterString();

        if (parameterstring)
            return stringUtil.format("{0}://{1}/{2}/{3}?{4}", [protocol, servername, app_name, uri, parameterstring]);
        else
            return StringUtil.format("{0}://{1}/{2}/{3}", [protocol, servername, app_name, uri]);
    }

    getServerName() {
        let serverName;
        if (process.env.BRANCH_ENV) {
            let env = process.env.BRANCH_ENV;
            switch (env && env.toUpperCase()) {
                case "DEV":
                    serverName = "";
                    break;
                case "TEST":
                    serverName = "";
                    break;
                case "PROD":
                    serverName = "";
                    break;
            }
        }
        return serverName == null ? serverName = "" : serverName;
    }

    processServiceCall(request) {
        return new Promise((resolve, reject) => {
            //const url = this.getBaseURL();
            const url = request.url
            console.log(url);
            const method = request.method;
            const payload = request.payload;
            const async = true;

            const xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.withCredentials = false;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = function () {
                if (xhr.readyState == 4 && xhr.status == "200") {
                    var response = JSON.parse(xhr.response);
                    resolve(response);
                } else {
                    if (this.status == 401) {
                        var response = xhr.response;
                        if (response.responseHeader) {
                            //log respective message
                        }
                    }
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function (err,res) {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
                if (this.status == 0) {
                    //"Network connection is not available."
                }

                else {
                    console.log(xhr.statusText);
                }
            };

            if (!payload) {
                xhr.send();
            }
            else {
                xhr.send(JSON.stringify(payload));
            }
        });
    }
}

const baseServiceApi = new BaseServiceApi();
export default baseServiceApi;
