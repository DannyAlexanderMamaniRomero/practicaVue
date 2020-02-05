<template>
  <div>
    <div class="text-xs-center elevation-6 py-3">
        Horas Netas Seleccionadas: <strong>{{mstohours(horasTotalesSelected)}}</strong>
    </div>
    <v-card>
        
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
        class="elevation-1"
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
            <td>{{ mstoAMD(props.item.id) }}</td>
            <td class="text-xs-right">{{ sectodate(props.item.inicio) }}</td>
            <td class="text-xs-right">
                
            <ul
                v-for="item in recesosFormat(props.item.inicioreceso)"
                :key="item.title"
            >
                <li>
                {{item}}
                </li>
            </ul>
            
            </td>
            <td class="text-xs-right">
                <ul
                v-for="item in recesosFormat(props.item.finreceso)"
                :key="item.title"
            >
                <li>
                {{item}}
                </li>
            </ul>
            </td>
            <td class="text-xs-right">{{ mstohours(props.item.totalrecesos) }}</td>
            <td class="text-xs-right">{{ sectodate(props.item.salida) }}</td>
            <td class="text-xs-right">{{ mstohours(props.item.horasnetas) }}</td>
            
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
        rowsPerPageItems: [2,3,6,7, 14, 15, 20, 30, 31,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
        pagination: {
            descending: true,
            sortBy: 'id',
            rowsPerPage: 7,
        },
        search:'',
        dialog: false,
        headers: [
            {
                text: 'Fecha',
                align: 'left',
                value: 'id'
            },
            { text: 'Inicio', value: 'inicio' },
            { text: 'Inicio de Recesos', value: 'inicioreceso' },
            { text: 'Fin de Recesos', value: 'finreceso' },
            { text: 'Total Recesos' , value: 'totalrecesos'},
            { text: 'Salida', value: 'salida' },
            { text: 'Horas Netas', value: 'horasnetas' },
            { text: 'Actions', value: 'id', sortable: false }
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
                nobj.id = new Date(obj.id).toString().substr(5, 11)

                nobj.inicio = ""
                nobj.inicio = obj.inicio.toDate().toString().substr(17, 8)
                
                
                nobj.salida = ""
                if(obj.salida == 0){
                    nobj.salida = 0
                }
                else{
                    nobj.salida = obj.salida.toDate().toString().substr(17, 8)
                }
                nobj.inicioreceso = ""

                obj.inicioreceso.forEach((receso)=>{
                    nobj.inicioreceso += receso.toDate().toString().substr(17, 8) + " - "
                })
                nobj.inicioreceso = nobj.inicioreceso.slice(0, -2);    

                nobj.finreceso = ""
                obj.finreceso.forEach((receso)=>{
                    nobj.finreceso += receso.toDate().toString().substr(17, 8) + " - "

                })
                nobj.finreceso = nobj.finreceso.slice(0, -2);


                nobj.totalrecesos = this.mstohours(obj.totalrecesos)
                nobj.horasnetas = this.mstohours(obj.horasnetas)

                return nobj
            })
            const ws = XLSX.utils.json_to_sheet(
                ndata, 
                {header:["id","inicio","salida","inicioreceso","finreceso","totalrecesos","horasnetas"]}
            );

            const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "Horario");
			/* generate file and send to client */
			XLSX.writeFile(wb, "horario.xlsx");
        },
        mstoAMD(ms){
            return new Date(ms).toString().substr(5, 11)
        },
        sectodate(tempdate){
            if (tempdate == 0 ) return 0;
            var tempdate = tempdate.toDate();
            return tempdate.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit',
                second:'2-digit',
            });
        },
        mstohours(ms){
            var date = new Date(null);
            date.setSeconds(ms/1000); // specify value for SECONDS here
            return date.toISOString().substr(11, 8)
        },
        recesosFormat(obj){
            return obj.map((element)=>{
                return this.sectodate(element)
            })
        },
        calcularTardanza(obj){
            const horainicioms = obj.inicio.seconds * 1000
        },
        horasNetas(obj){
            const horainicioms = obj.inicio.seconds * 1000
            const horafinms = obj.salida.seconds * 1000
            const recesostotalms = obj.totalrecesos

            
            var netams = horafinms- horainicioms - recesostotalms
            return netams

        },
        recesosTotal(data){
            
            const frecesos = data.finreceso
            const irecesos = data.inicioreceso
            var total = 0
            for (let index = 0; index < frecesos.length; index++) {
                var resta = (frecesos[index].seconds*1000) - (irecesos[index].seconds*1000);
                total += resta
            }
            return total
        },
        editItem (item) {
            console.log(item)
            //this.editedIndex = this.desserts.indexOf(item)
            //this.editedItem = Object.assign({}, item)
            //this.dialog = true
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        }
    },
    
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        dataAsistencias (){
            var that = this
            const obj = this.$store.state.usersasistencia.data
            var arr = []
            Object.keys(obj).forEach(function(key){
                //var fechaarr = obj[key].id.split("-")
                //console.log(fechaarr)
                var tempsplitid = obj[key].id.split("-")
                tempsplitid[1] = (parseInt(tempsplitid[1]) + 1).toString()
                obj[key].id = new Date(tempsplitid[0]+"-"+tempsplitid[1]+"-"+tempsplitid[2]).getTime()
                obj[key].totalrecesos = that.recesosTotal(obj[key])
                if(obj[key].salida)
                    {obj[key].horasnetas = that.horasNetas(obj[key])}
                else
                    {obj[key].salida = 0
                    obj[key].horasnetas = 0}
                arr.push(obj[key])
            });
            arr.sort(function(a, b) {
                return b.id - a.id;
            })

            console.log(arr)
            return arr
        },
        horasTotalesSelected(){
            var suma = 0;
            this.itemsSelected.forEach((item)=>{
                suma += item.horasnetas
            })

            return suma
        }
    },

    watch: {
        
    },

    created () {
    },
    async beforeMount(){
        await this.$store.dispatch('usersasistencia/closeDBChannel', {clearModule: true})
        .then(async ()=>{
            console.log("Close DB Channel")
            await this.$store.dispatch('usersasistencia/openDBChannel', {idusuario: this.$store.state.user.data.id}).catch(console.error)
            })
        .catch(console.error)
    },
  }
</script>

<style noscoped>
ul{
    list-style-type: none;
}

</style>
