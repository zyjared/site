import LinkBar from '../../src/client/components/LinkBar.vue'
import Theme from '../../src/client/theme'

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.component('LinkBar', LinkBar)
  },
}
