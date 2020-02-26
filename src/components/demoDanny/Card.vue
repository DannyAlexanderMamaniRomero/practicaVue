
<template>
      <v-layout color="white" xs12>
          <v-flex xs4>
             <v-card max-width="100%" class="mx-auto">
               <v-card-title>
                   <span class="headline my-4">REGISTRO DE NOTAS</span>
               </v-card-title>
                <v-card-text>
                    <v-form ref="form"  lazy-validation>
                      <v-text-field  required placeholder="Ingrese sus apellidos y nombres" v-model="form.nombre"></v-text-field>
                       <v-text-field  required placeholder="Ingrese su nota 1" v-model="form.nota1"></v-text-field>
                       <v-text-field  required placeholder="Ingrese su nota 2" v-model="form.nota2"></v-text-field>
                       <v-text-field required placeholder="Ingrese su nota 3" v-model="form.nota3"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                 <v-btn  color="success" class="mr-4" @click="agregarData">Agregar</v-btn>
                 <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <template>
            <!-- <span>CRUD</span> -->
            <v-dialog v-model="dialog" max-width="500px">

              <v-card>
                 <v-card-title>
                    <span class="headline">EDITA PE CAUSA</span>
                  </v-card-title>
                  <v-card-text>
                      <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.alumno" label="Nombre:"></v-text-field>
                        </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nota1" label="Nota1:"></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nota2" label="Nota2:"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nota3" label="Nota3:"></v-text-field>
                      </v-flex>
                      </v-layout>
                       </v-container>
                    </v-card-text>  
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <!-- <v-btn color="blue darken-1" flat @click="save">Save</v-btn> -->
                    </v-card-actions>
              </v-card>
            </v-dialog>
            <v-card>
            <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            </v-card-title>
        <v-data-table
                :headers="headers"
                :items="dataNotas"
                :items-per-page="5"
                :search="search"
                 class="elevation-1"
        >
      <template v-slot:items="props">
      <td>{{ props.item.alumno }}</td>
      <td>{{ props.item.nota1 }}</td>
      <td>{{ props.item.nota2 }}</td>
      <td>{{ props.item.nota3 }}</td>
       <td class="justify-center layout px-0">
         <v-btn color="cyan" fab small dark>
          <v-icon
            center
            small
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          </v-btn >
          <v-btn color="red" fab small dark>
          <v-icon
            small
            center
            @click="deleteData(props.item.id)"
          >
            delete
          </v-icon>
          </v-btn>
        </td>
    </template>
        </v-data-table>
            </v-card>
            </template>
          </v-flex>
      </v-layout> 
</template>
<script>  

//import {mapState} from 'vuex'

 export default {
    data () {
      return {
        dialog: 'false',
        search: '',
        form: {
           nombre:'',
           nota1:'',
           nota2:'',
           nota3:'',
        },
        headers: [
          {
            text: 'Alumno',
            align: 'left',
            sortable: false,
            value: 'alumno',
          },
          { text: 'Nota 1', value: 'nota1' },
          { text: 'Nota 2', value: 'nota2' },
          { text: 'Nota 3', value: 'nota3' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
        editedItem: {
        alumno: '',
        nota1: 0,
        nota2: 0,
        nota3: 0,
      },
        defaultItem: {
        alumno: '',
        nota1: 0,
        nota2: 0,
        nota3: 0,
       }
      }
    }, 
    async created(){
    },
    methods:{
    agregarData(){
         const obj = {
           'alumno':this.form.nombre,
           'nota1':this.form.nota1,
           'nota2':this.form.nota2,
           'nota3':this.form.nota3
         }
         if(!confirm("Estas seguro")){
            return false
         }else{
           this.$store.dispatch('demodanny/insert',obj);
           this.$refs.form.reset();
         }
     },
    deleteData(id){
        if(!confirm("Estas seguro de eliminar")){
          return false
        }else{
          this.$store.dispatch('demodanny/delete',id);
        }
     }
    },
    updateData(id){
        
    },
    editItem(item){
        this.editedIndex = this.dataNotas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
    },
    close(){
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
    },

    computed:{
      // ...mapState(['name'])
      dataNotas(){
        var arr = [];
        const obj = this.$store.state.demodanny.data
        Object.keys(obj).forEach(function(key){
            //console.log(this.$store.state.demodanny.data.id);
            arr.push(obj[key]);
        })
        console.log(arr);
        return arr;
        
      }
    },
    
    created () {
      this.initialize()
    },

    // async created(){
    //   console.log(this.$store.state.alumno.data);
    // },
    // async beforeMount(){
    //       await this.$store.dispatch('demodanny/closeDBChannel', {clearModule: true})
    //     .then(async ()=>{
    //         console.log("Close DB Channel")
    //         await this.$store.dispatch('demodanny/openDBChannel', {idAlumno: this.$store.state.alumno.data.id}).catch(console.error)
    //         console.log(this.$store.state.alumno.data);
    //         })
    //     .catch(console.error)
    // },

  }
</script>
