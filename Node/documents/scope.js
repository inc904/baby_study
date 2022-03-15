var a = 'out'
function out(){
    var c = 'ccc'
    function test(){
        var b = 'inner'
        console.log(a)
        console.log(c)
    }
    test()
    // console.log(b)
}
out()