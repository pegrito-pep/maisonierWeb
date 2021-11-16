<template>
    <div id="print-area" :class="{'displayed' : display == true }">
        <div :id="id">
            <header class="d-flex border rounded px-3 py-1 align-items-center">
                <div style="flex: 1;" class="ml-1 text-center">
              
                </div> 
            </header>
            <div class="my-3">
                <slot />
            </div>
            <footer></footer>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=no',
    'scrollbars=no'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

export default {
    name: 'Printer',
    props: {
        value: {type: Boolean, default: false},
        display: {type: Boolean, default: false},
        id: {type: String, required: true}
    },
    watch: {
        value(v) {
            if (v == true && this.proceced == false) {
                this.runPrint()
            }
        }
    }, 
    data: () => ({
        proceced: false
    }),
    methods: {
        async runPrint() {
            this.proceced = true
            await this.$htmlToPaper(this.id);
            this.proceced = false
            this.$emit('input')
        }
    }
}
</script>

<style scoped>
#print-area {
    display: none;
}
#print-area header, #print-area footer {
    display: none !important;
}
#print-area.displayed {
    display: block;
}
@media print {
    #print-area {
        display: block;
    }
    #print-area header, #print-area footer {
        display: flex !important;
    }
}
</style>