# topfloattest
Проект создан для генерации html формы с возможностью отправки на сервер в json-формате, включает в себя две директивы:

**testForm** - генерирует разметку <form></form>
**generalTestDirective** - с параметром psDirectiveType равным:
* **testInput** - генерирует поле/поля для ввода текста
* **testNumber** - генерирует поле для ввода цифр
* **testCheckbox** - генерирует поля checkbox
* **testSelect** - генерирует поле с выпадающим списком

## Установка
* Скачать zip-папку с проектом
* Скачать репозиторий https://github.com/pichuser/topfloattest.git

## Запуск демо
Проект запускается командой "npm start", либо командой gulp

## Пример кода
```html
<div test-form ps-action="/testform" ps-init-data="{{parent.data}}" ps-form-name="Анкета">  
    <div general-test-directive ps-directive-type="testInput"
        ps-label="name"
        ps-validation="[{required: true, message: 'Поле обязательно для заполнения'}]"
        ps-display-name="Имя"
        required="true">
    </div>
    <div general-test-directive ps-directive-type="testInput"
        ps-label="vuz"
        ps-many-values="true"
        ps-placeholder="Например, ВолгГАСУ"
        ps-description="Укажите учебные заведения, в которых вы учились."
        ps-display-name="Вуз"
        required="true">
    </div>
    <div general-test-directive
        ps-directive-type="testNumber"
        ps-label="age"
		ps-description="Ваш возраст"
        ps-display-name="Возраст">
    </div>
    <div general-test-directive ps-directive-type="testCheckbox"
        ps-label="knowledge"
        ps-description="Отметьте ваши навыки"
        ps-display-name="Навыки"
        ps-choices="choices"
        ps-column-size="6">
    </div>
    <div general-test-directive ps-directive-type="testSelect"
        ps-label="family"
        ps-display-name="Семейное положение"
        ps-choices="familyState"
        required="true">
    </div>
	<div general-test-directive ps-directive-type="testSelect"
        ps-label="city"
        ps-display-name="Место рождения"
        ps-choices="cities"
		ps-empty-value="Не важно">
    </div>
</div>
```
_**Аттрибуты директивы generalTestDirective:**_
* **ps-action** - обязательный аттрибут директивы testForm: адрес страницы, на которую будет отправлен json через post-запрос;
* **ps-label** - обязательный аттрибут директив testInput, testNumber, testCheckbox. Название поля объекта, которое будет содержать введенные пользователем данные;
* **ps-display-name** - отображаемое пользователю название поля для ввода данных;
* **required** - если поле обязательно должно содержать данные;
* **ps-choices** - массив объектов формата {description: 'descrip'} - перечень отображаемых checkbox'ов;
* **ps-description** - описание поля;
* **ps-column-size** - сколько checkbox'ов отображается в одной колонке;
* **ps-directive-type** - тип поля, значения 'testInput', 'testCheckbox', 'testSelect', 'testNumber';

## Исходные коды
Исходные коды директив располагаются по адресу app/directives. 

## Как подключить директивы на страницу
После запуска команды gulp генерируются файлы app/styles/bundle.css, app/src/all.js, app/src/templates.js. Для использования директив необходимо подключить на страницу эти 3 файла. Также требуется подключение angularJs и _lodash.
