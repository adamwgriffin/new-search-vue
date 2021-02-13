import Vue from 'vue'

export const ClickOutside = {
  
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = (event) => {
      const clickedInsideDOM = el.contains(event.target)

      if ( !clickedInsideDOM && el.style.display != 'none' ) {
        vnode.context[binding.expression]()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },

  unbind: (el) =>{
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}

Vue.directive('click-outside', ClickOutside)
