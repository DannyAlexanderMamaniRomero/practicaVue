<template>
  <div>
    <v-card flat>
        <v-card-title>
            <v-btn
            :loading="false"
            :disabled="false"
            color="success"
            class="white--text"
            @click="generateDataforXLS()"
            >
            Descargar XLSX
            <v-icon right dark>cloud_download</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
            
        </v-card-title>
        <v-data-table
        v-model="itemsSelected"
        :headers="headers"
        :items="dataAsistencias"
        :search="search"
        disable-initial-sort
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        select-all
        >
        <template slot="items" slot-scope="props">
            <td>
                <v-checkbox
                v-model="props.selected"
                primary
                hide-details
                ></v-checkbox>
            </td>
            <td>{{ props.item.usuario }}</td>
            <td class="text-xs-right">{{ props.item.contrasena }}</td>
            <td class="text-xs-right">{{ props.item.tipo }}</td>
            <td class="text-xs-right">{{ props.item.agrupado }}</td>
            <td class="justify-center layout px-0">
                
                <v-icon
                    small
                    @click="borrarItem(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Tu busqueda de "{{ search }}" no tuvo resultados.
        </v-alert>
        <template slot="no-data">
            <v-btn color="primary" >Reset</v-btn>
        </template>
        </v-data-table>
    </v-card>
  </div>
</template>

<script>

import XLSX from 'xlsx';

export default {
    data: () => ({
        itemsSelected:[],
        rowsPerPageItems: [5,10,15,30,50,100,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
        pagination: {
            rowsPerPage: 7,
        },
        search:'',
        dialog: false,
        headers: [
            {   
                text: 'Usuario',
                align: 'left',
                value: 'usuario'
            },
            { text: 'Contraseña', value: 'contrasena' },
            { text: 'Tipo', value: 'tipo' },
            { text: 'Agrupado', value: 'agrupado' },
            { text: 'Opciones' },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        }
    }),

    methods: {
        generateDataforXLS(){

            const cantdatos = this.pagination.rowsPerPage
            var data = []
            if(cantdatos !== -1 && cantdatos<=this.dataAsistencias.length)
            {
                data = this.dataAsistencias.slice(0, cantdatos)

            }
            else
            {
                data = this.dataAsistencias
            }
            

            var ndata = data.map((obj)=> {
                var nobj = {}
                nobj.usuario = obj.usuario
                nobj.contrasena = obj.contrasena
                nobj.tipo = obj.tipo
                nobj.agrupado = obj.agrupado

                return nobj
                nobj.inicio = {}
                nobj.inicio.v = obj.inicio.toDate().toISOString()
                nobj.inicio.t = 'd'
                nobj.inicio.z = "hh:mm:ss"
                
                nobj.salida = {}
                if(obj.salida == 0) 
                {nobj.salida.v = 0}
                else{
                    nobj.salida.v = obj.salida.toDate().toISOString()
                    nobj.salida.t = 'd'
                    nobj.salida.z = "hh:mm:ss"
                }
                nobj.inicioreceso = ""

                obj.inicioreceso.forEach((receso)=>{
                    nobj.inicioreceso += receso.toDate().toISOString().substr(11, 8) + " - "
                })
                nobj.inicioreceso = nobj.inicioreceso.slice(0, -2);    

                nobj.finreceso = ""
                obj.finreceso.forEach((receso)=>{
                    nobj.finreceso += receso.toDate().toISOString().substr(11, 8) + " - "

                })
                nobj.finreceso = nobj.finreceso.slice(0, -2);


                nobj.totalrecesos = this.mstohours(obj.totalrecesos)
                nobj.horasnetas = this.mstohours(obj.horasnetas)

                return nobj
            })
            const ws = XLSX.utils.json_to_sheet(
                ndata, 
                {header:["usuario","contrasena","tipo","agrupado"]}
            );

            const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "CodigosIndividuales");
			/* generate file and send to client */
			XLSX.writeFile(wb, "codigosindividuales.xlsx");
        },
        editItem (item) {
            console.log(item)
            //this.editedIndex = this.desserts.indexOf(item)
            //this.editedItem = Object.assign({}, item)
            //this.dialog = true
        },

        async borrarItem(item){
            await this.$store.dispatch('codigosindividuales/delete',item.id)
            console.log(item)
        }
    },
    
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        dataAsistencias (){
            var that = this
            const obj = this.$store.state.codigosindividuales.data
            var arr = []
            Object.keys(obj).forEach(function(key){
                arr.push(obj[key])
            });
            arr.reverse()
            return arr
        }
    },

    
    
  }
</script>

<style noscoped>
ul{
    list-style-type: none;
}

</style>
