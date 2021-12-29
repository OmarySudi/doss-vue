<template>
  <v-app>
    <div v-if="authenticated">
      <v-card>
        <v-navigation-drawer
          v-model="drawer"
          app
          color="primary"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
              </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
           </v-list>

            <v-list
              nav
            >
              <v-list-item-group
                v-model="selectedItem"
                color="white"
              >
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.link"
                  exact
                >
                  <v-list-item-icon>
                    <v-icon color="white" v-text="item.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content class="item-content">
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
      </v-card>
      
      <v-app-bar app color="secondary">
        <v-app-bar-nav-icon 
          @click="drawer = !drawer"
          color="white">
        </v-app-bar-nav-icon>

        <v-toolbar-title>Petty Cash</v-toolbar-title>

        <v-spacer></v-spacer>
            <v-menu 
                  class="mt-1 "
                  transition="slide-y-transition"
                  offset-y>

                  <template v-slot:activator=" { on, dropdown } "  >
                    <v-btn icon class="mr-1 " v-bind="dropdown" v-on="on">
                      <v-icon size="30" color="white">mdi-menu-down</v-icon>
                    </v-btn>                         
                  </template>

                  <v-card>
                    <v-list >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="subheading-1" >{{user.email}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                      
                    <div >
                      <v-btn 
                        color="white" 
                        elevation="flat" 
                        class=""
                        large
                        block 
                        @click.prevent="logout()">
                          <p  class="my-auto body-1 font-weight-regular text--text text-capitalize">
                          Logout
                          </p>
                      </v-btn>
                    </div> 
                  </v-card>
              </v-menu>
        </v-app-bar>
      </div>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { SidebarMenu } from 'vue-sidebar-menu'
import { create } from 'filepond';

export default {
  name: 'App',
    components: {
    SidebarMenu
  },

  data: () => ({
    
    drawer: null,

    selectedItem: 0,
    items: [
      { text: 'Staffs', icon: 'mdi-account-multiple', link:'/staffs'},
      { text: 'Expenditures', icon: 'mdi-finance', link:'/expenditures'},
    ],
  
  }),

  computed: {
    ...mapGetters(['authenticated','user'])
  },

  methods: {
    ...mapActions(['logout'])
  },

  create(){
    console.log("authenticated is "+this.authenticated)
  }

};

</script>

<style>

.signing-card{
    border: 1px solid #ffffff !important;  
}

.inputtext {
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-text-field__slot input{
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-icon{
  color: #136772 !important;
  margin-top: 3px;
}

.inputtext .v-label{
  color: #136772 !important;
  margin-left:0px ;
  margin-top: 3px;
}

.inputtext :hover {
   border-color: #136772 !important;
}

.v-toolbar__title {
  color: white;
}

.item-content{
  color:white;
}


</style>
