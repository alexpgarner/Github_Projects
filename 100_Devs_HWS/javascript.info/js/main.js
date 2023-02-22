// // Come up with with a parent class
// // Extend that parent class into two children
// // Use Encapsulation, Abstraction, Inheritance, and Polymorphism 
// class Contractor{
//     constructor(name,role){
//         this._name = name;
//         this._role = role;
//     }

//     get name(){
//         return this._name;
//     }

//     get role(){
//         return this._role;
//     }

//     whoAmI(){
//         console.log(`Hello, my name is ${this._name} and my role is ${this._role}`)
//     }
// }

// class FrontEnd extends Contractor{
//     constructor(name,role,tech){
//         super(name,role);
//         this._tech = tech;
//     }

//     get tech(){
//         return this._tech;
//     }
//     whoAmI(){
//         console.log(`Hello, my name is ${this._name} and my role is ${this._role}. I bring ${this._tech} skills to the team`)
//     }

// }

// class BackEnd extends Contractor{
//     constructor(name,role,tech){
//         super(name,role);
//         this._tech = tech;
//     }
//     get tech(){
//         return this._tech;
//     }
//     whoAmI(){
//         console.log(`Hello, my name is ${this._name} and my role is ${this._role}. I bring ${this._tech} skills to the team`)
//     }
// }





// // class Contractor{
// //     constructor(name,role){
// //         this._name = name
// //         this._role = role
// //     }
// //     get name(){
// //         return this._name
// //     }
// //     get role(){
// //         return this._role
// //     }
// //     sayHello(){
// //         console.log(`Hello, I am on the ${this._role} team at #100Devs!`)
// //     }
// // }
// // class Front extends Contractor{
// //     constructor(name,role,tech){
// //         super(name,role)
// //         this._tech = tech
// //     }
// //     get tech(){
// //         return this._tech
// //     }
// //     sayHello(){
// //         console.log(`Hello, I am on the ${this._role} team at #100Devs and I use ${this._tech}`)
// //     }
// // }
// // class Back extends Contractor{
// //     constructor(name,role,tech){
// //         super(name,role)
// //         this._tech = tech
// //     }
// //     get tech(){
// //         return this._tech
// //     }
// //     sayHello(){
// //         console.log(`Hello, I am on the ${this._role} team at #100Devs and I use ${this._tech}`)
// //     }
// // }
// let bob = new Contractor('Bob','Front-end')
// let simba = new FrontEnd('Simba','Front-end','React')
// let machi = new BackEnd('The Machine','Back-end','Node')

// let agency = [bob,simba,machi]

// for(person of agency){
//     person.whoAmI()
// }
// function delay(ms){
//     console.log("hello")
//     return new Promise(function(resolve){
//         let current= Date.now();
//         let timeOut = Date.now() - current;
//         while(timeOut<=ms){
//             console.log(timeOut)
//             timeOut = Date.now() - current;
//         }
//         resolve(`runs after ${ms/1000} seconds`);
//     });
// }

// delay(3000).then(() => alert('runs after 3 seconds'));
// function showCircle(cx, cy, radius){
//     let circle = document.querySelector('div.circle')
//     circle.style.width = `${radius*2}px`
//     circle.style.height = `${radius*2}px`
//     circle.style.top = `${cy}px`
//     circle.style.left = `${cx}px`
// }

// //showCircle(150,150,100)

// function showCircle(cx, cy, radius,callback){
//     let circle = document.querySelector('div.circle')
//     circle.style.width = `${radius*2}px`
//     circle.style.height = `${radius*2}px`
//     circle.style.top = `${cy}px`
//     circle.style.left = `${cx}px`
//     circle.addEventListener('transitionend',function handler(){
//         circle.removeEventListener('transitionend',handler);
//         circle.style["line-height"] = `${2*radius}px`
//         callback(circle);
//     })
    
// }

// showCircle(300, 300, 300, div => {
//     div.classList.add('message-ball');
//     div.textContent = "Hello, world!";
//   });

// function showCircle(cx, cy, radius){
//     return new Promise(function(resolve){
//         let circle = document.querySelector('div.circle')
//         circle.style.width = `${radius*2}px`
//         circle.style.height = `${radius*2}px`
//         circle.style.top = `${cy}px`
//         circle.style.left = `${cx}px`
//         circle.style["line-height"] = `${2*radius}px`
//         circle.addEventListener('transitionend',function handler(){
//             resolve(circle);
//             circle.removeEventListener('transistionend',handler);
//         })
//     });    
// }
// //showCircle now returns a Promise object that resolves with div.circle element that .then adds .message-ball class and text Hello World
// showCircle(150, 150, 100).then(div => {
//     div.classList.add('message-ball');
//     div.append("Hello, world!");
//   });

//Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:
// function loadJson(url) {
//     return fetch(url)
//       .then(response => {
//         if (response.status == 200) {
//           return response.json();
//         } else {
//           throw new Error(response.status);
//         }
//       });
//   }
  
//   loadJson('https://javascript.info/no-such-user.json')
//     .catch(alert); // Error: 404

// async function loadJson(url){
//     try{
//         let response = await fetch(url);
        
//         if(response.status == 200){
//             return response.json();
//         }else{
//             throw new Error(response.status)
//         }
//     }catch(err){
//         console.log(err)
//     }
// }

// async function loadJson(url){
    
//     let response = await fetch(url);
    
//     if(response.status == 200){
//         return response.json();
//     }else{
//         throw new Error(response.status)
//     }
// }

// try{
//     console.log(loadJson('https://javascript.info/no-such-user.json'));
// }catch(err){
//     console.log(err)
// }
// Rewrite "rethrow" with async/await
// Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.

// And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.

class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
async function loadJson(url) {
    let response = await fetch(url)
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  
  // Ask for a user name until github returns a valid user
  async function demoGithubUser() {
    let user // this needs to be initialized outside of while loop 
    while(true){
      let name = prompt("Enter a name?", "iliakan");
      try{
        user = await loadJson(`https://api.github.com/users/${name}`)
        //if no error and user loads then break loop
        break;
      
      }catch(err){
        if (err instanceof HttpError && err.response.status == 404) {
          alert("No such user, please reenter.");
          //loop will now continue to ask for valid name
        } else {
          throw err;//throw unknown error if occurs
        }
      }
    }
    alert(`Full name: ${user.name}.`);
    return user;
  }
  
  demoGithubUser()