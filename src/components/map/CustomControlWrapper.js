import Vue from 'vue'
import i18n from '@/plugins/i18n'
import { googleMap } from '@/lib/google'

export default {
  props: {
    position: {
      required: true,
      type: String
    }
  },

  mounted() {
    // const controlUI = document.createElement("div");
    // controlUI.id = "doing-yr-mom"
    // controlUI.style.backgroundColor = "#fff";
    // controlUI.innerHTML = "Doin' yr mom"
    // controlUI.style.padding = "8px";
    // googleMap.controls[google.maps.ControlPosition.TOP_CENTER].push(controlUI);
    
    
    // create a Vue component programatically from what was passed inside this components default slot. we're doing
    // this so that it can be passed to googleMap.controls for layout on the map. the maps api will take care of adding
    // it to the DOM.
    const slotDefaultVNodes = this.$scopedSlots.default()
    const ComponentClass = Vue.extend({
      // we have to pass i18n manually because this component is separate from the others and doesn't get the $t()
      // function automatically. it's likely that any further plugins added with Vue.use would need the same treatment.
      i18n,
      // without including a render function we get the following error from Vue: "Failed to mount component: template
      // or render function not defined." when we call this.componentInstance.$mount() below
      render() {
        console.log("render() function called inside of ComponentClass, returning slotDefaultVNodes:", slotDefaultVNodes)
        // unless we return something here google maps will throw the error: "Cannot read properties of undefined
        // (reading 'zIndex') because it's trying to mount a dom node that doesn't exist"
        return slotDefaultVNodes
      }
    })
    this.componentInstance = new ComponentClass()
    this.componentInstance.$mount()
    googleMap.controls[google.maps.ControlPosition[this.position]].push(this.componentInstance.$el)
  },

  destroyed() {
    this.componentInstance.$destroy()
    googleMap.controls[google.maps.ControlPosition[this.position]].clear()
  },

  render() {
    // I'm really unclear on why this works but unless I pass the slot content to this component's render function the
    // component within the slot will not be reactive. passing it here doesn't seem to actually render it twice, in
    // spite of the fact that I am also passing this.$scopedSlots.default({}) to the render function of the class I
    // created in ComponentClass in the mounted hook
    console.log("render() function called inside of CustomControlWrapper component, returning this.$scopedSlots.default():", this.$scopedSlots.default())
    return this.$scopedSlots.default()
  }
}
