import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from "element-ui";
import {Input} from "element-ui";
import {Message} from "element-ui";
import {Container,Header,Aside,Main,Menu,MenuItem,MenuItemGroup} from "element-ui";
import {DatePicker,TimePicker} from "element-ui";
import {Row,Col} from "element-ui";
import {Table,TableColumn} from "element-ui";
import {Upload} from "element-ui";
import {Select,Option} from "element-ui";
import {MessageBox,Alert} from "element-ui";
import {Drawer} from "element-ui";
import {Popover} from "element-ui";

Vue.use(Button);
Vue.use(Form);Vue.use(FormItem);Vue.use(Input);
Vue.use(Container);Vue.use(Header);Vue.use(Main);Vue.use(Aside);
Vue.use(Menu);Vue.use(MenuItem);Vue.use(MenuItemGroup);
Vue.use(DatePicker);Vue.use(TimePicker);
Vue.use(Row);Vue.use(Col);
Vue.use(Table);Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Option);Vue.use(Select);
Vue.use(Alert);Vue.prototype.$confirm=MessageBox.confirm;
Vue.use(Drawer);
Vue.use(Popover);
Vue.prototype.$message=Message;
