import $ from 'jquery'

$(function(){
    $('ul li:even').css('background','yellow')
    $('ul li:odd').css('background','cyan')
})