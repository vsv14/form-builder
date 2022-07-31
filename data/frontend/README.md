### Frontend сайта: data (data-form-build)

Tools:
- @reduxjs/toolkit,
- json-rpc-2.0,
- react,
- react-dom,
- react-redux,
- react-router-dom,
- react-toastify,
- uuid-by-string,



В качестве сайта, используется приложение React с менеджером состаяний @Redux/toolkit и другими библиотеками.

## Приложение

Приложение состоит из несколько страниц:
- /builder - констуктор формы;
- /builder/:formUUID - представление созданной формы.

## builder
> path: [https://data-form-build.herokuapp.com/builder]

Страница разбита на отдельные компоненты, для упрощения:
- Sidebar - компонент, контейнер доступных полей для размещения на форме;
- FormConstructor - компонент, контейнер формы, управление формой (сброс и сохранение) и представление формы в формате JSON.


## /builder/:formUUID
> path: [https://data-form-build.herokuapp.com/builder/:formUUID]


Страница выводит сохраненную форму.


Сохранение и получение формы при помощи отправки POST запроса по протоколу JSON RPC 2.0.

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


### JSONRPCController
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