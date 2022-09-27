// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token']='OiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';  //14. aisa dikhta hai token, ye copy kiya h jwt.io se

// GET REQUEST
function getTodos() {
  axios({ 
    method: 'get',
    url:'https://jsonplaceholder.typicode.com/todos',  //1.issse hum server se data ko fetch kar rhe hain, axios fetch ka upgraded version hain and easy to understand.
    params:{ //3.ye to uper link ke piche _limit:5 ye likh do ya phir ya parameter daal do url ka.
      _limit:5
    },
    
  })
   //2. .then(res=>console.log(res)) //agar res.data likha hota to sirf data aata
    .then(res=>showOutput(res))
    .catch(err=>console.log(err))

    //4. hum aise bhi kar skte hain direct ho jayega.
    // axios.get('https://jsonplaceholder.typicode.com/todos?_limit:5',{timeout: 5}) //(?_limit:5 lagane se sirf 5 hi aayenge) aur timout 5 means m milisecond se pehle aana chahiye vrna error aa jayegi
    // .then(res=>showOutput(res))
    // .catch(err=>console.log(err))
}


// POST REQUEST
function addTodo() {
//   axios({
//     method: 'post',
//     url:'https://jsonplaceholder.typicode.com/todos',  
//     data:{  //5. agar naye daalne hain to, iska bhi shortcut hai.
//       title:'New todo',
//       completed: false
//     }
// })
//   .then(res=>showOutput(res))
//   .catch(err=>console.log(err))

  //6.hum aise bhi kar skte hain axios.post, mtlb post request karke
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title:'New todo',
    completed: false
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}
// PUT/PATCH REQUEST   7.put request mai completely change ho jata hai, patch request mai jo change kra hai bas vohi change hota hai baaki sab same rehta hai
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{   //8. jab kisi data ko change karna hia to uski id url ke piche se deni padhti hai /1 ye 1 id name hai, patch likha hai to userid bhi incluuded hogi jo phele se data mai thi , if we write only put to ye nhi aayega, only title, completed aur uski id aayegi.
    title:'updated todo',
    completed: true
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1') //9. ye delete kr dega /1 id ko kuch data pass ni krana, ye output m kblank show krega afterr click del button
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])  
  .then(axios.spread((todos,posts)=>showOutput(posts))) //10. spread mtlb jo axios se aa rha hai usko faila do idhar todos and posts mai
  .catch(err=>console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers: { //13. ye kuch information hai jo hiding from the user....to is post mai add ki hai , suppose agar bhot saare hain aur unke liye banana hai to see 14th point top pe.
      'content-type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios.post(
    'https://jsonplaceholder.typicode.com/todos',
    {
      title:'New Todo',
      completed: false
    },
    config
  )
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
  }
// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options={ //12. isme hum ek response bna rhe hain ek extra aur usko then transform karenge. uppercase mai
    method: 'post',  
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'hello woRld'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(res=>showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todosnuufyyggulk')
  .then(res=>showOutput(res))
  .catch(err=> {
    //15. server responded with a status other than 200 range
    if(err.response){
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);

    if(err.response.status === 404){
      alert('Error: Page Not Found');
    }
  }
  else if(err.request){
    //16.request was made but no response
    console.error(err.request);
  }
  else{
    console.log(err.message);
  }
})
}
// CANCEL TOKEN
function cancelToken() {
  const source= axios.CancelToken.source();

axios
.get('https://jsonplaceholder.typicode.com/todos',{cancelToken: source.token})
.then(res=>showOutput(res))
.catch(thrown=>{
  if(axios.isCancel(thrown)){
    console.log('request canceled', thrown.message)
  } 
})
if(true){
  source.cancel('request canceled');
}
}
// INTERCEPTING REQUESTS & RESPONSES

// 11. ye console mai log krega...jo jo hum click krte ja rhe hain. [Intercept: to stop or catch somebody/something that is moving from one place to another]
axios.interceptors.request.use(
  config=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)

    return config;
  }, error=>{ 
    return Promise.reject(error);
  }
)

// AXIOS INSTANCES
// 17. isme instant bna skte hain...
const axiosInstance=axios.create({
  bareURL:'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments').then(res=>showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
