### Frontend сайта: site (site-forms)

Tools:
- @reduxjs/toolkit,
- json-rpc-2.0,
- react,
- react-dom,
- react-redux,
- react-router-dom,
- react-toastify,
- uuid-by-string,


## Приложение

Приложение состоит из несколько страниц:
- /search - поиск готовых форм и ответов на них;
- /form/:formUUID - готовая форма для заполнения;
- /form/:formUUID/:userUUID - заполненная форма пользователем.

## /search
> path: [https://site-forms.herokuapp.com/search]

Главная страница отображает форму поиска: сохраненных форм и ответов на них.

- поиск формы проводится по ее наименованию с учетом регистра;
- поиск ответа на форму указывается номер телефона, который пользователь указал при отправке заполненной формы.


## /form/:formUUID
> path: [https://site-forms.herokuapp.com/form/:formUUID]

Страница выводит сохраненную форму.

## /form/:formUUID/:userUUID
> path: [https://site-forms.herokuapp.com/form/:formUUID/:userUUID]

Получение заполненной формы пользователем, при помощи отправки POST запроса по протоколу JSON RPC 2.0.

### jsonRPC
## JSONRPCClient
Класс библиотеки json-rpc-2.0, позволяет отправлять запросы к API по протоколу jsonRPC.

```
const jsonRPCClient = new JSONRPCClient((jsonRPCRequest) =>{
        return fetch(jsonRPCURL, {
            method: "POST",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(jsonRPCRequest),
        }).then((response) => {
            if (response.status === 200) {
                return response
                    .json()
                    .then((jsonRPCResponse) => jsonRPCClient.receive(jsonRPCResponse));
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText));
            }
        });
    });
```

### JSONRPCMethods
Объек, поля которого являются методами, поступные по API.


### JSONRPCController (Переиспользованный класс)
Класс, реализующий вызов мотодов. Параметром в конструктор принимает объект класса JSONRPCClient.

```
class JSONRPCController {
    #jsonRPCClient;

    constructor(jsonRPCClient){
        this.#jsonRPCClient = jsonRPCClient;
    
    }

    async callMethod(jsonRPCMethod, dto){
        return await this.#jsonRPCClient.request(jsonRPCMethod, JSON.stringify(dto))
        .then((result) => {
            return result
        });
    }

    saveFormSchema(dto){
        return this.callMethod(JSONRPCMethods.saveFormSchema, dto);
    }

    getFormSchema(dto){
        return this.callMethod(JSONRPCMethods.getFormSchema, dto);
    }

    saveFormAwnser(dto){
        return this.callMethod(JSONRPCMethods.saveFormAwnser, dto);
    }

    getFormAwnser(dto){
        return this.callMethod(JSONRPCMethods.getFormAwnser, dto);
    }
}
```