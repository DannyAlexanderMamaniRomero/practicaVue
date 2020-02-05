<template>
    <div>
    <v-layout justify-center row wrap>
        <v-flex xs6>
        <v-select
          :items="items"
          v-model="select"
          item-text="text"
          item-value="value"
          label="Seleccione el tipo de Asistencia"
          outline
        ></v-select>
        </v-flex>
        <v-flex xs12>
            <span>{{error}}</span>
        </v-flex>
        <v-flex xs12>
            <qrcode-stream @init="onInit"  @decode="onDecode" :paused="paused"></qrcode-stream>
        </v-flex>
    </v-layout>
    </div>
</template>

<script>
import wait from '@/utils/wait.js'
export default {
  data () {
    return {
        select:null,
        items:[
          { text: 'Marcar Entrada / Inicio de actividades laborales', value: 'entrada' },
          { text: 'Inicio de receso o actividades no laborales', value: 'inicioreceso' },
          { text: 'Fin de receso o actividades no laborales', value: 'finreceso' },
          { text: 'Marcar Salida / Fin de actividades laborales', value: 'salida' }
        ],
        today:'',
        result: '',
        error: '',
        paused: false,
        timecache: null
    }
  },
  mounted() {
    this.timecache = new Date(Date.now())
  },
  beforeMount() {
    var date = new Date();
    var anio = String(date.getFullYear());
    var mes = String(date.getMonth());
    var dia = String(date.getDate());
    var hora = date.getHours();

    this.today = anio + "-" + mes + "-" + dia;
  },
  methods: {
    async onDecode (result) {
        
        this.result = result
        this.paused = true //pausamos para resetear el detector qr, si no hacemos esto no podemos escanear multiples veces el mismo código
        
        const today = this.today
        const tipoAsistencia = this.select
        const now = new Date(Date.now())

        //El tiempo minimo entre deteccion es de 1.5 segundos
        if(now - this.timecache < 1500) 
        {
            //Esperamos para setear a false y reiniciar el detector qr porque si lo hacemos inmeditamente no funciona
            await wait(50);
            this.paused = false;
            return;
        }

        //console.log(now - this.timecache)

        //Comprobamos que el usuario ya este con el canal abierto y lo cerramos para no tener multiples canales a la escucha
        await this.$store.dispatch('usersasistencia/closeDBChannel', {clearModule: true})
            .then(async ()=>{
                console.log("Close DB Channel")
                await this.$store.dispatch('usersasistencia/openDBChannel', {idusuario: this.result}).catch(console.error)
                })
            .catch(console.error)
        
        /*if(this.isUserAsistenciaSigned){
            //console.log("Closing DB Channel");
            await this.$store.dispatch('usersasistencia/closeDBChannel', {clearModule: true}
            ).then(()=>{
                console.log("Close DB Channel")
                this.$store.dispatch('usersasistencia/openDBChannel', {idusuario: this.result}).catch(console.error)
                })
            .catch(console.error)
        }
        else
        {
            await this.$store.dispatch('usersasistencia/openDBChannel', {idusuario: this.result}).catch(console.error)  
        }*/
        switch (tipoAsistencia) {
            case "entrada":
            {
                if(!this.existAsistence(today))
                {
                    const asisData = {
                        id:this.today,
                        'horaentrada':this.horaEntrada(this.result),
                        'inicio': new Date(Date.now()),
                        'inicioreceso':[],
                        'finreceso':[]
                    }
                    await this.$store.dispatch('usersasistencia/insert', asisData)
                    alert("Entrada ingresada correctamente")
                }else{
                    alert("Usted ya paso su inicio")
                    break;
                }
                break;
            }
            case "inicioreceso":
            {
                if(!this.existAsistence(today)) 
                {
                    alert("Tiene que pasar su entrada antes")
                    break;
                }
                const iniciorecesos = this.listainiciorecesos()
                const finrecesos = this.listafinrecesos()

                if(iniciorecesos.length != finrecesos.length) {
                    alert("Debes finalizar tu receso antes de iniciar otro")
                    break;
                }

                var nuevosrecesos = [...iniciorecesos,new Date(Date.now())]

                const tempData = {id:this.today, 'inicioreceso':nuevosrecesos}
                await this.$store.dispatch('usersasistencia/patch', tempData)

                alert("Inicio de receso ingresado correctamente")
                
                break;
            }
            case "finreceso":
            {
                if(!this.existAsistence(today)) 
                {
                    alert("Tiene que pasar su entrada antes")
                    break;
                }
                const iniciorecesos = this.listainiciorecesos()
                const finrecesos = this.listafinrecesos()

                if(iniciorecesos.length == finrecesos.length) {
                    alert("Debes iniciar tu receso antes de finalizarlo")
                    break;
                }
                
                var nuevosrecesos = [...finrecesos,new Date(Date.now())]

                const tempData = {id:this.today, 'finreceso':nuevosrecesos}
                await this.$store.dispatch('usersasistencia/patch', tempData)
                
                alert("Fin de receso ingresado correctamente")

                break;
            }
            case "salida":
            {
                if(!this.existAsistence(today)) 
                {
                    alert("Tiene que pasar su entrada antes")
                    break;
                }

                if(this.existSalida())
                {
                    alert("Usted ya pasó salida")
                    break;
                }
                const iniciorecesos = this.listainiciorecesos()
                const finrecesos = this.listafinrecesos()
                
                
                if(iniciorecesos.length != finrecesos.length) {
                    alert("Debes finalizar tu receso antes de marcar tu salida")
                    break;
                }
                const tempData = {id:this.today, 'salida':new Date(Date.now())}
                await this.$store.dispatch('usersasistencia/patch', tempData)

                alert("Salida ingresada correctamente")

                break;
            }
            default:
            {
                alert("Seleccione el tipo de asistencia")
                break;
            }
        }
        this.paused = false
        this.timecache = new Date(Date.now())
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: Tienes que darle permiso a la cámara"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: No hay cámaras en este dispositivo"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: Se necesitas trabajar en un contexto seguro (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: Esta siendo la camara usada por otro programa?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: No se encuentran camaras instaladas"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: El navegador no soporta el API del STREAM :("
        }
      }
    },
    existSalida(){
        return this.$store.getters["usersasistencia/getAsistenciaByID"](this.today).salida?true:false
    },
    existAsistence(id){
        return this.$store.getters["usersasistencia/getAsistenciaByID"](id)?true:false;
    },
    listainiciorecesos(){
        return this.$store.getters["usersasistencia/getAsistenciaByID"](this.today).inicioreceso
    },
    listafinrecesos(){
        return this.$store.getters["usersasistencia/getAsistenciaByID"](this.today).finreceso
    },
    horaEntrada(id){
        return this.$store.getters["users/getUserByID"](id).horaentrada
    },
  },
  computed:{
      
      dataAsistencia(){
          return this.$store.getters["usersasistencia/getAsistenciaByID"](this.today)
      },
      isUserAsistenciaSigned(){
          return this.$store.state.usersasistencia._sync.signedIn
      }
      
  }
};
</script>

<style>
</style>
