t:flip `s1`s2!enlist each(([] label:`a`b`c`d; val: 4?100);([] label:`aa`bb; val: 2?100))
t 
x:([] s:`a`b`a`b;v1:1 2 3 4;v2:10 20 30 40)
x
key 
flip x

`key`values xcol x

select v1, v2 by s from x



[
    {
        key: "<Series name>",
        color: "<CSS color>",
        values: [
            {x: 0, y: 10},
            {x: 1, y: 20},
            {x: 2, y: 30}
            ....
        ]
    },
    {
        key: "<Series name>"
        ...
    }
]

s1: ([]x:til 3; y: 10*til 3)
s2: ([]x:2*til 3; y: 20*til 3)

.j.j enlist {`key`values!x,enlist value x} `tb

fmtjson: {`key`values!x,enlist value x}

//this works with node-q too (without .j.j)
.j.j fmtjson each `s1`s2
fmtjson each `s1`s2