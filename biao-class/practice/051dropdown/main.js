
let list = [
    {
        id:1,
        username:'中村',
    },
    {
        id:2,
        username:'佐藤',
    },
    {
        id:3,
        username:'田中',
    }
]


myDropdown.boot('main',list,{
    display:'username',
    onSelect(it){
        console.log(it);
    }

});
