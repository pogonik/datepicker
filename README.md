# React Datepicker

experimenting with Date object, react hooks, bulma ...

```javascript
<DatePicker
    language="en-US" // from JS's Date locale
    firstDayOfWeek={0} // 0 = Sunday, 1 = Monday, ...
    id="picker-id" // dom element id
    type="vertical" // 'vertical' or 'horizontal'
    selected={new Date()} // selected date object
    initMonth={new Date(2019, 2)} // initial month to show
    onDateSelect={this.handleDateSelect} /> // function on date select
```
