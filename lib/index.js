// constructor receives the routes
// when an object is instantiated, app will have the event listeners
// ES5 this issue must bind this. ES6 no need.
function Router (routes) {
  // save this reference so we can use it later if needed
  // creating a property "routes" of instantiated object
  // we can use this.routes in prototype
  this.mySecretroutes = routes

  window.addEventListener('popstate', function (event) {
    console.log(event)
    this.route()
  }.bind(this)) // bind this to function

  document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      if (event.target.href.startsWith(window.location.origin)) {
        event.preventDefault()
        console.log(event)
        history.pushState(null, '', event.target.attributes.href.value)
        // the method only exists on the object created
        this.route()
      }
    }
  }.bind(this)) // bind this to function

  this.route() // invoke route to check all routes against current url
}

Router.prototype.route = function () {
  // this.routes !!!
  // accessing here !!! (:
  console.log(this.mySecretroutes)
  Array.from(document.querySelectorAll('section'))
    .forEach(function (section) {
      section.style.display = 'none'
    })
  Object.keys(this.routes).forEach(function (key) {
    // console.log(this.routes.[key]) // you will get /about, /shop, /
    if (key === window.location.pathname) {
      var handler = this.routes[key]
      document.title = handler.title
      document.querySelector(handler.element)
        .style.display = 'block'
    }
  })

  // switch (window.location.pathname) {
  //   case '/about':
  //     document.title = 'About Us'
  //     document.querySelector('#about')
  //       .style.display = 'block'
  //     break
  //   case '/shop':
  //     document.title = 'SG50 Shop'
  //     document.querySelector('#products')
  //       .style.display = 'block'
  //     break
  //   case '/':
  //     document.title = 'Homepage'
  //     document.querySelector('#landing')
  //       .style.display = 'block'
  //     break
  //   default:
  //     document.querySelector('#error404').style.display = 'block'
  // }
}

// ES6 Way
// class Router (){
//   constructor (routes) {
//     window.addEventListener('popstate', function (event) {
//       console.log(event)
//       route()
//     })
//
//     document.addEventListener('click', function (event) {
//       if (event.target.tagName === 'A') {
//         if (event.target.href.startsWith(window.location.origin)) {
//           event.preventDefault()
//           console.log(event)
//           history.pushState(null, '', event.target.attributes.href.value)
//           route()
//         }
//       }
//     })
//   }
// }
// PROTOTYPE
// route () {
//   Array.from(document.querySelectorAll('section'))
//     .forEach(function (section) {
//       section.style.display = 'none'
//     })
//
//   switch (window.location.pathname) {
//     case '/about':
//       document.title = 'About Us'
//       document.querySelector('#about')
//         .style.display = 'block'
//       break
//     case '/shop':
//       document.title = 'SG50 Shop'
//       document.querySelector('#products')
//         .style.display = 'block'
//       break
//     case '/':
//       document.title = 'Homepage'
//       document.querySelector('#landing')
//         .style.display = 'block'
//       break
//     default:
//       document.querySelector('#error404').style.display = 'block'
//   }
// }

// Array.from(document.querySelectorAll('nav a'))
//   .forEach(function (anchor) {
//     anchor.addEventListener('click', function (event) {
//       event.preventDefault()
//       // console.dir(anchor)
//       history.pushState(null, '', anchor.attributes.href.value)
//       Array.from(document.querySelectorAll('section'))
//         .forEach(function (section) {
//           section.style.display = 'none'
//         })
//       switch (anchor.attributes.href.value) {
//         case '/about':
//           document.title = 'About Us'
//           document.querySelector('#about')
//             .style.display = 'block'
//           break;
//         case '/shop':
//           document.title = 'SG50 Shop'
//           document.querySelector('#products')
//             .style.display = 'block'
//           break;
//         case '/':
//           document.title = 'Homepage'
//           document.querySelector('#landing')
//             .style.display = 'block'
//           break;
//       }
//     })
//   })

module.exports = Router
