/*
This is a Vue plugin that provides a custom directive named 'visible'. 

The 'intersect' directive uses the Intersection Observer API to detect when an element becomes visible in the viewport. 

The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Here's a breakdown of how it works:

1. The 'install' function is a required method for Vue plugins. Vue calls this method when the plugin is added via Vue.use().

2. Inside the 'install' function, we register a new directive named 'intersect' using the 'app.directive' method.

3. The 'intersect' directive has two lifecycle hooks: 'beforeMount' and 'unmounted'.

4. 'beforeMount' is called before the element is added to the DOM. Inside this hook, we create a new Intersection Observer and start observing the element.

5. The Intersection Observer takes a callback function that is called whenever the visibility of the element changes. If the element is visible (i.e., it intersects with the root), we call the function that was passed to the 'v-intersect' directive.

6. 'unmounted' is called when the element is removed from the DOM. Inside this hook, we stop observing the element to clean up and avoid memory leaks.
*/

export default {
  install(app) {
    app.directive("visible", {
      beforeMount(el, binding) {
        el.intersectionObserver = new IntersectionObserver(
          (entries) => {
            // If the element is visible, call the function
            if (
              entries[0].isIntersecting &&
              typeof binding.value === "function"
            ) {
              binding.value();
            }
          },
          {
            threshold: 0.5, // callback will run when 50% of the element is visible
          }
        );

        // Start observing the element
        el.intersectionObserver.observe(el);

        // Manually check if the element is visible when the page loads
        const entry = el.intersectionObserver.takeRecords()[0];
        if (entry.isIntersecting && typeof binding.value === "function") {
          binding.value();
        }
      },
      unmounted(el) {
        el.intersectionObserver.disconnect();
      },
    });
  },
};
