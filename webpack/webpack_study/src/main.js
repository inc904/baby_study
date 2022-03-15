import $ from 'jquery'
import './css/style.css'
import './css/padding.less'
import './css/margin.scss'
import Vue from '../node_modules/vue/dist/vue.js'
import 'bootstrap/dist/css/bootstrap.css'
$(function(){
	$('li:odd').css('backgroundColor', 'cyan')

	$('li:even').css('backgroundColor', '#ccc')
})
class Person{
	static info = { name: 'zs', age: 14 }
}
console.log(Person.info)
var vm = new Vue({
	el: '#app',
	data: {
		msg: 123
	}
})