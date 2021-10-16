import vue from 'vue'

vue.use({
    install: (Vue, options) => {
        Object.defineProperties(Vue.prototype, {
            $getBase64: {
                get: () => function(file, load) {
                    if (typeof file == 'undefined' || typeof file == 'string' || !file) {
                        return file
                    }
                    if (load === false) {
                        return null
                    }
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = (error) => reject(error);
                    });
                }
            }
        })
    }
})
