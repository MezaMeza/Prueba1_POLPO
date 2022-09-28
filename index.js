let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let users = [{"id": 1, "fname": "Antonio","lname" : "Peña", "email": "antonio@example.com"},
            {"id": 2, "fname": "Antonio 2","lname" : "Peña", "email": "antonio@example.com"}];

let todos = [{"id": 1, "title": "Universidad", "keywords": ["estudios", "importante", "academia"],"userId": 1}, 
            {"id": 2, "title": "Casa", "keywords": ["oficio", "necesario", "orden"], "userId": 1} ];

let task = [{"id": 1, "title": "Estudiar para el examen de programación", "completed": 0, "todoId": 1, "userId": 1}, 
            {"id": 2, "title": "Ir a clases", "completed": 1, "todoId": 1, "userId": 1}];



app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/', (req, res) => {    
    
//     res.json(users);
// })

app.get('/users', (req, res) => {    
    res.json(users);
})

app.get('/users/:id/todos', (req, res) => {    
    let todo = [];
    let id = req.params.id;
    todos.forEach(item => {
        if (item.userId == id){
            todo.push(item);
        }
    });

    res.json(todo);
})

app.get('/users/todos/:id', (req, res) => {    
    let todo = [];
    let id = req.params.id;
    todos.forEach(item => {
        if (item.id == id){
            item.todo = task.filter( t => t.todoId == id);
            todo.push(item);
        }
    });

    res.json(todo);
})

app.get('/users/:id', (req, res) => {    
    id = req.params.id;
    let user;
    users.forEach(element => {
        if (element.id == id)
        {
            user = element;
        }
    });
    
    if (user){
        res.json(user)  
    }else{
        res.json({message: "User Not Found"})
    }
    
})


app.post('/users', (req, res) => {    
    let body = req.body;
    let id = users.length + 1;
    let user;

    if(body){
       user = {"id": id,"fname":body.fname, "lname" : body.lname ,"email" : body.email, "todo":[]}
        users.push(user);
    }

    res.json(user);
})

app.post('/todos/:id/task', (req, res) => {    
    let body = req.body;
    let id = req.params.id;
    let id_t = task.length + 1;
    let tk;

    if(body){
        tk = {"id": id_t,"title":body.title, "completed" : body.completed, "todoId" : id, "userId": id };
        console.log(tk);
        task.push(tk);
    }

    res.json(tk);
})

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });

