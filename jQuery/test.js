
// 变量提升
    console.log(a)

    console.log(b)

    var b =11
    // var a = b = 10 
    var a = 1
    
    // function a(){
    // 	var b = 10
    // 	console.log('in b ',b)
    // }

    var a = function(){
    	console.log(123)
    }
    console.log('a', a)
    // console.log('b', b)
    a()

	var obj = {name:"zhang", age: 18, info: {company:'tx'}}
	