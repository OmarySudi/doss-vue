<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      app
    >
      <!--  -->
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
          </v-list-item-avatar>
        </v-list-item>
        <v-divider></v-divider>
        </v-list>

        <v-list nav>
          <v-list-item-group
            v-model="selectedItem"
            color="white"
          >
            <v-list-item
              v-for="(item, i) in roleItems"
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

    <v-app-bar 
      app 
      color="primary"
      height="90px"
    >
      <v-app-bar-nav-icon 
          @click="drawer = !drawer"
          color="white">
      </v-app-bar-nav-icon>

      <v-toolbar-title>Digitize Our Schools</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu 
        class="mt-1 "
        transition="slide-y-transition"
        offset-y
      >

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
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Home',

    data: () => ({
    
      drawer: null,

      selectedItem: 0,
      items: [
        
        { text: 'Profile', icon: 'mdi-finance', link:'/user', roles:["TEACHER","OFFICER"]},
        { text: 'Users', icon: 'mdi-account-multiple', link:'/users', roles:['ADMIN']},
        { text: 'Schools', icon: 'mdi-finance', link:'/schools', roles:["ADMIN","OFFICER"]},
        { text: 'Offences', icon: 'mdi-finance', link:'/offences', roles:["ADMIN"]},
        { text: 'Students', icon: 'mdi-finance', link:'/schools/S0101', roles:["TEACHER"]},
        { text: 'Reports', icon: 'mdi-finance', link:'/schools/report/S0101', roles:["TEACHER","OFFICER","ADMIN"]},
      ],
    
    }),

    computed: {
      ...mapGetters(['user']),

      roleItems(){
        return this.items.filter((item)=>item.roles.includes(this.user.user_type));
      }
    },

    methods: {
      ...mapActions(['logout'])
    },

    components: {
      
    },

    beforeRouteEnter (to, from, next) {
      
      // next(vm=>{

      //   //vm.$router.push('/users')

      //   to.path='/users'
      // });
       next({ path: '/users' }); 

    }
  }
</script>

<style scoped>

.v-toolbar__title{
  color: white;
}

.item-content{
  color:white
}

</style>
