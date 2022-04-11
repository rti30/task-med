module.exports = {
   productionSourceMap: false,
   publicPath: process.env.NODE_ENV === 'production'
      ? ''
      : '/'
   ,
   css: {
      loaderOptions: {
         sass: {
            additionalData: `
            @use "sass:math"
            @import "@/assets/style/_variables"`
         },
      }
   }
}