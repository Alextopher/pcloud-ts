module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@materializecss/materialize/sass/components/_color-variables";
                    @import "@materializecss/materialize/sass/components/_color-classes";
                    @import "@materializecss/materialize/sass/components/_variables";
                    @import "@materializecss/materialize/sass/components/_normalize";
                    @import "@materializecss/materialize/sass/components/_global";
                `
            }
        }
    }
};