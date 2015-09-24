# topfloattest
Проект создан для генерации html формы с возможностью отправки на сервер в json-формате, включает в себя четыре директивы:
* **testForm** - генерирует разметку <form></form
* **testInput** - генерирует текстовое поле
* **testNumber** - генерирует поле для ввода цифр
* **testCheckbox** - генерирует поля checkbox

## Установка
* Скачать zip-папку с проектом
* Скачать репозиторий https://github.com/pichuser/topfloattest.git

## Запуск демо
Демонстрационная страница запускается командой gulp из директории проекта. Далее необходимо проследовать по адресу [http://localhost:3000](http://localhost:3000)

## Пример кода
```html
<div test-form ps-action="/testform" ps-init-data="{{parent.data}}" ps-form-name="Анкета">
    <div test-input
        ps-label="name"
        ps-validation="[{required: true, message: 'Необходимо ввести поле}]"
        ps-display-name="Имя"
        required="true">
    </div>
    <div test-input ps-label="surname"
        ps-display-name="Фамилия">
    </div>
    <div test-number ps-label="age"
        ps-display-name="Возраст">
    </div>
    <div test-checkbox ps-label="knowledge"
        ps-display-name="Навыки"
        ps-choices="choices"
        ps-column-size="6">
    </div>
</div>
```
_**Аттрибуты директив:**_
* **ps-action** - обязательный аттрибут директивы testForm: адрес страницы, на которую будет отправлен json через post-запрос;
* **ps-label** - обязательный аттрибут директив testInput, testNumber, testCheckbox. Название поля объекта, которое будет содержать введенные пользователем данные;
* **ps-display-name** - отображаемое пользователю название поля для ввода данных;
* **required** - если поле обязательно должно содержать данные;
* **ps-choices** - массив объектов формата {description: 'descrip'} - перечень отображаемых checkbox'ов;
* **ps-column-size** - сколько checkbox'ов отображается в одной колонке;

## Исходные коды
Исходные коды директив располагаются по адресу app/directives. 

## Как подключить директивы на страницу
После запуска команды gulp генерируются файлы app/main.css, app/src/all.js, app/src/alldirectives.html содержащие соответственно css, js и html-разметку директив. Для использования директив необходимо подключить на страницу эти 3 файла. Также требуется подключение angularJs и _lodash.
