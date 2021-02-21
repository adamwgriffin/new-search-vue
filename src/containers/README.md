# Containers

The name "container" refers to the convention in Redux to separate regular components that only get their data via props
from "container" components that are connected to the store, in this case via Vuex. The goal in this project is for most
of the components to be standalone (not connected to the store) so that they can be re-used in other places very easily
without having to rely on a particular Vuex store for their data. So, there will be a minimal amount of container
components that allow us to make use of the advantages of Vuex without becoming too invested in it for everything in the
project.
